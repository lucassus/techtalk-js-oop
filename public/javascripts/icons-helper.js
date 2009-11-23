cs.IconsHelper = function() {};

cs.IconsHelper.prototype.editLink = function(route, id) {
    return this.buildActionLink(route, id, 'table_edit', 'Edit');
};

cs.IconsHelper.prototype.showLink = function(route, id) {
    return this.buildActionLink(route, id, 'table', 'Show');
};

cs.IconsHelper.prototype.buildActionLink = function(route, id, icon, title) {
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
