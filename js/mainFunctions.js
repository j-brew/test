$(document).ready(function() {

    $(function() {$("#menu").tabs();});
    $("#tab2").css("border-bottom", "black solid 2px");
    $("#tab1").css("border-bottom", "#C73F17 solid 2px");
    
    function startSession(email, password){
	Todo.startSession({
            email:    email,
            password:  password,
            success:  function(user) {   console.log(user);  goYourTodos();}, 
            error:    function(xhr)  { alert('login error!');}
    	});
    }

    function createUser(eMail, pass){
    	Todo.createUser({
            email: eMail,
            password: pass,
            success:  function(user) { alert('created account'); console.log(user); goYourTodos();},
            error:    function(xhr)  { alert('account error!'); console.log(xhr); }
    	});
    }
    function goYourTodos(){
        var url = "yourtodos.html?api_token="+Todo.USER.api_token+"&id="+Todo.USER.id;
        window.location.href = url;
    }

    // SIGN UP
    var siup = document.getElementById('signups');
    siup.addEventListener('click', function(){
        
        var email = document.getElementById("emailup").value;
        var pas1 = document.getElementById("passwd1").value;
        var pas2 = document.getElementById("passwd2").value;
        
        if(email=="" || pas1=="" || pas2==""){
            alert('enter all fields');
        }
        else if(pas1!==pas2){
            alert('passwords do not match');
        }else{
            createUser(email, pas1);
        }
    }, false);
    // LOG IN
    var lin = document.getElementById('login');
    lin.addEventListener('click', function(){
        
        var eamilIn = document.getElementById("#emailin");
        var pass = document.getElementById("#passwd");
        
        if(eamilIn=="" || pass==""){
            alert('enter all fields');
        }
        else{
            startSession(document.getElementById("emailin").value, document.getElementById("passwd").value);
        }
    }, false);
    
    // ON CLICK for tab#2
    $(document).on('click', '#tab2', function(){
        $("#tab1").css("border-bottom", "black solid 2px");
        $("#tab2").css("border-bottom", "#C73F17 solid 2px");
    });
    // ON CLICK for tab#1
    $(document).on('click', '#tab1', function(){
        $("#tab2").css("border-bottom", "black solid 2px");
        $("#tab1").css("border-bottom", "#C73F17 solid 2px");
    });

});
