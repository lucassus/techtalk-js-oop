// entry point

$(function() {

//    var gridInstaller = new cs.grid.Installer($('div#container'));
//    gridInstaller.installAll();

    var productsGrid = new cs.grid.Products($('.grid-products'));
    productsGrid.init();

    var categoriesGrid = new cs.grid.Categories($('.grid-categories'), productsGrid);
    categoriesGrid.init();

});
