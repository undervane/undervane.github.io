
$(function(){

    initForm();
    $("#accountForm").validate({
        rules : {
            email:{
                minlength: 2
            },
            email_confirm:{
                
            },
            password : {
                minlength : 5
            },
            password_confirm : {
                minlength : 5,
                equalTo : "#password"
            }
        }
    });

});