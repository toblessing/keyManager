<%--
  Created by IntelliJ IDEA.
  User: ble
  Date: 2019/3/10
  Time: 21:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page import="java.util.*" %>
<%@ page import="valuebean.ActivationCode" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
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
        <h1>激活码详情</h1>
    </div>

    <div class="table-div">
        <% ActivationCode activationCode = (ActivationCode) request.getAttribute("activationCode"); %>
        <table style="margin-top: 5%;" cellspacing="20px">
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
                <td>激活码:</td>
                <td><%=activationCode.getCode() %></td>
            </tr>
            <tr>
                <td>到期时间:</td>
                <td><%=activationCode.getExdate() %></td>
            </tr>
            <tr>
                <td>购买人:</td>
                <td><%=activationCode.getUser() %></td>
            </tr>
            <tr>
                <td>发放人:</td>
                <td><%=activationCode.getAdmin() %></td>
            </tr>
            <tr>
                <td>剩余激活次数:</td>
                <td><%=activationCode.getAvailable() %></td>
            </tr>
            <tr>
                <td>已激活次数:</td>
                <td><%=activationCode.getUnavailable() %></td>
            </tr>

            <tr>
                <td colspan="2" style="text-align:center;">
                    <a class="link_button" href="javascript:history.go(-1);">返回</a>
                    <a class="link_button" href="manageKey">主页</a>
                </td>
            </tr>

        </table>

    </div>

</div>
</body>
</html>
