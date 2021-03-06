$(document).ready(function () {
	// Getting references to our form and input
	const signUpForm = $('.register');
	const emailInput = $('#email-input');
	const passwordInput = $('#password-input');

	emailInput.on('keydown', function () {
		$('#alert').fadeOut(500);
	});
	passwordInput.on('keydown', function () {
		$('#alert').fadeOut(500);
	});

	// When the signup button is clicked, we validate the email and password are not blank
	signUpForm.on('submit', function (event) {
		event.preventDefault();
		var userData = {
			email: emailInput.val().trim(),
			password: passwordInput.val().trim(),
		};

		if (!userData.email || !userData.password) {
			return;
		}
		// If we have an email and password, run the signUpUser function
		registerUser(userData.email, userData.password);
		emailInput.val('');
		passwordInput.val('');
	});

	// Does a post to the signup route. If successful, we are redirected to the members page
	// Otherwise we log any errors
	function registerUser(email, password) {
		$.post('/api/register', {
			email: email,
			password: password,
		})
			.then(function (data) {
				window.location.replace('/');
				// If there's an error, handle it by throwing up a bootstrap alert
			})
			.catch(handleLoginErr);
	}

	function handleLoginErr(err) {
		$('#alert .msg').text(err.responseJSON.errors[0].message);
		$('#alert').fadeIn(500);
	}
});
