package Servlet;

import Factory.FactoryDao;
import valuebean.User;

import java.io.IOException;

public class LoginServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");


        User user = new User(username,password);

        if(FactoryDao.getUserDaoInstance().login(user)){
            request.getSession().setAttribute("user",user);
            response.sendRedirect("manageKey");
        }else{
            request.setAttribute("msg","用户名或者密码错误！");
            request.getRequestDispatcher("index.jsp").forward(request,response);

        }

    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        doPost(request,response);
    }
}
