cs = {};

cs.namespace = function(name) {
    var parts = name.split('.');
    var current = cs;
    for (var i in parts) {
        var part = parts[i];
        if (!current[part]) {
            current[part] = {};
        }

        current = current[part];
    }
};

cs.extend = function(subClass, baseClass) {
    function inheritance() {}
    inheritance.prototype = baseClass.prototype;

    subClass.prototype = new inheritance();
    subClass.prototype.constructor = subClass;
    subClass.baseConstructor = baseClass;
    subClass.superClass = baseClass.prototype;
};
