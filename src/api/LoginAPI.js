var $ = require("jquery");


function validateLoginUser(param){
    return $.ajax({
        url : "/api/auth/login",
        type : "GET",
        dataType : "JSON",
        data:{
            user_name : param.user_name,
            password : param.password
        }
    });
}

function addUserwithLogOn (param){
    return $.ajax({
       url : "/api/auth/logon",
       type : "GET",
       dataType : "JSON",
       data : {
           name : param.name,
           user_name : param.user_name,
           password : param.password,
           key : param.key
       }
    });
}

module.exports = {
    validateLoginUser : validateLoginUser,
    addUserwithLogOn : addUserwithLogOn
}