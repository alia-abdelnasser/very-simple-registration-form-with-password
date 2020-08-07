(function () {
    var signinUrl = 'https://my-json-server.typicode.com/alia-abdelnasser/very-simple-registration-form-with-password/accounts';

    var fullname = document.querySelector('#fullname');
    var fullnamelabel = document.querySelector('.label-fullname');

    var email = document.querySelector('#email');
    var emailVM = document.querySelector('.validation-msg-email');
    var emaillabel = document.querySelector('.label-email');

    var username = document.querySelector('#username');
    var usernameVM = document.querySelector('.validation-msg-username');
    var usernamelabel = document.querySelector('.label-username');

    var password = document.querySelector('#password');
    var passwordVM = document.querySelector('.validation-msg-password');
    var passwordlabel = document.querySelector('.label-password');
    var passwordStrength = document.querySelector('.strength');

    var submitBtn = document.querySelector('#submitBtn');
    var loader = document.querySelector('.lds-ellipsis');
    var resultMsg = document.querySelector('.result-msg');

    function post(url, data, cb) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            cb(JSON.parse(this.responseText));
        }
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    }

    function submitForm() {
        // show loader
        loader.style.display = 'inline-block';
        // disable button
        submitBtn.disabled = true;
        post(signinUrl, {
            username: document.querySelector('#username').value,
            password: document.querySelector('#password').value
        }, function (res) {
            // show error msg
            if (res.error.msg) {
                resultMsg.textContent = res.error.msg;
                resultMsg.style.display = 'block';
            }
            // hide loader
            loader.style.display = 'none';
            // enable button
            submitBtn.disabled = false;
        });
    }

    function validateFullname() {
        // check if field is filled with data to show the hover label
        if (fullname.value.trim().length === 0) {
            fullnamelabel.classList.remove('filled');
        } else {
            fullnamelabel.classList.add('filled');
        }
    }

    // on focus hide placeholder
    fullname.addEventListener('focus', function () { fullname.placeholder = ''; });
    // on blur validate, retrive placeholder, hide resultMsg
    fullname.addEventListener('blur', function () { validateFullname(); fullname.placeholder = 'Full name (Optional)'; resultMsg.style.display = 'none'; });

    function validateEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // check if field is filled with data to show the hover label
        // check if field is empty and show validation error
        // check if email is valid pattern and show validation error
        if (email.value.trim().length === 0) {
            email.style.borderBottom = '1px solid red';
            emailVM.textContent = 'Email is required!';
            emailVM.style.display = 'block';
            emaillabel.classList.remove('filled');
            return false;
        } else if (!re.test(String(email.value).toLowerCase())) {
            email.style.borderBottom = '1px solid red';
            emailVM.textContent = 'Email is invalid!';
            emailVM.style.display = 'block';
            emaillabel.classList.add('filled');
            return false;
        } else {
            email.style.borderBottom = '1px solid #ccc';
            emailVM.style.display = 'none';
            emaillabel.classList.add('filled');
            return true;
        }
    }

    // on focus hide placeholder
    email.addEventListener('focus', function () { email.placeholder = ''; });
    // on blur validate, retrive placeholder, hide resultMsg
    email.addEventListener('blur', function () { validateEmail(); email.placeholder = 'Email'; resultMsg.style.display = 'none'; });
    // on keyuo (change) validate
    email.addEventListener('keyup', validateEmail);

    function validateUsername() {
        // check if field is filled with data to show the hover label
        // check if field is empty and show validation error
        if (username.value.trim().length === 0) {
            username.style.borderBottom = '1px solid red';
            usernameVM.textContent = 'User name is required!';
            usernameVM.style.display = 'block';
            usernamelabel.classList.remove('filled');
            return false;
        } else if (username.value.trim().indexOf(' ') > -1) {
            username.style.borderBottom = '1px solid red';
            usernameVM.textContent = 'User name should be one word!';
            usernameVM.style.display = 'block';
            usernamelabel.classList.add('filled');
            return false;
        } else {
            username.style.borderBottom = '1px solid #ccc';
            usernameVM.style.display = 'none';
            usernamelabel.classList.add('filled');
            return true;
        }
    }

    // on focus hide placeholder
    username.addEventListener('focus', function () { username.placeholder = ''; });
    // on blur validate, retrive placeholder, hide resultMsg
    username.addEventListener('blur', function () { validateUsername(); username.placeholder = 'User name'; resultMsg.style.display = 'none'; });
    // on keyuo (change) validate
    username.addEventListener('keyup', validateUsername);

    function validatePasswordStrength(passwordValue) {
        var strengthPatterns = new Array();
        strengthPatterns.push(new RegExp('[A-Z]'));
        strengthPatterns.push(new RegExp('[a-z]'));
        strengthPatterns.push(new RegExp('[0-9]'));
        strengthPatterns.push(new RegExp('[$@$!%*#?&]'));

        // calculate password strength according to length and matching strength pattaerns
        var strength = 0;
        if (passwordValue.length >= 8) {
            strength++;
        }
        if (passwordValue.length >= 6) {
            strength++;
        }
        if (passwordValue.length >= 4) {
            strength++;
        }

        for (var i = 0; i < strengthPatterns.length; i++) {
            if (strengthPatterns[i].test(passwordValue)) {
                strength++;
            }
        }

        return strength;
    }

    function validatePassword() {
        var strength = validatePasswordStrength(password.value);
        // set how password strength will be displayed
        switch (strength) {
            case 0:
                break;
            case 1:
            case 2:
                passwordStrength.style.color = 'red';
                passwordStrength.textContent = 'Weak!';
                break;
            case 3:
            case 4:
            case 5:
                passwordStrength.style.color = 'orange';
                passwordStrength.textContent = 'Medium!';
                break;
            case 6:
            case 7:
                passwordStrength.style.color = 'green';
                passwordStrength.textContent = 'Strong!';
                break;
        }

        // check if field is filled with data to show the hover label
        // check if field is empty and show validation error
        // check if password is strong show validation error
        if (password.value.trim().length === 0) {
            password.style.borderBottom = '1px solid red';
            passwordVM.textContent = 'Password is required!';
            passwordVM.style.display = 'block';
            passwordlabel.classList.remove('filled');
            return false;
        } else if (strength < 6) {
            password.style.borderBottom = '1px solid red';
            passwordVM.textContent = 'Make password strong by adding uppercase, lowercase, special characters and numbers and length to be more than 6 characters!';
            passwordVM.style.display = 'block';
            passwordlabel.classList.add('filled');
            return false;
        } else {
            password.style.borderBottom = '1px solid #ccc';
            passwordVM.style.display = 'none';
            passwordlabel.classList.add('filled');
            return true;
        }
    }
    // on focus hide placeholder
    password.addEventListener('focus', function () { password.placeholder = ''; });
    // on blur validate, retrive placeholder, hide resultMsg
    password.addEventListener('blur', function () { validatePassword(); password.placeholder = 'Password'; resultMsg.style.display = 'none'; });
    // on keyuo (change) validate
    password.addEventListener('keyup', validatePassword);

    function validateForm() {
        // validate required field and focus on first error

        if (!validateEmail()) {
            email.focus();
            return;
        }
        if (!validateUsername()) {
            username.focus();
            return;
        }
        if (!validatePassword()) {
            password.focus();
            return;
        }

        submitForm();
    }

    submitBtn.addEventListener('click', validateForm);
})();
