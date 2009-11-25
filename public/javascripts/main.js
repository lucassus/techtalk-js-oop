// entry point

$(function() {
    var useInstaller = true;

    if (useInstaller) {
        var gridInstaller = new cs.grid.Installer($('div#container'));
        gridInstaller.installAll();
    } else {
        var productsGrid = new cs.grid.Products($('.grid-products'));
        productsGrid.init();

        var categoriesGrid = new cs.grid.Categories($('.grid-categories'), productsGrid);
        categoriesGrid.init();
    }
});
