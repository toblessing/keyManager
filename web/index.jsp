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
    <link rel="icon" type="image/x-icon" href="https://img.icons8.com/ios/50/000000/grades.png" />
    <link type="text/css" href="css/basis.css?<%=new Date().getTime()%>" rel="stylesheet">
    <script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="js/basis.js"></script>
</head>
<body>
<div>
    <div id="header">
        <h1>AutoLook 激活码后台管理</h1>
    </div>
    <form action="Login" method="post">
        <table style="margin-top: 5%;" cellspacing="20px">
            <tr>
                <td colspan="2">
                    <label for="username">用户名:</label>
                    <input required pattern="[A-z]+" id="username" name="username" type="text">
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <label for="password">密码:</label>
                    <input required id="password" name="password" type="password"/>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="text-align:center;">
                    <p style="color: #f00;"><%
                        if (request.getAttribute("msg") != null) {
                            out.print(request.getAttribute("msg"));
                        }
                    %></p>
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
</body>
</html>
