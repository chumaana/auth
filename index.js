////////////____Input Focus___//////////////////
document.addEventListener('DOMContentLoaded', () => {

    $('.form-control').focusout(function() {
        $('.form-group').removeClass('focus');
    });
    $('.form-control').focus(function() {
        $(this).closest('.form-group').addClass('focus');
    });

    /// Input Kepress Filled  Focus
    $('.form-control').keyup(function() {
        if ($(this).val().length > 0) {
            $(this).closest('.form-group').addClass('filled');
        } else {
            $(this).closest('.form-group').removeClass('filled');
        }
    });

    /// Input Check Filled Focus
    var $formControl = $('.form-control');
    var values = {};
    var validate = $formControl.each(function() {
        if ($(this).val().length > 0) {
            $(this).closest('.form-group').addClass('filled');
        } else {
            $(this).closest('.form-group').removeClass('filled');
        }
    });

    // Button switching

    $('.close').click(function() {
        $(this).closest('.register-form').toggleClass('open');
    });

    const buttonEntry = document.querySelector('.btn');

    // const submitEntry = () => {
    //     fetch('http://goiteens.club/hse/back/students.php')
    //         .then(data => data.json())
    //         .then(data => {

    //             }

    //             let loginEntry = document.querySelector('[type="text"]'); loginEntry = loginEntry.value;
    //             let paswordEntry = document.querySelector('[type="password"]'); passwordEntry = passwordEntry.value; console.log(loginEntry)

    // }

    const form = document.querySelector('.formset');
    const inputs = form.querySelectorAll('.form-control');

    const isEmpty = (value) => value === '';



    const setInputError = (state, input, errorText = '') => {
        const formBlock = input.closest('.form-group');
        const errorBlock = formBlock.querySelector('.form__block-error');

        if (state === 'hasError') {
            formBlock.classList.add('form__block--hasError');
            errorBlock.textContent = errorText;
        } else {
            formBlock.classList.remove('form__block--hasError');
            errorBlock.textContent = '';
        }
    }

    const errors = {
        EMPTY_FIELD: '!',
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const { password, text } = form;
        let hasError = false;


        [password, text].forEach(input => {
            if (isEmpty(input.value)) {
                setInputError('hasError', input, errors.EMPTY_FIELD);
                hasError = true;
            }
        });
        const errorModalShow = () => {
            // const modalError = document.querySelector('#myModalBox');
            $('#myModalBox').modal('show');
            //console.log(modalError);
        }

        if (hasError) {
            return;
        }
        const url = `http://goiteens.club/hse/back/login.php?email=${text.value}&password=${password.value}`;
        fetch(url)
            .then(data => data.json())
            .then(data => {
                console.log(data);
                if (data.answer === 0) {
                    errorModalShow();
                }
            })
    }
    const resetInputError = (event) => {
        const { target } = event;
        setInputError('withoutError', target);
    };

    for (input of Array.from(inputs)) {
        input.addEventListener('focus', resetInputError);
    }

    form.addEventListener('submit', formSubmitHandler);
});