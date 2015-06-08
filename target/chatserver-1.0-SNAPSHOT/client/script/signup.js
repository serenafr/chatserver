function init() {
	var registerButton = document.getElementById('register-button');
	registerButton.addEventListener(
		'click',
		register);
}

function register() {
	var userNameInput = document.getElementById('user-name-input');
	var userNameEmpty = document.getElementById('user-name-empty');
	var passwordInput = document.getElementById('password-input');
	var userPasswordEmpty = document.getElementById('user-password-empty');
	var passwordConfirmInput = document.getElementById('password-confirm-input');
	var confirmPasswordEmpty = document.getElementById('confirm-password-empty');
	var userPasswordConflict = document.getElementById('user-password-conflict');
	var confirmPasswordConflict = document.getElementById('confirm-password-conflict');
	var securityQuestionsHolder = document.getElementById('security-questions-holder');
	var securityQuestions = document.getElementById('security-questions');
	var questionNotSelected = document.getElementById('security-question-not-selected');
	var index = securityQuestions.selectedIndex;
	var selectedQuestion = securityQuestions.options[index].text;
	var answerInput = document.getElementById('security-answer-input');
	var answerEmpty = document.getElementById('answer-empty');
	var checkBox = document.getElementById('check-box');
	var notChecked = document.getElementById('not-checked');
	var userName = userNameInput.value;
	var userPassword = passwordInput.value;
	var confirmPassword = passwordConfirmInput.value;
	var answer = answerInput.value;
	if (userName == "") {
		userNameInput.className = 'if-empty';
		userNameEmpty.className = 'info-empty-warning';
	} else {
		userNameInput.className = 'info-holder-input';
		userNameEmpty.className = 'info-hidden';	
	}
	if (userPassword == "") {
		passwordInput.className = 'if-empty';
		userPasswordEmpty.className = 'info-empty-warning';
	} else {
		passwordInput.className = 'info-holder-input';
		userPasswordEmpty.className = 'info-hidden';
	}
	if (confirmPassword == "") {
		passwordConfirmInput.className = 'if-empty';
		confirmPasswordEmpty.className = 'info-empty-warning';		
	} else {
		passwordConfirmInput.className = 'info-holder-input';
		confirmPasswordEmpty.className = 'info-hidden';
	}
	if (index == 0) {
		questionNotSelected.className = 'info-empty-warning';
	} else {
		questionNotSelected.className = 'info-hidden';
	}
	if (answer == "") {
		answerInput.className = 'if-empty';
		answerEmpty.className = 'info-empty-warning';		
	} else {
		answerInput.className = 'info-holder-input';
		answerEmpty.className = 'info-hidden';
	}
	if (!checkBox.checked) {
		notChecked.className = 'info-empty-warning';
	} else {		
		notChecked.className = 'info-hidden';
	}
	if (userPassword != confirmPassword) {
		passwordInput.className = 'if-empty';
		userPasswordConflict.className = 'info-empty-warning';
		passwordConfirmInput.className = 'if-empty';
		confirmPasswordConflict.className = 'info-empty-warning';			
	} else {
		passwordInput.className = 'info-holder-inputfo';
		userPasswordConflict.className = 'info-hidden';
		passwordConfirmInput.className = 'info-holder-inputfo';
		confirmPasswordConflict.className = 'info-hidden';
	}

	if (userName != "" && userPassword != "" && confirmPassword != "" && userPassword == confirmPassword && answer != "" && index != 0 && checkBox.checked) {
		//encrypt password
		var signUpInfo = {"username": userName, "password": userPassword, "question": index, "answer": answer};
		sendSignUpInfoToServer(signUpInfo);
	}
}

function sendSignUpInfoToServer(signUpInfo) {
	var xhr = new XMLHttpRequest();
	var params = 'username=' + signUpInfo["username"] + '&' +
		'password=' + signUpInfo["password"] + '&' +
		'question=' + signUpInfo["question"] + '&' +
		'answer=' + signUpInfo["answer"];
	xhr.open('POST', '/signup');
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	/*xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			callback();
		}
	}*/
	xhr.send(params);
}

window.addEventListener('load', init);
