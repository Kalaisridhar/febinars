$(document).ready(function() {

    if($('#error-group,#error-group_1').html() == ""){
        $('#error-group,#error-group_1').hide();
    }

    if($('#success-group,#success-group_1').html() == ""){
        $('#success-group,#success-group_1').hide();
    }

    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // process the form
    $('#lead-form').submit(function(event) {

        $('.form-group').removeClass('has-error'); // remove the error class
        $('.help-block').remove(); // remove the error text

        $('.form-group').focus(function(){
            $('#error-group,#error-group_1').fadeOut();
        });

        var filter1=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        var lead_name = $('input[name=name]').val();
        var lead_email = $('input[name=email]').val();
        var lead_mobile = $('input[name=mobile]').val();
        var lead_city = $('input[name=city]').val();
        var leadsrc = getUrlParameter('leadsrc');        
        var cid = 12;        

        if(lead_name == ""){
            $('#error-group,#error-group_1').show();
            $('#error-group,#error-group_1').html('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Please Enter Your Name');
            setTimeout(function(){
                $('#error-group,#error-group_1').fadeOut();
            }, 4000);
            return false;   
        }
        else if(lead_email == ""){
            $('#error-group,#error-group_1').show();
            $('#error-group,#error-group_1').html('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Please Enter Your Email');
            setTimeout(function(){
                $('#error-group,#error-group_1').fadeOut();
            }, 4000);
            return false;   
        }
        else if(lead_mobile == ""){
            $('#error-group,#error-group_1').show();
            $('#error-group,#error-group_1').html('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Please Enter Your Mobile');
            setTimeout(function(){
                $('#error-group,#error-group_1').fadeOut();
            }, 4000);
            return false;   
        }
        else if(isNaN(lead_mobile)){
            $('#error-group,#error-group_1').show();
            $('#error-group,#error-group_1').html('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Please enter Valid Contact');
            setTimeout(function(){
                $('#error-group,#error-group_1').fadeOut();
            }, 4000);
            return false;
        }
        else if(parseInt(lead_mobile)<=0){
            $('#error-group,#error-group_1').show();
            $('#error-group,#error-group_1').html('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Please enter Valid Contact');
            setTimeout(function(){
                $('#error-group,#error-group_1').fadeOut();
            }, 4000);
            return false;
        }
        else if (!filter1.test(lead_email)) {
            $('#error-group,#error-group_1').show();
            $('#error-group,#error-group_1').html('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> Invalid E-mail Address! Please re-enter'); 
             setTimeout(function(){
                $('#error-group,#error-group_1').fadeOut();
                }, 4000);
             return false;
        }

        var formData = {};        
        
        var url='/assets/campaign.php?name='+lead_name+'&email='+lead_email+'&phone='+lead_mobile+'&city='+lead_city+'&state=&leadsrc='+leadsrc+'&cid='+cid+'&remarks=optionhydra';

        $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : url, // the url where we want to POST
            data        : formData, // our data object
            dataType    : 'json', // what type of data do we expect back from the server
            encode      : true,
            crossDomain : true
        }).done(function(data) {
            if(data.status=="E"){
                var error_msg=data.response.error_msg;
                $('#error-group,#error-group_1').show();
                $('#error-group,#error-group_1').html('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> You have been already registered'); 
                setTimeout(function(){
                    $('#error-group,#error-group_1').fadeOut();
                }, 4000);
            }else{
                $('#success-group,#success-group_1').show();
                $('#success-group,#success-group_1').html('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> Thanks for registration.<br /> Webinar link will be sent to your registered email id'); 
                $('input[name=name]').val()="";
            }
            console.log(data);
        }).fail(function(data) {
            console.log(data)
            $('#success-group,#success-group_1').show();
            $('#success-group,#success-group_1').html('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> Thanks for registration.<br /> Webinar link will be sent to your registered email id'); 
            $('input[name=name]').val()="";
        });        
        event.preventDefault();
    });

});