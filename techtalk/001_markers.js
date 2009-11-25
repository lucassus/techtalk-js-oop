/**
 * brak przejrzystego API
 * 
 * bs.marker.* ciężko się czyta (zwłaszcza jeśli mamy dużo wywołań funkcji w kodzie), nie jest wygodne, nie jest DRY!
 * 
 * moje IDE (Netbeans) głupieje
 */

bs.marker = {};
 
bs.marker.element = '<li class="long-term-view-element marker"><div class="marker-info" /><div class="triangle" /></li>';
 
bs.marker.enableMarkers = false;
 
bs.marker.removeConsecutiveMarkers = function() {
	// ...
};

bs.marker.restoreBoundaryMarkers = function() {
	// ...
};

//
// ... I WIELE INNYCH FUNKCJI TEGO RODZAJU
//

// TODO: $(document) here? wtf??
$(document).ready(function() {
	$('.velocity-widget :submit').click(bs.marker.distribute);
	$('#long-term-view-toggle').click(bs.marker.toggleLongTermView);
});

/**
 * Initialize long term wigdet.
 * 
 * It loads markers position storen in database
 * and recreates long term view elements.
 */
bs.marker.init = function () {
	// ...
};

