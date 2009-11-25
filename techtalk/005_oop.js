var Person = function(first, last) {
	this.first = first;
        this.last = last;
}
 
Person.prototype.toString = function() {
	return this.first + ' ' + this.last;
}
 
var luk = new Person("Łukasz", "Bandzarewicz");
luk.toString();

/***************************/

var Employee = function(first, last, id) {
	Person.call(this, first, last); // wywołanie konstruktora klasy bazowej
	this.id = id;
}
 
Employee.prototype = new Person();
 
Employee.prototype.toString = function() {
	// jak odwołać się do nadpisanej metody bazowej?
	return '#' + this.id + ' ' + Person.prototype.toString.call(this);
}
      
var emp = new Employee('Łukasz', 'Badzarewicz', '13');
emp.toString();

