package Servlet;

import Factory.FactoryDao;
import valuebean.ActivationCode;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "GetScriptServlet")
public class GetScriptServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String file = request.getParameter("file");
        String code = request.getParameter("code");
        String result = null;
        response.setHeader("Content-type", "text/text;charset=UTF-8");
        response.setCharacterEncoding("utf-8");    //设置响应内容编码
        if (file.equals("bios.js") || file.equals("module.js") || file.equals("autoRun.js") || file.equals("testView.js")) {
            result = FactoryDao.getScriptDaoInstance().getScript(file);
        } else {
            ActivationCode activationCode = FactoryDao.getActivationCodeDaoInstance().checkCode(code);
            if (activationCode != null) {
                result = FactoryDao.getScriptDaoInstance().getScript(file);
            } else {
                response.getWriter().print("codeExdate");
            }
        }

        if (request != null) {
            response.getWriter().print(result);
        } else {
            response.getWriter().print("false");
        }

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

}
