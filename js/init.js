$(function() {
	var SERVER_URL = "http://192.168.1.99/cws2/";
	var current_url = $(location).attr('href');
	var b = current_url.split("/");
	var c = b[4].split("#");
	var secret_key = localStorage.getItem("secret_key");
	var secret_key_correct ;
		//~ console.log("secret_key=>"+secret_key);
	$.get(SERVER_URL+"?op=secret_key_check&secret_key="+secret_key,function(result){
			var family_list ="";
			var json = $.parseJSON(result);
			var data = json['data'];
			var status = data.status;

			secret_key_correct = status;

	}).
	done(function(){
			console.log("secret_key :"+secret_key_correct);
			//jika sudah ada secret_key
			if(secret_key_correct == "success"){

				if(b[4]=="login.html"){
					window.location.replace("index.html");
				}

				//buat menu
				var sidebar = "";
				$.get(SERVER_URL+"?op=get_menu_list",function(result){
						var menu ="";
						var json = $.parseJSON(result);
						var data = json['data'];
						//~ console.log(data);

						for(var i = 0; i <data.length;i++){
							//~ console.log(json['data'][i].menu_id);
							var menu_icon = data[i].menu_icon;
							var menu_id = data[i].menu_id;
							var menu_name = data[i].menu_name;
							var menu_url = data[i].url;

							//~ console.log(menu_name);
							menu += '<li id="'+menu_id+'" class="menu"><a class="capital" href="'+menu_url+'"><i class="'+menu_icon+'"></i> '+menu_name+'</a></li>';
						}

						var sidebar ='<ul class="nav" id="side-menu"> '+menu+'</ul>';
						//$("#sidebar").html('<ul class="nav" id="side-menu"> '+menu+'</ul>');
						$("#sidebar").html(sidebar);


						//buat submenu
						var menu_ = $(".menu");

						for (var j=0;j<menu_.length;j++){
							var menu_id_ = menu_.eq(j).attr("id");
							//~ console.log(menu_id_);
							$.get(SERVER_URL+"?op=get_submenu_list&menu_id="+menu_id_,function(result2){
								var json2 = $.parseJSON(result2);
								var data2 = json2['data'];
								var submenu = "";
								var submenu_ = "";

									// console.log("submenu-----------");
									// console.log(data2);

									if(data2.length>0){
										for(var j = 0; j <data2.length;j++){
											var menu_id__ = data2[j].menu_id;
											var submenu_icon = data2[j].submenu_icon;
											var submenu_id = data2[j].submenu_id;
											var submenu_name = data2[j].submenu_name;
											var submenu_url = data2[j].url;

											submenu_+='<li id="'+submenu_id+'" class="submenu"><a class="capital" href="'+submenu_url+'" ><i class="'+submenu_icon+'"></i> '+submenu_name+'</a ></li>';
										}
										submenu+='<ul class="nav nav-second-level" >'+submenu_+'</ul>';
										//~ console.log(menu_id_);
										$("#"+menu_id__+" a i").after('<span class="fa arrow"></span>');
										$("#"+menu_id__+" a").after(submenu);


										// subsubmenu -------------------------
										var submenu_ = $("li.submenu");
										// console.log(submenu_.length);
										for (var j=0;j<submenu_.length;j++){
											var submenu_id = submenu_.eq(j).attr("id");
											$.get(SERVER_URL+"?op=get_subsubmenu_list&submenu_id="+submenu_id,function(result_subsubmenu){
												var json_subsubmenu = $.parseJSON(result_subsubmenu);
												var data_subsubmenu = json_subsubmenu['data'];
												var subsubmenu="";
												var subsubmenu_="";
												if(data_subsubmenu.length>0){
													for(var k = 0; k <data_subsubmenu.length;k++){
														var submenu_id_ = data_subsubmenu[k].submenu_id;
														var subsubmenu_icon = data_subsubmenu[k].subsubmenu_icon;
														var subsubmenu_id = data_subsubmenu[k].subsubmenu_id;
														var subsubmenu_name = data_subsubmenu[k].subsubmenu_name;
														var subsubmenu_url = data_subsubmenu[k].url;

														// console.log(subsubmenu_id);
														subsubmenu_ += '<li id="'+subsubmenu_id+'"><a href="'+subsubmenu_url+'">'+subsubmenu_name+'</a></li>';
													}
													subsubmenu ='<ul id="subsub_'+submenu_id_+'" class="nav nav-third-level">'+subsubmenu_+'</ul>';
													if($("#subsub_"+submenu_id_).length<1){
														$("#"+submenu_id_+" a").append('<span class="fa arrow"></span>');
														$("#"+submenu_id_).append(subsubmenu);
													}
												}
											});

										}

										// subsubmenu -------------------------


									}
							});

						}//endfor

						// console.log("menu+submenu selesai---");
				});









				//navigation
				$("#wrapper").prepend(' <!-- Navigation -->'+
		        '<nav class="navbar navbar-default navbar-fixed-top" role="navigation" style="margin-bottom: 0">'+
		            '<div class="navbar-header">'+
		                '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">'+
		                    '<span class="sr-only">Toggle navigation</span>'+
		                    '<span class="icon-bar"></span>'+
		                    '<span class="icon-bar"></span>'+
		                    '<span class="icon-bar"></span>'+
		                '</button>'+
		                '<img src="images/logo.svg" class="navbar-logo">'+
		                '<a class="navbar-brand" href="index.html">cws</a>'+
		            '</div><!-- /.navbar-header -->'+
		            '<ul class="nav navbar-top-links navbar-right">'+
		                '<!-- /.dropdown -->'+
		                '<li class="dropdown">'+
		                    '<a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-user fa-fw"></i>  <i class="fa fa-caret-down"></i></a>'+
		                    '<ul class="dropdown-menu dropdown-user">'+
		                        '<li><a href="#"><i class="fa fa-user fa-fw"></i> User Profile</a></li>'+
		                        '<!-- <li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a></li> -->'+
		                        '<li class="divider"></li>'+
		                        '<li id="logout"><a href="logout.html"><i class="fa fa-sign-out fa-fw"></i> Logout</a></li>'+
		                    '</ul><!-- /.dropdown-user -->'+
		                '</li><!-- /.dropdown -->'+
		            '</ul><!-- /.navbar-top-links -->'+
		            '<div class="navbar-default sidebar" role="navigation">'+
		                '<div class="sidebar-nav navbar-collapse" id="sidebar"></div><!-- /.sidebar-collapse -->'+
		            '</div><!-- /.navbar-static-side --></nav>');

		    $("a.navbar-brand").text("CWS (Church World Service) Indonesia");

				$.get(SERVER_URL+"?op=viewuser&secret_key="+secret_key,function(result){
						var json = $.parseJSON(result);
						var data = json['data'];
						var real_name = data[0].user_real_name;

						$('li.dropdown a.dropdown-toggle ').prepend("<span class='capital'>"+real_name+" </span>");

				});

			}
			//jika belum ada secret_key
			else{
				//~ console.log(current_url);
				localStorage.setItem("secret_key",null);
				console.log(b[4]);
				if(b[b.length-1]!="login.html"){
					$("body").html("");
					//~ alert("Please, login to continue");
					window.location.replace("login.html");
				}
				$('body').append('<script src="js/jquery.md5.js"></script>');

			}




	});


	//~ -------------------
	function notify(str,status){
		var body = $("body").html();
		var alert_ = '<div class="alert alert-'+status+'fade in"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Info!</strong> '+str+'</div>';

		var d = alert_+body;
		$("body").html(d);
	}

});

setTimeout(function () {
      	$('body').append('<script src="js/bootstrap.min.js"></script><script src="js/bootstrap-datepicker.js"></script><script src="js/jquery.md5.js"></script><script src="js/metisMenu.min.js"></script><script src="js/sb-admin-2.js"></script>');
    }, 800);
