<%@ page import="java.util.Date" %>

<%--
  Created by IntelliJ IDEA.
  User: ble
  Date: 2019/3/8
  Time: 17:18
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" pageEncoding="utf-8" %>
<html>
<head>
    <title>AutoLook 激活码后台管理</title>
    <link rel="icon" type="image/x-icon" href="https://img.icons8.com/ios/50/000000/grades.png"/>
    <link type="text/css" href="css/basis.css?<%=new Date().getTime()%>" rel="stylesheet">
    <script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="js/basis.js"></script>
    <script type="text/javascript" src="js/index.js"></script>
</head>
<body>
<div>
    <div id="header">
        <h1>AutoLook 激活码后台管理</h1>
    </div>
    <div>
        <div hidden id="loging"><img style="width: 50px;" src="image/loading.gif" alt="加载中"/>
            <p>登录中</p></div>

        <form id="loginForm" method="post" onsubmit="return loging()">
            <table style="margin-top: 5%;" cellspacing="20px">
                <tr>
                    <td>
                        <label for="username">用户名:</label>
                    </td>
                    <td>
                        <input required pattern="[A-z]+" id="username" name="username" type="text">
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="password">密码:</label>
                    </td>
                    <td>
                        <input required id="password" name="password" type="password"/>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align:center;">
                        <input type="checkbox" id="remenber">7天内自动登录
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align:center;">
                        <p id="msg" style="color: #f00;"></p>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align:center;">
                        <input id="sub" type="submit" name="login" value="登录"/>
                    </td>
                </tr>

            </table>
        </form>
    </div>
</div>
</body>
</html>
