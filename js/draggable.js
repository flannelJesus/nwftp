(function ($) {
    $.fn.drags = function (opt) {

        opt = $.extend({handle: "", cursor: "ew-resize", min: 10}, opt);
        var $el;

        if (opt.handle === "") {
            $el = this;
        } else {
            $el = this.find(opt.handle);
        }

        var priorCursor = $('body').css('cursor');

        return $el.css('cursor', opt.cursor).on("mousedown", function (e) {
            var $body = $('body');
            priorCursor = $body.css('cursor');
            $body.css('cursor', opt.cursor);

            var $drag;
            if (opt.handle === "") {
                $drag = $(this).addClass('draggable');
            } else {
                $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.parents().on("mousemove", function (e) {
                var $draggable = $('.draggable');
                if ($draggable.length) {
                    var prev = $draggable.prev();
                    var next = $draggable.next();

                    // Assume 50/50 split between prev and next then adjust to
                    // the next X for prev

                    var total = prev.outerWidth() + next.outerWidth();


                    // console.log('l: ' + prev.outerWidth() + ', r:' + next.outerWidth());

                    var leftPercentage = (((e.pageX - prev.offset().left) + (pos_x - drg_w / 2)) / total);
                    var rightPercentage = 1 - leftPercentage;

                    if (leftPercentage * 100 < opt.min || rightPercentage * 100 < opt.min) {
                        return;
                    }

                    // console.log('l: ' + leftPercentage + ', r:' + rightPercentage);

                    prev.css('flex', leftPercentage.toString());
                    next.css('flex', rightPercentage.toString());

                    $(document).on("mouseup", function () {
                        $('body').css('cursor', priorCursor);
                        $('.draggable').removeClass('draggable');
                    });
                }
            });
            e.preventDefault(); // disable selection
        });

    }
})(jQuery);

$('.handle').drags();
