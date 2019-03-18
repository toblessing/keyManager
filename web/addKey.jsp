<%--
  Created by IntelliJ IDEA.
  User: ble
  Date: 2019/3/10
  Time: 21:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page import="java.util.*" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>AutoLook 激活码后台管理</title>
    <link rel="icon" type="image/x-icon" href="https://img.icons8.com/ios/50/000000/grades.png" />
    <link type="text/css" href="css/manageKey.css?<%=new Date().getTime()%>" rel="stylesheet">

</head>
<body>
<%
    if (request.getSession().getAttribute("user") == null) {
        response.sendRedirect("index.jsp");
    }
%>


<div>
    <div id="header">
        <h1>AutoLook 激活码后台管理</h1>
    </div>
    <div style="text-align: center">
        <h1>激活码发放</h1>
    </div>

    <div class="table-div">
        <form action="manageKey?action=addKey" method="post">
            <table style="margin-left: auto;margin-right: auto;margin-top: 5%;" cellspacing="20px">
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
                    <td> 有效期:</td>
                    <td>
                        <select name="exdate">
                            <option value="0.021">30分钟</option>
                            <option selected value="1">1天</option>
                            <option value="15">15天</option>
                            <option value="30">30天</option>
                            <option value="90">90天</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>数量：</td>
                    <td>
                        <input min="1" name="number" value="1" type="number" required/>
                    </td>
                </tr>
                <tr>
                    <td>用户名：</td>
                    <td>
                        <input placeholder="用户名必须为字母" name="username" type="text" required pattern="[A-z]+"/>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align:center;">
                        <input class="link_button" type="button" onclick="javascript:history.go(-1);" value="返回"/>
                        <input id="sub" type="submit" value="发放"/>
                    </td>
                </tr>

            </table>
        </form>
    </div>

</div>
</body>
</html>
