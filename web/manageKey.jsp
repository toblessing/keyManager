<%@ page import="java.util.Date" %>
<%--
  Created by IntelliJ IDEA.
  User: ble
  Date: 2019/3/8
  Time: 23:05
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>AutoLook 激活码后台管理</title>
    <link rel="icon" type="image/x-icon" href="https://img.icons8.com/ios/50/000000/grades.png"/>
    <link type="text/css" href="css/basis.css?<%=new Date().getTime()%>" rel="stylesheet">
    <link type="text/css" href="css/popup.css?<%=new Date().getTime()%>" rel="stylesheet">
    <script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="js/popup.js"></script>
    <script type="text/javascript" src="js/basis.js"></script>
    <script type="text/javascript" src="js/manageKey.js"></script>

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

    <div class="table-div">
        <div id="tool">

            <a class="link_button" href="addKey.jsp">发放Key</a>
        </div>
        <div>
            <table id="codeTable" border="1" cellspacing="0">
                <tr>
                    <th id="thCodeText">激活码<img class="mic-ico" onclick="showSearchCode()"
                                                src="https://img.icons8.com/material/24/000000/search.png"></th>
                    <th id="thCodeInput" hidden><input class='input-underline search' placeholder='筛选激活码'
                                                       id='searchCode'
                                                       type="text">
                        <img class="mic-ico" onclick="hideSearchCode()"
                             src="https://img.icons8.com/small/16/000000/cancel.png"></th>
                    <th>到期时间</th>
                    <th id="thUserText">购买人<img class="mic-ico" onclick="showSearchUser()"
                                                src="https://img.icons8.com/material/24/000000/search.png"></th>
                    <th id="thUserInput" hidden><input class='input-underline search' placeholder='筛选用户名'
                                                       id='searchUser'
                                                       type="text">
                        <img class="mic-ico" onclick="hideSearchUser()"
                             src="https://img.icons8.com/small/16/000000/cancel.png"></th>
                    <th>发放人</th>
                    <th>剩余激活次数</th>
                    <th>已激活次数</th>
                    <th>操作</th>
                </tr>
                <%--<%--%>
                <%--ArrayList<ActivationCode> keyList = (ArrayList<ActivationCode>) request.getAttribute("keyList");--%>
                <%--if (keyList != null) {--%>
                <%--for (ActivationCode key : keyList--%>
                <%--) {--%>
                <%--%>--%>
                <%--<tr class="<%= key.isEnabled()?"":"disable"%>">--%>
                <%--<td><%=key.getActivationCode() %>--%>
                <%--</td>--%>
                <%--<td><%=key.getExdate() %>--%>
                <%--</td>--%>
                <%--<td><%=key.getUser() %>--%>
                <%--</td>--%>
                <%--<td><%=key.getAdmin() %>--%>
                <%--</td>--%>
                <%--<td><%=key.getAvailable() %>--%>
                <%--</td>--%>
                <%--<td><%=key.getUnavailable() %>--%>
                <%--</td>--%>
                <%--<td><a style="    font-size: 12px;padding: 3px 8px;" class="link_button"--%>
                <%--href="renewalKey.jsp?activationCode=<%=key.getActivationCode()%>">续费</a>--%>
                <%--</td>--%>

                <%--</tr>--%>

                <%--<% }--%>
                <%--} else {%>--%>
                <%--<tr>--%>
                <%--<td colspan="6">暂时没有任何内容</td>--%>
                <%--</tr>--%>

                <%--<% }%>--%>

            </table>
        </div>
        <div id="loading"><img src="image/loading.gif"></div>
        <div id="map">
            <%--<% int pageCount = (int) request.getAttribute("pageCount");--%>
            <%--int pageNumber = (int) request.getAttribute("pageNumber");--%>

            <%--int start = 1;--%>
            <%--int end = 1;--%>
            <%--if (pageCount - 5 >= 1) {--%>
            <%--start = pageCount - 5;--%>
            <%--} else {--%>
            <%--start = 1;--%>
            <%--}--%>
            <%--if (pageNumber + 5 <= pageCount) {--%>
            <%--end = pageNumber + 5;--%>
            <%--} else {--%>
            <%--end = pageCount;--%>
            <%--}--%>
            <%--if (end > start)--%>
            <%--for (int i = start; i <= end; i++) {--%>
            <%--if (i == pageNumber) {--%>
            <%--%>--%>
            <%--<a href="manageKey?pageNumber=<%=i %>"><b>&nbsp;<%=i %>--%>
            <%--</b>--%>
            <%--</a>--%>
            <%--<% } else {%>--%>
            <%--<a href="manageKey?pageNumber=<%=i %>">&nbsp;<%=i %>--%>
            <%--</a>--%>
            <%--<% }--%>
            <%--}%>--%>
        </div>
    </div>

</div>
</body>
</html>
