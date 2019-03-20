package Servlet;

import Factory.FactoryDao;
import com.alibaba.fastjson.JSON;
import valuebean.Result;
import valuebean.User;

import java.io.IOException;

public class LoginServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        User user = new User(username, password);


        Result result = new Result();

        if (FactoryDao.getUserDaoInstance().login(user)) {
            request.getSession().setAttribute("user", user);

            result.setSuccess(true);
            result.setData(FactoryDao.getActivationCodeDaoInstance().select());
            response.getWriter().print(JSON.toJSONString(result));
        } else {
            result.setMsg("用户名或密码错误，请重试！");
            response.getWriter().print(JSON.toJSONString(result));
        }

    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        doPost(request, response);
    }


}
