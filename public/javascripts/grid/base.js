cs.namespace('grid');

cs.grid.Base = (function() {

    // Private static attribute
    var DEFAULT_OPTIONS = {
        mtype: 'GET',
        datatype: 'json',
        jsonReader: {
            repeatitems: false
        },
        loadui: 'disable',

        rowNum: 10,
        rowList: [10, 25, 50],

        autowidth: true,
        viewrecords: true,
        sortname: 'created_at',
        sortorder: 'desc',

        imgpath: '/jqGrid/themes/basic/images'
    };

    return function(container) {
        this.defaultOptions = DEFAULT_OPTIONS;

        this.gridContainer = container.find('.grid-container');
        this.gridPager = container.find('.grid-pager');
        this.defaultOptions['pager'] = this.gridPager;

        this.grid = null;
    };
})();

cs.mixin(cs.grid.Base, cs.IconsHelper);

cs.grid.Base.prototype.init = function() {
    var options = this.buildOptions();
    this.grid = this.gridContainer.jqGrid(options);
};

cs.grid.Base.prototype.editRow = function(id) {
    if (this.getEditUrl) {
        window.location.href = this.getEditUrl(id);
    }
};

cs.grid.Base.prototype.reload = function(params) {
    var defaults = {
        url: this.baseUrl,
        page: 1
    };
    params = $.extend(defaults, params || {});

    this.grid.setGridParam(params).trigger("reloadGrid");
};

// Must be implemented in the subclass

cs.grid.Base.prototype.buildOptions = function() {
    throw new Error('Unsupported operation on an abstract class.');
};

cs.grid.Base.prototype.getEditUrl = function() {
    throw new Error('Unsupported operation on an abstract class.');
};

