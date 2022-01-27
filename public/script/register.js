/*global $, document, window, setTimeout, navigator, console, location*/
$(document).ready(function () {

    'use strict';

    var usernameError = true,
        firstNameError = true,
        lastNameError = true,
        passwordError = true,
        phoneError = true,
        passConfirm = true;

    // Detect browser for css purpose
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        $('.form form label').addClass('fontSwitch');
    }

    // Label effect
    $('input').focus(function () {

        $(this).siblings('label').addClass('active');
    });

    // Form validation
    $('input').blur(function () {

        // User Name
        if ($(this).hasClass('name')) {
            if ($(this).val().length === 0) {
                $(this).siblings('span.error').text('Please type your username').fadeIn().parent('.form-group').addClass('hasError');
                usernameError = true;
            } else if ($(this).val().length > 1 && $(this).val().length <= 5) {
                $(this).siblings('span.error').text('Please type at least 6 characters').fadeIn().parent('.form-group').addClass('hasError');
                usernameError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                usernameError = false;
            }
        }
        // first name
        if ($(this).hasClass('firstName')) {
            if ($(this).val().length == '') {
                $(this).siblings('span.error').text('Please type your first name').fadeIn().parent('.form-group').addClass('hasError');
                firstNameError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                firstNameError = false;
            }
        }
        // last name
        if ($(this).hasClass('lastName')) {
            if ($(this).val().length == '') {
                $(this).siblings('span.error').text('Please type your last name').fadeIn().parent('.form-group').addClass('hasError');
                lastNameError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                lastNameError = false;
            }
        }
        //phone number
        if ($(this).hasClass('phone')) {
            if ($(this).val().length == '' || $(this).val().length > 12 || $(this).val().length < 10) {
                $(this).siblings('span.error').text('Please type your phone number (0915***4967)').fadeIn().parent('.form-group').addClass('hasError');
                phoneError = true;
            } else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                phoneError = false;
            }
        }
        // PassWord
        if ($(this).hasClass('pass')) {
            let reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            console.log(reg.test($('#password').val()));
            if (!reg.test($('#password').val())) {
                $(this).siblings('span.error').text('8 charcters lower,upercase letter,special character(!@#$&) )').fadeIn().parent('.form-group').addClass('hasError');
                passwordError = true;
            }
            else {
                $(this).siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
                passwordError = false;
            }
        }
        // PassWord confirmation
        if ($('.pass').val() !== $('.passConfirm').val()) {
            $('.passConfirm').siblings('.error').text('Passwords don\'t match').fadeIn().parent('.form-group').addClass('hasError');
            passConfirm = false;
        } else {
            $('.passConfirm').siblings('.error').text('').fadeOut().parent('.form-group').removeClass('hasError');
            passConfirm = false;
        }
        // label effect
        if ($(this).val().length > 0) {
            $(this).siblings('label').addClass('active');
        } else {
            $(this).siblings('label').removeClass('active');
        }
    });
    // // Reload page
    // $('a.profile').on('click', function () {
    //     location.reload(true);
    // });
});
