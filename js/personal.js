function list_family_members(unhcr_case_number){
  var secret_key = localStorage.getItem("secret_key");
  $.get(SERVER_URL+"?op=personal_family_members&unhcr_case_number="+unhcr_case_number+"&secret_key="+secret_key,function(result){
    var datas ="";
    var json = $.parseJSON(result);
    var data = json['data'];
    console.log(data);
    for(var i = 0; i <data.length;i++){
      var unhcr_case_number_family = data[i].unhcr_case_number_family;
      var family_name = data[i].family_name;
      var family_date_of_birth = data[i].family_date_of_birth;
      var family_age = data[i].family_age;
      var relation = data[i].relation;
      datas +="<tr><td>"+(i+1)+"</td><td>"+unhcr_case_number_family+"</td><td>"+family_name+"</td><td>"+family_date_of_birth+"</td><td>"+family_age+"</td><td>"+relation+"</td></tr>";
    }
    $("#family_list").html("<hr><table class='table table-bordered table-striped'><tr><th width='20px'>No</th><th width='120px'>UNHCR Family</th><th>Name</th><th width='120px'>DOB</th><th>Age</th><th>Relation</th></tr>"+datas+"</table>");
  });
}
