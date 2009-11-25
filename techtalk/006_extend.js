cs = {
	extend: function(subClass, superClass) {
		var F = function() {};
		F.prototype = superClass.prototype;

		subClass.prototype = new F();
		subClass.prototype.constructor = subClass;

		subClass.superClass = superClass.prototype;
		if (superClass.prototype.constructor == Object.prototype.constructor) {
			superClass.prototype.constructor = superClass;
		}
	}
};

/*************************************/

var Employee = function(first, last, id) {
      Employee.superClass.constructor.call(this, first, last);
      this.id = id;
}
 
cs.extend(Employee, Person);
 
Employee.prototype.toString = function() {
	    return '#' + this.id + ' ' + Employee.superClass.toString.call(this);
}
 
var emp = new Employee('Łukasz', 'Badzarewicz', '13');
emp.toString();

