cs.MyModule = (function() {

	// "private" variables:
	var _myPrivateVar = "I can be accessed only from within cs.MyModule.";

	//"private" method:
	var _myPrivateMethod = function () {
		return "I can be accessed only from within cs.MyModule";
	}

	var myPublicMethod = function () {
		console.log("I'm accessible as cs.MyModule.myPublicMethod.");

		//Within myProject, I can access "private" vars and methods:
		console.log(_myPrivateVar);
		console.log(_myPrivateMethod());

		//The native scope of myPublicMethod is myProject; we can
		//access public members using "this":
		console.log(this.myPublicProperty);
	}

	return {
		myPublicProperty: "I'm accessible as cs.MyModule.myPublicProperty.",
		myPublicMethod: myPublicMethod
	};

})(); // the parens here cause the anonymous function to execute and return

cs.MyModule.myPublicProperty;
cs.MyModule.myPublicMethod();

/*
I'm accessible as cs.MyModule.myPublicMethod.
I can be accessed only from within cs.MyModule.
I can be accessed only from within cs.MyModule
I'm accessible as cs.MyModule.myPublicProperty.
*/

