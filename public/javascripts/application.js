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

cs.extend = function(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;

    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;

    subClass.superClass = superClass.prototype;
    if (superClass.prototype.constructor == Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
    }
};
