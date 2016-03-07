$(function() {
	var SERVER_URL = "http://192.168.1.99/cws2/";
	console.log(SERVER_URL);
	
	
	$(document).keypress(function(e) {
    if(e.which == 13) {
        $("#button_login").click();
        console.log("enter");
    }
	});
	
	//~ login
	$("#button_login").click(function(){
		var user_name = $("input[name='user_name']");
		var user_password = $("input[name='user_password']");
		var op = $("input[name='op']");
		if( user_name.val() ==""){
			alert("Username is required");
			user_name.focus();
		}
		else if( $.md5(user_password.val()) ==""){
			alert("Password is required");
			user_password.focus();
		}
		else{
			$.ajax({
				type: "POST",
				cache: false,
				url: SERVER_URL,
				data: $('#form_login').serialize(),
				//~ data: { user_name: user_name.val(), user_password: $.md5(user_password.val()),op:op.val() },
				dataType:'text',
				success: function(result){
					//~ console.log(result);
					var json = $.parseJSON(result);
					var status = json['data'].status;
					console.log(status);
					console.log($.md5(user_password.val()));
					
					
					if(status=="success"){
						op.val("get_user_secret_key");
						$.ajax({
							type:"POST",
							cache:false,
							url: SERVER_URL,
							data: $('#form_login').serialize(),
							dataType:'text',
							success: function(result2){
								//~ console.log(result2);
									
								var json2 = $.parseJSON(result2);
								var secret_key = json2['data'][0].secret_key;
								
								//~ console.log(secret_key);
								localStorage.setItem("secret_key", secret_key);
								op.val("login");
								window.location.replace("index.html");
							},
							error: function (request, status, error) {
					        alert(request.responseText);
					    }
						});
						
					}
					else if(status=="user_is_logged"){
						alert("User is logged !");
						user_name.val("");
						user_password.val("");
						user_name.focus();
						//~ notify("test","danger");
					}
					else{
						alert("User not found !");
						user_name.val("");
						user_password.val("");
						user_name.focus();
					}
				},
				error: function (request, status, error) {
		        alert(request.responseText);
		    }
			});
		}
	});
});
