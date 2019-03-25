package Servlet;

import Factory.FactoryDao;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "GetScriptServlet")
public class SetScriptServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        String file = request.getParameter("file");
        String content = request.getParameter("content");
//        content = Tools.getUTF(content);
        if (FactoryDao.getScriptDaoInstance().setScript(file, content)) {
            response.getWriter().print("true");
        } else {
            response.getWriter().print("false");
        }

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

}
