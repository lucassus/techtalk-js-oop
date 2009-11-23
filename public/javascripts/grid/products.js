cs.namespace('grid');

cs.grid.Products = (function() {
    return function(container) {
        // Call the superclass's constructor in the scope of this.
        cs.grid.Products.superclass.constructor.call(this, container);

        // Set base url for grid data
        this.baseUrl = products_path('.json');
    }
})();

cs.extend(cs.grid.Products, cs.grid.Base);

cs.grid.Products.prototype.getEditUrl = function(id) {
    return edit_product_path(id, '');
};

cs.grid.Products.prototype.buildOptions = function() {
    var self = this;
    
    var actionsFormatter = function(id, opts) {
        var editLink = self.editLink(edit_product_path, id);
        var showLink = self.showLink(product_path, id);

        return editLink + showLink;
    };

    var colNames = ['Actions', 'Name', 'Price', 'Promotion', 'Quantity', 'Created at'];
    var colModel = [
        {name: 'id', index: 'id', sortable: false, width: 70, align: 'center',
            formatter: actionsFormatter},
        {name: 'name', index: 'name', width: 330},
        {name: 'price', index: 'price', width: 70, align: 'right'},
        {name: 'promotion', index: 'promotion', width: 70, align: 'right'},
        {name: 'quantity', index: 'quantity', width: 70, align: 'right'},
        {name: 'created_at', index: 'created_at', width: 120}
    ];

    return $.extend(this.defaultOptions, {
      url: this.baseUrl,
      colNames: colNames,
      colModel: colModel,
      ondblClickRow: function(id) { self.editRow(id); }
    });
};

cs.grid.Products.prototype.reload = function(category_id) {
    var params = {url: this.baseUrl + '?category_id=' + category_id};
    cs.grid.Products.superClass.reload.call(this, params);
};
