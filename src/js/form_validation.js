function setErrorMessage(el, message) {
    $(el).data('errorMessage', message);
}

function validateKeywords() {
    let keywords = document.getElementById('meta-k');
    let pattern = /(\S+(,|, +|,\s+))+\S+/;
    let valid = pattern.test(keywords.value);
    if (!valid) {
        setErrorMessage(keywords, 'Please separate with commas');
    }
    return valid;
}

function showErrorMessage(el) {
    let $el = $(el);
    let $errorContainer = $el.siblings('.error');
    if (!$errorContainer.length) {
        $errorContainer = $('<span class="error"></span>').insertAfter($el);
    }
    $errorContainer.text($(el).data('errorMessage'));
}

function isEmpty(el) {
    return !el.value || el.value == el.placeholder;
}

function isRequired(el) {
    return ((typeof el.required === 'boolean') && el.required);
}

function validateRequired(el) {
    if (isRequired(el)) {
        let valid = !isEmpty(el);
        if (!valid) {
            setErrorMessage(el, 'Field is required')
        }
        return valid;
    }
    return true;
}

function removeErrorMessage(el) {
    let $el = $(el);
    $el.removeAttr('errorMessage');
    $el.siblings('.error').remove();
}

function validateLayout() {
    let el = document.getElementById('layout-o');
    let valid = !(el.value === 'Layout');
    if (!valid) {
        setErrorMessage(el, '\'Layout\' is not a layout');
    }
    return valid;
}

function validateEmail() {
    let el = document.getElementById('user-e');
    let valid = /[^@]+@[^@]+/.test(el.value);
    if (!valid) {
        setErrorMessage(el, 'Please use a valid e-mail');
    }
    return valid;
}

function validateUsername(cb) {
    let el = document.getElementById('user-n');
    let text = el.value,
        valid;
    $.ajax({
        method: 'POST',
        url: '/parse/username',
        data: text,
        contentType: 'text/plain; charset=UTF-8',
        dataType: 'text'
    }).done(function(data) {
        console.log(data);
        if (data === 'true') {
            valid = true;
        } else {
            valid = false;
        }
        console.log(valid);
        if (!valid) {
            setErrorMessage(el, 'Username is already taken');
        }
        cb(valid);
    });
}

function setCookie(name, value, exDays) {
    const d = new Date();
    if (exDays) {
        d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));
        let expires = 'expires=' + d.toUTCString();
        document.cookie = `${name}=${value};${expires};path=/`;
    } else {
        document.cookie = `${name}=${value};`;
    }
    console.log('create cookie');
}
(function() {
    $('form').on('submit', function(e) {
        e.preventDefault();
        let elements = this.elements;
        let valid = {};
        let isValid;
        let isFormValid;
        for (let i = 0, l = (elements.length - 1); i < l; i++) {
            isValid = validateRequired(elements[i]);
            if (!isValid) {
                showErrorMessage(elements[i]);
            } else {
                removeErrorMessage(elements[i]);
            }
            valid[elements[i].id] = isValid;
        }
        if (location.pathname === '/new_site/') {
            if ($('#meta-k').val() !== '') {
                if (!validateKeywords()) {
                    showErrorMessage(document.getElementById('meta-k'));
                    valid['meta-k'] = false;
                } else {
                    removeErrorMessage(document.getElementById('meta-k'));
                }
            }
            if (!validateLayout()) {
                showErrorMessage(document.getElementById('layout-o'));
                valid['layout-o'] = false;
            } else {
                removeErrorMessage(document.getElementById('layout-o'));
            }
        } else {
            if ($('user-e').val() !== '') {
                if (!validateEmail()) {
                    showErrorMessage(document.getElementById('user-e'));
                    valid['user-e'] = false;
                } else {
                    removeErrorMessage(document.getElementById('user-e'));
                }
            }
            if (location.pathname === '/sign_up/') {
                if ($('user-n').val() !== '') {
                    validateUsername(isvalid => {
                        if (!isvalid) {
                            showErrorMessage(document.getElementById('user-n'));
                            valid['user-n'] = false;
                        } else {
                            removeErrorMessage(document.getElementById('user-n'));
                        }
                    })
                }
            }
        }
        for (const field in valid) {
            if (!valid[field]) {
                isFormValid = false;
                break;
            }
            isFormValid = true;
        }
        if (isFormValid) {
            if (location.pathname !== '/new_site/') {
                $.post('/js/json/user.json', {
                    'username': $('user-n').val(),
                    'password': $('user-pswd').val()
                }).done(data => {
                    console.log(data);
                });
            }
            // this.submit();
        }
    });
}());