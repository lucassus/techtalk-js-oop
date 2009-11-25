bs.marker = {};

bs.marker.element = '<li class="long-term-view-element marker"><div class="marker-info" /><div class="triangle" /></li>';

bs.marker.enableMarkers = false;

bs.marker.removeConsecutiveMarkers = function() {
  var elements = $('.product-backlog-not-on-planning li');
  var current, i;
  var prev = $(elements[0]);
  for (i = 1; current = elements[i]; i++) {
    current = $(current);
    if (prev.hasClass(".marker") && current.hasClass(".marker")) {
      current.remove();
    } else {
      prev = current;
    }
  }
};

bs.marker.restoreBoundaryMarkers = function() {
  var markerElement = bs.marker.element;
  var markerContainer = $(".product-backlog-not-on-planning");
  var listItems = $(".product-backlog-not-on-planning li");

  if (listItems.length == 0) return;

  if (listItems.length == 1) {
    var onlyOne = $(listItems[0]);
    if (onlyOne.hasClass('.marker')) {
      onlyOne.remove();
      return;
    }          
  }

  var first = $(listItems[0]);
  var last = $(listItems[listItems.length - 1]);

  if (first.hasClass('.marker')) {
    var markerInfo = first.find("div.marker-info");
    markerInfo.text("");
    markerInfo.removeShadow();
  } else {
    markerContainer.prepend(markerElement);
    $('.long-term-view-element').show();
  }
  
  if (!last.hasClass('.marker')) {
    markerContainer.append(markerElement);
    $('.long-term-view-element').show();
  }

};

bs.marker.updateMarkerInfosPosition = function() {
  var offset = 12; // offset for tweak marker-info position
  $('div.marker-info').each(function(indx, el) {
    if (indx == 0) return; // skip first empty marker-info

    var nthMarkerTopPosition = function(indx) {
      var marker = $('li.marker')[indx];
      return $(marker).position().top;
    }
    
    var position = (nthMarkerTopPosition(indx) - nthMarkerTopPosition(indx - 1)) / 2 + offset;
    $(this).css('bottom', position);
  });
};

bs.marker.recalculateMarkers = function() {
  var backlogElements = $('.product-backlog-not-on-planning li');
  var itemsSinceLastMarker = [], markerPosition = 0;
  var elem, i, lastSprintNo = bs._lastSprintNumber || 0;

  bs.marker.sprintsWithName = 0;
  // Start from 1 - skip first marker
  for (i = 1; elem = backlogElements[i]; i++) {
    elem = $(elem);
    if (elem.hasClass("item")) {
      itemsSinceLastMarker.push(backlogElements[i]);
    } else if (elem.hasClass("marker")) {
      lastSprintNo = bs.marker.updateMarkerData(elem, markerPosition, itemsSinceLastMarker, lastSprintNo);
      markerPosition++;
      itemsSinceLastMarker = [];
    }
  }

  $('#total-number-of-sprints').empty().text('Total number of sprints: ' + markerPosition);
};

/**
 * Number of sprints with name.
 * Used to calculate unplanned sprints numbers.
 */
bs.marker.sprintsWithName = 0;

/**
 * Updates markes infos content: sprint name, SP, dates etc.
 */
bs.marker.updateMarkerData = function(marker, newPosition, newItems, lastSprintNo) {
  marker.data("items", newItems.length);
  marker.data("position", newPosition);
  var stats = bs.stats.count($(newItems));
  var sprintNumber = lastSprintNo + 1;
  var endDate, sprint;
  var sprintName;
  
  if (bs._sprintsAfterToday && bs._sprintsAfterToday[newPosition]) {
    sprint = bs._sprintsAfterToday[newPosition];
    sprintName = sprint['name'];
    bs.marker.sprintsWithName++;
    endDate = sprint['to_date'];
  } else {
    sprintName = 'Sprint ' + (sprintNumber - bs.marker.sprintsWithName);
  }

  // limit sprint name characters
  var maxLength = 20;
  if (sprintName.length > maxLength) {
    sprintName = sprintName.substring(0, maxLength).replace(/\s$/, "") + '...';
  }

  var template = $.template("\
    <span>${sprintName}</span><br />\
    ${effort} ${unit} ${endDate}\
  ");

  marker.find("div.marker-info")
    .empty()
    .append(template, {sprintName: sprintName, effort: stats['items-effort'], unit: bs._backlog_unit, endDate: endDate});
    
  return sprintNumber;
};

/**
 * Saves via ajax markers positions.
 */
