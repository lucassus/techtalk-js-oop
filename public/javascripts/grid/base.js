cs.namespace('grid');

cs.grid.Base = function(container) {
    this.gridContainer = container.find('.grid-container');
    this.gridPager = container.find('.grid-pager');

    this.grid = null;

    this.defaultOptions = {
        mtype: 'GET',
        datatype: 'json',
        jsonReader: {
            repeatitems: false
        },
        loadui: 'disable',

        pager: this.gridPager,
        rowNum: 10,
        rowList: [10, 25, 50],

        autowidth: true,
        viewrecords: true,
        sortname: 'created_at',
        sortorder: 'desc',

        imgpath: '/jqGrid/themes/basic/images'
    };
};

cs.grid.Base.prototype.editLink = function(route, id) {
    return this.buildActionLink(route, id, 'table_edit', 'Edit');
};

cs.grid.Base.prototype.showLink = function(route, id) {
    return this.buildActionLink(route, id, 'table', 'Show');
};

cs.grid.Base.prototype.buildActionLink = function(route, id, icon, title) {
    var html = "";
    html += "<a href='${url}' title='${title}'>";
    html +=   "<img src='/images/icons/${icon}.png' alt='${title}' class='grid-action' />";
    html += "</a>";

    return $.template(html).apply({
        url: route(id, ''),
        icon: icon,
        title: title
    });
};

cs.grid.Base.prototype.init = function() {
    var options = this.buildOptions();
    this.grid = this.gridContainer.jqGrid(options);
}

cs.grid.Base.prototype.reload = function(params) {
    var defaults = {
        url: this.baseUrl,
        page: 1
    };
    params = $.extend(defaults, params || {});

    this.grid.setGridParam(params).trigger("reloadGrid");
};

cs.grid.Base.prototype.editRow = function(id) {
    if (this.editUrl) {
        window.location.href = this.editUrl(id);
    }
};
