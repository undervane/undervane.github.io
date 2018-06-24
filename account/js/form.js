
// Initializes Form Buttons' Event Listeners

function initForm(){

    $('#left-option').on('click', function(){

        let state = $('#action-btn').attr('state');

        switch (state){

            case 'login': toggleState('forgot'); break;
            case 'register': toggleState('forgot'); break;
            case 'forget': toggleState('login'); break;
            default: console.warn('Wrong State');

        }
        

    });

    $('#right-option').on('click', function(){

        let state = $('#action-btn').attr('state');
    
        switch (state){

            case 'login': toggleState('register'); break;
            case 'register': toggleState('login'); break;
            case 'forget': toggleState('register'); break;
            default: console.warn('Wrong State');

        }

    });

}

// Transition between page states

function toggleState(state){

    let name = $('#form-name');
    let email = $('#form-email');
    let email_confirm = $('#form-email-confirm');
    let password = $('#form-password');
    let password_confirm = $('#form-password-confirm');
    let btn = $('#action-btn');
    let left = $('#left-option');
    let right = $('#right-option');
    let img = $('#penguin');
    
    switch (state) {
        case 'forgot':

            name.addClass('hidden');
            email.removeClass('hidden');
            email_confirm.addClass('hidden');
            password.addClass('hidden');
            password_confirm.addClass('hidden');

            btn.html('Recover');

            left.html('Login to Account');
            right.html('Create an Account');

            img.removeClass('hidden');

            btn.attr('state', 'forget');
            
            break;

        case 'register':

            name.removeClass('hidden');
            email.removeClass('hidden');
            email_confirm.removeClass('hidden');
            password.removeClass('hidden');
            password_confirm.removeClass('hidden');

            btn.html('Register');

            left.html('Forgot my Password');
            right.html('Login to Account');

            img.addClass('hidden');

            btn.attr('state', 'register');
            
            break;

        case 'login':

            name.addClass('hidden');
            email.removeClass('hidden');
            email_confirm.addClass('hidden');
            password.removeClass('hidden');
            password_confirm.addClass('hidden');

            btn.html('Login');

            left.html('Forgot my Password');
            right.html('Create an Account');

            img.removeClass('hidden');

            btn.attr('state', 'login');
            
            break;
    
        default:
            break;
    }

}

// FormData Object

function createFormData(){

    let name = $('#name').val();
    let email = $('#email').val();
    let password = $('#password').val();

    var formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    var request = new XMLHttpRequest();
    request.open("POST", "http://foo.com/submitform.php");
    request.send(formData);

}