function bind(func, scope) {
	return function() {
		func.apply(scope, arguments);
	}
}
