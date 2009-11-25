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
	}
};

cs.namespace('foo.bar');
cs.namespace('marker');

