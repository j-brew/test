$(document).ready(function() {
    
    var todoArray = new Array;      // FOR id, description, complete
    
    $( "#todoslist" ).sortable();
    $(function() {$("#menu").tabs();});
    $("#tab1").css("border-bottom", "#C73F17 solid 2px"); // indicating active tab
    
    $(function getYourTodos(){
        var queryString = new Array();
        $(function () {
            if (queryString.length == 0) {
                if (window.location.search.split('?').length > 1) {
                    var params = window.location.search.split('?')[1].split('&');
                    for (var i = 0; i < params.length; i++) {
                        var key = params[i].split('=')[0];
                        var value = decodeURIComponent(params[i].split('=')[1]);
                        queryString[key] = value;
                    }
                }
            }
            if (queryString["api_token"] != null && queryString["id"] != null) {
                var tok = queryString["api_token"];
                var idd = queryString["id"];
                setUser(tok,idd);
                loadTodos();
            }
        });
    });

    function setUser(retrivedToken, retrivedId){        // added to API
        Todo.setUser({
            token: retrivedToken,
            id:    retrivedId
        });
    }
    
    
    function loadTodos(){
        Todo.loadTodos({
            success: function(todos) { logTodos(todos);},
            error:   function(xhr)   { alert('todo load error! : loadTodos'); console.log(xhr); }
    	});
    }
    
    function logTodos(todos){	//  out put to html as list items
        console.log(todos.length+" TODOS:"+todos);
        var td = "";
    	for (i=0;i<todos.length;i++){
            todoArray.push([todos[i].id, todos[i].description, todos[i].is_complete]);
            console.log(todos[i].id+" - "+todos[i].description+ " - "+todos[i].is_complete);
            td += "<li><div class=\"listitem\"><p>"+todos[i].description+ "</p><div class=\"comp\"><input id=\""+i+"\" class=\"check\" type=\"checkbox\"";
            if(todos[i].is_complete==true)
                td += " checked >"
            td += "</div></div></li>";
        }
        if (todos.length < 1){
            td = "<li><p>click create TO DO tab to start your list</p></li>"
        } 
        $('#todoslist').html(td); 
    }
    
    function createTodo(desc){  // create todo with description only  
    	Todo.createTodo({
            todo: {"description":desc},
            success: function(todo) { loadTodos();},
            error:   function(xhr)  { alert('todo update error!'); }
    	});
    }
    
    function updateTodo(msgId, desc, isIt){
    			
    	Todo.updateTodo({
            todoId:  msgId,
            data: {"description":desc, "is_complete":isIt},
            success: function(update) {  console.log(update);},
            error:   function(xhr) {alert('todo update error!'); console.log(xhr); }
    	});
    }
    
    function endSession(){
    	Todo.endSession({
            success: function(signOut) { window.location.href = "index.html";},
            error:   function(xhr) { alert('Sign out ERROR!'); console.log(xhr);}
    	});
    }
    
    // CREATE/SUBMIT BUTTON
    var submit = document.getElementById('create');
    submit.addEventListener('click', function() {
    	createTodo(document.getElementById("writetodo").value);
    }, false);
    
    // ON CLICK function for CHECKBOXs' in the todo list
    // updates "that" todo after click
    var checkId;
    $(document).on('click', '.check', function(){
        checkId = this.id;

        if(todoArray[checkId][2]==true)
            todoArray[checkId][2]=false;
        else
            todoArray[checkId][2]=true;
        
        updateTodo(todoArray[checkId][0], todoArray[checkId][1], todoArray[checkId][2]);
    });

    var siout = document.getElementById('signout');
    siout.addEventListener('click', function() {
	endSession();
    }, false);
    
    // ON CLICK for tab#1 and tab#2
    // removes the bottom border indicating activity
    $(document).on('click', '#tab1', function(){
        $("#tab2").css("border-bottom", "black solid 2px");
        $("#tab1").css("border-bottom", "#C73F17 solid 2px");
    });
    $(document).on('click', '#tab2', function(){
        $("#tab1").css("border-bottom", "black solid 2px");
        $("#tab2").css("border-bottom", "#C73F17 solid 2px");
    });
});
