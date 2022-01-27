$(document).ready(function(){
	var user={};

	function register(e){
		user.idnumber = document.getElementById('idnumber').value;
		user.firstname = document.getElementById('firstname').value;
		user.lastname = document.getElementById('lastname').value;
		user.gender = document.getElementById('gender').value;
		user.bday = document.getElementById('bday').value;
		user.program = document.getElementById('program').value;
		user.yearlevel = document.getElementById('yearlevel').value;

		$.ajax({
			type:"POST",
			data:{action:"register", userdata:user},
			url:"src/php/user.php",
			success:function(response){
				idresponse = jQuery.parseJSON(response);
				var table = $("#usertable tbody");
				if(idresponse==0){
					alert("Error saving the user!");
				}else{
					user.id = idresponse;
					appendUser(user, table);
				}
				$("#userForm").find("input, select").val("");
			},
		});


		e.preventDefault();
	}

	function getUsers(){
		$.ajax({
			type:"GET",
			data:{action:"getusers"},
			url:"src/php/user.php",
			success:function(response){
				users = jQuery.parseJSON(response);
				var table = $("#usertable tbody");
				for(var i =0; i < users.length;i++){
					appendUser(users[i], table);
				}	

			},
		});
	}


	function appendUser(user, table){
		row = "<tr>"+
			"<th scope=\"row\">"+ user.id +"</th>"+
		      "<td>"+ user.idnumber +"</td>"+
		      "<td>"+ user.firstname +"</td>"+
		      "<td>"+ user.lastname +"</td>"+
		      "<td>"+ user.gender +"</td>"+
		      "<td>"+ user.bday +"</td>"+
		      "<td>"+ user.program +"</td>"+
		      "<td>"+ user.yearlevel +"</td>"+
		     "<td>" + "<button type='button'" + "style='background-color:skyblue'" + "class='btn btn-default'" + "id='upbtn'" + ">update" + "</button>" + "</td>" +
		    "<td>" + "<button type='button' " + "style='background-color:#ff4f4f'" +  "onclick='fordel("+user.id+");' " + "class='btn btn-default'"+">delete</button>" + "</td>" +
			"</tr>";	
		table.append(row);	
	}


	$("#userForm").submit(register);

	getUsers();
});


/***** for delete*****/
function fordel(userid){
    var x = userid;

	$.ajax({
       
       type:"GET",
	   data:{act:"deleteuser",value:x},
	   url:"src/php/user.php",
	   success: function(response){
         
        alert("Deleted Successfully.");
        window.location.reload();	   	

	   }

	});
}


/*** update button click function ****/
$(document).on("click","#upbtn", function(){ 
		$('#myModal').modal('show')
		$tr = $(this).closest('tr');
		var data = $tr.children('td').map(function(){
			return $(this).text();
		}).get();

        $('#oldid').val(data[0]);
		$('#idnumber2').val(data[0]);
		$('#firstname2').val(data[1]);
		$('#lastname2').val(data[2]);
		$('#gender2').val(data[3]);
		$('#bday2').val(data[4]);
		$('#program2').val(data[5]);
		$('#yearlevel2').val(data[6]);

		
	});	

//for save button click
	$(document).on("click","#savebtn", function(e){  		
		var oldid = $('#oldid').val();
		var idnumber2 = $('#idnumber2').val();
		var firstname2 = $('#firstname2').val();
		var lastname2 = $('#lastname2').val();
		var gender2 = $('#gender2').val();
		var bday2 = $('#bday2').val();
		var program2 = $('#program2').val();
		var yearlevel2 = $('#yearlevel2').val();
		$.ajax({
			type:"POST",
			data:{action:"update",anoldid:oldid, anidnumber:idnumber2, afirstname:firstname2, alastname:lastname2, agender:gender2, abday:bday2, aprogram:program2, ayearlevel:yearlevel2},
			url:"src/php/user.php",
			success:function(response){		

				alert("Updated Successfully.");
	       	    window.location.reload();
				
			},
		});
		e.preventDefault();
   	});   

		$(document).on("click","#closeBTN", function(){  
		$('#myModal').modal('hide')
		
	});



