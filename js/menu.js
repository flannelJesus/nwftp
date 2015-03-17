(function () {
    var gui = require('nw.gui');

    // initialize window menu
    var win = gui.Window.get(),
        nativeMenuBar = new gui.Menu({
            type: "menubar"
        });

    // check operating system for the menu
    if (process.platform === "darwin") {
        nativeMenuBar.createMacBuiltin("Your App Name");
    }

    // actually assign menu to window
    win.menu = nativeMenuBar;
})();
