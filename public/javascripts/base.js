cs = {

    namespace: function(name) {
        var parts = name.split('.');
        var current = cs;
        for (var i in parts) {
            var part = parts[i];
            if (!current[part]) {
                current[part] = {};
            }

            current = current[part];
        }
    },

    extend: function(subClass, superClass) {
        var F = function() {};
        F.prototype = superClass.prototype;

        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;

        subClass.superClass = superClass.prototype;
        if (superClass.prototype.constructor == Object.prototype.constructor) {
            superClass.prototype.constructor = superClass;
        }
    },

    mixin: function(receivingClass, givingClass) {
        if (arguments[2]) { // Only give certain methods
            for (var i = 2, len = arguments.length; i < len; i++) {
                receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
            }
        } else { // Give all methods
            for (var methodName in givingClass.prototype) {
                if (!receivingClass.prototype[methodName]) {
                    receivingClass.prototype[methodName] = givingClass.prototype[methodName];
                }
            }
        }
    }

};
