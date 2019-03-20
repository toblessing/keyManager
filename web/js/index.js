$(function () {
    var username = getCookie("username");
    var password = getCookie("password");
    if (username != null && username && password != null && password) {
        $("#username").val(username);
        $("#password").val(password);
        loging();
    }
})


function loging() {
    $("#loginForm").hide();
    $("#loging").show();
    var username = $("#username").val();
    var password = $("#password").val();
    var remenber = $("#remenber");
    $.post("Login",
        {
            "username": username,
            "password": password
        },
        function (data, status) {
            if (status == "success") {
                var result = JSON.parse(data);
                if (result.isSuccess) {
                    var exdate;
                    if (remenber.attr("checked")) {
                        exdate = 24 * 7;
                    } else {
                        exdate = 0.3;
                    }
                    setCookie("username", username, exdate);
                    setCookie("password", password, exdate);
                    window.location.href = "manageKey.jsp";
                } else {

                    $("#msg").html(result.msg);
                }
            }
        })
    return false;
}

function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setTime(exdate.getTime() + (expiredays * 1000 * 60 * 60))
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}