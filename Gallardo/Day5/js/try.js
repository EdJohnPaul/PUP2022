
    var App = {
        canvas:$("#canvas"),
        url: "http://gallardo/Day5/#",
        api: "/api"
    }
    var loginCred = localStorage.getItem('loginCred');
    var logcred = JSON.parse(loginCred);
    var logout = 0;
    var login = 0;
    var usercred = []; // user input storage for login
    var storeUser = []; // user input storage for signup

$(document).ready(function(){
    $.Mustache.load('templates.html').done(function () {
        Path.map("#/login").to(function(){
            App.canvas.mustache('login');
            prevAccess(logcred);
            //------ Login Javascripts --------//
            var userInfo = localStorage.getItem('userInfo');
            var obj = JSON.parse(userInfo);
            console.log(obj);
            console.log(App.url+App.api + "/login");
            //-------Event Handler for Form submission-------//
                $('#flogin').submit(function(e){ 
                        e.preventDefault();                                   
                        var uname = $('#uname').val();
                        var email = $('#logemail').val();
                        var password = $('#logpassword').val();
                        var err = 0;
                        let messages = [];
                        
            //-----------User Input Validations----------//
    
                    if (uname == "" || uname == null)
                    {
                        messages.push("Username is required ");
                        err = 1;
                    }
                    if(email == "" || email == null)
                    {
                        messages.push("email is required ");
                        err = 1;
                    }
                    if(password == "" || password == null)
                    {
                        messages.push("Password is required ");
                        err = 1;
                    }
                    if ( err == 1)
                    {
                        alert(messages);
                    }
                    
                    else
                    {
                        //-----------Check user cred inputs------------//
                        console.log(App.url + App.api + "/check");
                        var found = 0;
                        $.ajax({
                            type: "post",
                            url: "api/check", 
                            dataType: "json",
                            data: {
                                uname : uname,
                                email : email,
                                pswd : password
                            },
                            success: function (response){
                                console.log(response.valid)
                                if(response.valid)
                                {
                                    login = 1;
                                    alert('Hello! You are logged in');
                                    window.location.replace("#/home");
                                    window.location.reload();
                                    found = 1;
                                    console.log(found);
                                    //-----Save to Local Storage-----//
                                    saveArr(response.userid,response.uname,response.email,response.password);
                                    localStorage.setItem("loginCred", JSON.stringify(usercred));
                                }
                                else
                                {
                                    alert("The username, email, or password is invalid");
                                    $('#flogin').trigger("reset");
                                }
                            }
                        });
                    timeSubmit();
                    } 
                    
                });
            
                //-------------Function for Form Submission------------//
                function timeSubmit(){
                    var todayDate = new Date();
                    console.log(todayDate);
                }
            
                //-------------Function for User Input Storage------------//
                function saveArr(userid,uname,email,password){
                    const inputs = new Array( { 
                        "Time Submited" : Date.now(),
                        "userid" : userid,
                        "Username" : uname,
                        "Email" : email,
                        "Password":password
                    });
                    usercred.push(inputs);
                    $('#flogin').trigger("reset");
                }
                $('#tosignup').click (function (){
                    window.location.replace("#/signup");
                    window.location.reload();
                    });
            
        });

        Path.map("#/home").to(function(){
            App.canvas.mustache('home');
            prevHome(login);
            $(document).ready(function(){
                $("#logout").click(function(){
                    logout = 1;
                    alert("Logging out......");
                    localStorage.removeItem('loginCred');
                    window.location.replace("#/login");
                    window.location.reload();
                });
                $("#update").click(function(){
                    alert("Want to update your info?");
                    window.location.replace("#/update");
                    window.location.reload();
                })
                $("#view").click(function(){
                    window.location.replace("#/view");
                    window.location.reload();
                })
            });
        });

        Path.map("#/signup").to(function(){
            App.canvas.mustache('signup');
            prevAccess(logcred);
            
            $('#signUp').submit(function(e){ 
                e.preventDefault();                                   
                var name = $('#fullname').val();
                var address = $('#address').val();
                var uname = $('#username').val();
                var email = $('#email').val();
                var password = $('#password').val();
                var bday = $('#bday').val();
                var contact = $('#contact').val();
                var err = 0;
                let messages = [];
                
                //-----------User Input Validation----------//        
                if (name == "" || name == null)
                {
                    messages.push("Name is Required ");
                    err = 1;
                }
    
                if (address == "" || address == null)
                {
                    messages.push("Address is required ");
                    err = 1;
                }
                if (uname == "" || uname == null)
                {
                    messages.push("Username is required ");
                    err = 1;
                }
                if(email == "" || email == null)
                {
                    messages.push("Email is required ");
                    err = 1;
                }
                if(password == "" || password == null)
                {
                    messages.push("Password is required ");
                    err = 1;
                }
                if(bday == "" || bday == null)
                {
                    messages.push("Birthday is required ");
                    err = 1;
                }
                if(contact == "" || contact == null)
                {
                    messages.push("Contact is required ");
                    err = 1; 
                }
                if ( err == 1)
                {
                    alert(messages);
                }
                else
                {
                    $.ajax({
                        type: "POST",
                        url: "api/register",
                        datatype: "json",
                        data: {
                                name : name,
                                address : address,
                                uname : uname,
                                email : email,
                                password : password,
                                bday : bday,
                                contact : contact
                            },
                        success: function (response)
                        {
                           
                            if(response.valid == true)
                            {
                                alert("Your information is registered");
                                //-----Save to Local Storage-----//
                                saveArr(response.fullname,response.address,response.username,response.email,response.password,response.bday,response.contact);
                                localStorage.setItem("users", JSON.stringify(storeuser));
                                
                            }
                            else
                            {
                               
                                alert("The information is already registered");
                                console.log(response.valid);
                            }
                        }
                        // }).done(function(data){
                        //     if(data == "User exist")
                        //     {
                        //         alert('The user have been registered');
                        //         $('#signUp').trigger("reset");
                        //     }
                        //     if(data == "User does not exist")
                        //     {
                        //         calcAge();
                        //         timeSubmit();
                        //         alert(name +" "+ address + " " + bday + " " + contact + " " + uname + " " +email);
                        //         alert('New user registered');
                        //         $('#signUp').trigger("reset");
                                
                        //     }
                        });
                }
                                
            });//end of event handler
            //-------------Event handler for "show user input" button------------//
            $('#show').click(function(){ 
                dispArr(storeUser);
            });//end of event handler

            //-------------Function for Age Calculation------------//
            function calcAge(){
                var bday = $('#bday').val();
                var birthDate = new Date($('#bday').val());
                var birthDay = birthDate.getDate();
                var birthMonth = birthDate.getMonth();
                var birthYear = birthDate.getFullYear();

                var todayDate = new Date();
                var todayDay = todayDate.getDate();
                var todayMonth = todayDate.getMonth();
                var todayYear = todayDate.getFullYear();

                var calcAge = 0;

                if(todayMonth > birthMonth)
                {
                    calcAge = todayYear - birthYear;
                }
                else if (todayMonth == birthMonth)
                {
                    if(todayDay >= birthDay)
                    {
                        calcAge = todayYear - birthYear; 
                    }
                    else
                    {
                        calcAge = todayYear - birthYear - 1;
                    }
                }
                else
                {
                    calcAge = todayYear - birthYear - 1
                }
                console.log("Age is " + calcAge);
            }//End of age calculation function

            //-------------Function for Form Submission------------//
            function timeSubmit(){
                var todayDate = new Date();
                console.log(todayDate);
            }

            //-------------Function for User Input Storage------------//
            function saveArr(name,address,username,email,password,birthday,contact){
                // const inputArr = new Array();
                const inputs = new Array( { 
                    "Time Submited" : Date.now(),
                    "Name": name,
                    "Address" : address,
                    "Username" : username,
                    "Email" : email,
                    "Password": password,
                    "Birthday" : birthday,
                    "Contact" : contact
                });

                $('#signUp').trigger("reset");
                return inputs;
            }
                
                $('#tologin').click(function(){
                    window.location.replace("#/login");
                    window.location.reload();
                });
        });
        Path.root("#/login");
        Path.listen();
    });
});    
//---------Input Restrictions-------//
function numOnly(ev){
    var ch = String.fromCharCode(ev.which)
    if(!(/[0-9]/.test(ch)))
    {
    ev.preventDefault();
    }
}
function lettersOnly(ev){
    var ch = String.fromCharCode(ev.which)
    var name = $('#fullname');
    var allow = /[a-zA-z " "]/;
    if(!(allow.test(ch))){
    ev.preventDefault();
    }
}
function noSpace(ev){
    var ch = String.fromCharCode(ev.which);
    uname = $('#username');
    var allow = /^[A-Za-z0-9_@./#&+-]*$/;
    if(!(allow.test(ch))){
    ev.preventDefault();
    }
}


function prevAccess(loginCred) //prevents logged in user to go back to login page
{
    if(loginCred === null && login==0)
    {
        return;
    }
    else if(logout == 1)
    {
        window.location.replace("#/login");
        logout = 0;
    }

    else
    {
        alert(" Oops! You are already logged in");
        window.location.replace("#/home");
        window.location.reload();
    }
}
function prevHome(login)//prevents logged out user to access pages
{
    if(login == 0 && logcred === null)
    {
        alert("You must login first");
        window.location.replace("#/login");
        window.location.reload();
        login = 0;
        return login;
    }
}
