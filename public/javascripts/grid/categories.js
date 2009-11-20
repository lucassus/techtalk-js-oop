cs.namespace('cs.grid');

cs.grid.Categories = function(container, productsGrid) {
  cs.grid.Categories.baseConstructor.call(this, container);

  this.productsGrid = productsGrid;
  // Set base url for grid data
  this.baseUrl = categories_path('.json');
  this.editUrl = function(id) { return edit_category_path(id, '') };
};

cs.extend(cs.grid.Categories, cs.grid.Base);

cs.grid.Categories.prototype.buildOptions = function() {
    var self = this;
    var actionsFormatter = function(id, opts) {
        var editLink = self.editLink(edit_category_path, id);
        var showLink = self.showLink(category_path, id);

        return editLink + showLink;
    };

    var colNames = ['Actions', 'Name', 'Created at'];
    var colModel = [
        {name: 'id', index: 'id', key: true, sortable: false, width: 50, align: 'center',
            formatter: actionsFormatter},
        {name: 'name', index: 'name', width: 300, sortable: true},
        {name: 'created_at', index: 'created_at', width: 120, sortable: true}
    ];

    return $.extend(this.defaultOptions, {
        url: this.baseUrl,
        colNames: colNames,
        colModel: colModel,
        onSelectRow: function(id) { self.productsGrid.reload(id); },
        ondblClickRow: function(id) { self.editRow(id); }
    });
};