bs.marker.save = function() {
  var state = bs.marker.currentState();
  bs._markers = state;
  state = $.toJSON(state);
  bs.post(recreateProjectPlanningMarkersPath(bs._project), {
    'markers': state
  }, null, null, "json");
};

bs.marker.currentState = function() {
  var markers = $(".marker").not(".marker:first").not(".marker:last");
  var state = [];
  for (var marker, i = 0; marker = markers[i]; i++) {
    marker = $(marker);
    state.push({
      position: marker.data('position'),
      item_span: marker.data('items')
    });
  }
  
  return state;
};

bs.marker.recreateHandler = function(envelope) {
  var markers = envelope.data;
  if (markers) {
    bs.marker.recreate(markers);
  }
};

/**
 * Recreates planning markers from state saved in DB.
 */
bs.marker.recreate = function(markers) {
  var markerElement = bs.marker.element;
  $(".marker").remove();

  markers = markers.slice();
  var marker = markers.shift();
  if (marker) {
    var nextMarkerAt = marker['item_span']
  }
  
  var itemsBehind, item, items = $('.product-backlog-not-on-planning .item');
  for (itemsBehind = 0; item = items[itemsBehind]; itemsBehind++) {
    item = $(item);
    if (itemsBehind === nextMarkerAt) {
      item.before(markerElement);
      marker = markers.shift();
      if (marker) {
        nextMarkerAt += marker['item_span'];
      }
    }
  }
};

/**
 * Distributes markers after click in submit in the Velocity widget.
 */
bs.marker.distribute = function() {
  var velocity = parseFloat($('.velocity-input').val());
  if (isNaN(velocity)) {
    alert("velocity is not a number");
    return false;
  }

  $('.marker').remove();
  var i, sum = 0, estimate, item, items = $('.item');
  var estimateElement;
  for (i = 0; item = items[i]; i++) {
    item = $(item);
    estimateElement = item.find('.item-estimate');
    estimate = parseFloat(estimateElement.text());
    if (isNaN(estimate)) continue;

    if (sum > 0 && (sum + estimate > velocity)) {
      item.before(bs.marker.element);
      sum = 0;
    }
    
    sum += estimate;
  }

  bs.marker.refreshMarkerInfos();
  bs.marker.save();
  
  return false;
};

/**
 * Returns true if planning markers are disableds.
 */
bs.marker.isLongTermViewEnabled = function() {
  return $.cookie('long-term-view') == 'true';
};

bs.marker.isHidden = function() {
  return $('.long-term-view-element').is(':hidden');
};

/**
 * Show/hide planing markers elements.
 */
bs.marker.toggleLongTermView = function() {
  var elements = $('.long-term-view-element');
  var link = $(this);
  
  if (!bs.marker.isLongTermViewEnabled()) {
    link.text('Close long term view');
    $.cookie('long-term-view', true);
    elements.show();
    bs.marker.refreshMarkerInfos();
  } else {
    link.text('Long term view');
    $.cookie('long-term-view', false);
    elements.hide();
  }

  return false;
};

/**
 * Show/hide planning markers on click on tag.
 */
bs.marker.toggle = function() {
  if (!bs.marker.isLongTermViewEnabled()) return;

  var tagsEnabled = bs.tags.manager.enabled();
  if (tagsEnabled) {
    $(".marker").hide();
  } else {
    $(".marker").show();
    bs.marker.refreshMarkerInfos();
  }
};

/**
 * Refresh planning marker infos.
 */
bs.marker.refreshMarkerInfos = function() {
  if (!bs.marker.isLongTermViewEnabled() || !bs.marker.enableMarkers) return;

  bs.marker.restoreBoundaryMarkers();
  bs.marker.removeConsecutiveMarkers();
  bs.marker.recalculateMarkers();
  bs.marker.updateMarkerInfosPosition();

  // hide first empty marker info
  $('.marker-info:first').hide();

  // show others marker infos
  var markerInfos = $('.marker-info').not(':first');
  markerInfos.show();
  markerInfos.redrawShadow();
};

/**
 * Hide planning marker infos.
 */
bs.marker.hideMarkerInfos = function() {
  if (bs.marker.isHidden()) return;

  var markerInfos = $('.marker-info').not(':first');
  markerInfos.hide();
  markerInfos.removeShadow();
};

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
  if (!bs.marker.enableMarkers) return;

  var markers = bs._markers;
  if (markers) {
    bs.marker.recreate(markers);
  }

  if (bs.marker.isLongTermViewEnabled()) {
    var elements = $('.long-term-view-element');
    elements.show();
  } else {
    $('#long-term-view-toggle').text('Long term view');
  }

  bs.marker.refreshMarkerInfos();
};
