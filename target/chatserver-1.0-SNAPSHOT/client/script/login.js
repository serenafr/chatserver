function init() {
	var loginButton = document.getElementById('login-button');
	var signupButton = document.getElementById('signup-button');
	signupButton.addEventListener(
		'click', 
		openSignUpPage);
}

function openSignUpPage() {
	window.location = 'signup.html';
}

window.addEventListener('load', init);