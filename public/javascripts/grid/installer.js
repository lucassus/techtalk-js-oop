cs.namespace('grid');

cs.grid.Installer = function(root) {

  /**
   * Activate grid behaviour on all children of given element. Automatically called
   * on document.ready.
   */
  this.installAll = function() {
    root.find(".grid").each(function() {
        install(this);
    });
  }

  /**
   * Activates a grid behaviour of given element - detects if it has grid-xxx class
   * and if so, it passes it to Xxx constructor.
   */
  var install = function(element) {
    if ($(element).data('grid-installed')) {
        return false;
    } else {
        $(element).data('grid-installed', true);
    }

    var classes = $(element).attr('class').split(' ');

    for (var i = 0; i < classes.length; i++) {
        if (classes[i].substring(0, 5) == 'grid-') {
            var dashedClassName = classes[i].substring(5);
            var className = getClassNameWithoutDashes(dashedClassName);
            var gridClass = cs.grid[className];

            if (gridClass) {
                /* timeout to ensure it is called in separate run of event loop. */
                setTimeout(function() {
                    var grid = new gridClass($(element));
                    $(element).data('grid-instance', grid);
                    grid.init();
                }, 1);
            }

            break;
        }
    }
    
    return true;
  }

  /**
   * Get proper name of the class grid the dashed variant
   *
   * (grid-search => GridSearch)
   */
  var getClassNameWithoutDashes = function(dashedClassName) {
    var clsparts = dashedClassName.split('-');
    var className = '';
    for (var j = 0; j < clsparts.length; j++) {
        className = className + clsparts[j].substring(0,1).toUpperCase() + clsparts[j].substring(1);
    }
    return className;
  }
};
