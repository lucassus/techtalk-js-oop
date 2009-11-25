var Widget = (function() {
	var DEFAULT_MESSAGE = 'Hello World!';

	return function(id, message) {
		this.elem = $(id);
		this.message = message || DEFAULT_MESSAGE;
	}
})();

Widget.prototype.init = function() {
	var self = this;
	this.elem.bind('click', function(e) { 
		self.update(this, e); 
	});
};
 
/**
 * jQuery callback
 */
Widget.prototype.update = function(element, e) {
    	var $this = $(element);
    	$this.html(this.message + ' ' + e.pageX);
    	$this.unbind('click', this.callback);
};
 
///////////////////////////////////////////////////////////

var ExtendedWidget = function(id, message) {
	Widget.call(this, id, message);
};

ExtendedWidget.prototype = new Widget();

/**
 * jQuery callback
 */
ExtendedWidget.prototype.update = function(elem, e) {
	alert('Alert: ' + ' ' + this.message);
};

$(function() {
	var w1 = new Widget('#widget1', 'Hello World!');
	w1.init();

	var w2 = new ExtendedWidget('#widget2', 'Extended Hello World!');
	w2.elem.live('click', function(e) {
		w2.update(this, e);
	});
});

