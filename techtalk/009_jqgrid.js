<table id="list2" class="scroll" cellpadding="0" cellspacing="0"></table> 
<div id="pager2" class="scroll" style="text-align:center;"></div>

$(document).ready(function(){ 
	$("#list").jqGrid({
		url:'example.php',
		datatype: 'xml',
		mtype: 'GET',
		colNames:['Inv No','Date', 'Amount','Tax','Total','Notes'],
		colModel :[ 
			{name:'invid', index:'invid', width:55}, 
			{name:'invdate', index:'invdate', width:90}, 
			{name:'amount', index:'amount', width:80, align:'right'}, 
			{name:'tax', index:'tax', width:80, align:'right'}, 
			{name:'total', index:'total', width:80, align:'right'}, 
			{name:'note', index:'note', width:150, sortable:false} ],
		pager: jQuery('#pager'),
		rowNum:10,
		rowList:[10,20,30],
		sortname: 'id',
		sortorder: "desc",
		viewrecords: true,
		imgpath: 'themes/basic/images',
		caption: 'My first grid'
	}); 
});

/******************************************/

/*
Co jeśli w aplikacji mamy wiele gridów (Profit, aplikacja e-commerce)

Gdzie zdefiniować wspólne opcje i metody pomocnicze dla gridów

	np. obsługa kliknięcia na wiersz
                                                          
	ikonki do edycji i podglądu rekordu itp.
                                                                                
jqGrid ma zmienną $.jqGrid.defaults = {}, gdzie można upchać defaultową konfigurację, ale gdzie ją umieścić w dużym projekcie?
                                                                                          
Dlaczego by tego nie zrobić obiektowo?
*/
	
/*****************************************/

cs.grid.Products.prototype.buildOptions = function() {
	var self = this;

	var actionsFormatter = function(id, opts) {
		var editLink = self.editLink(edit_product_path, id);
		var showLink = self.showLink(product_path, id);

		return editLink + showLink;
	};

	var colNames = [...];
	var colModel = [
	{name: 'id', index: 'id', sortable: false, width: 70, align: 'center',
		formatter: actionsFormatter}, ...];

	return $.extend(this.defaultOptions, {
		url: this.baseUrl,
		colNames: colNames,
		colModel: colModel,
		ondblClickRow: function(id) { self.editRow(id); }
	});
};

