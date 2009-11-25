cs = {
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

/*****************************************/

var Person = function(first, last) {
	this.first = first;
	this.last = last;
}

var MyMixin = function() {
	this.toString = function() {
		var result = '';
		for (var key in this) {
			result += this[key] + ' ';
		}
		return result;
	}
}

cs.mixin(Person, MyMixin);

var per = new Person('Łukasz', 'Bandzarewicz');
per.toString();

