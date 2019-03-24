package Servlet;

import Factory.FactoryDao;
import valuebean.ActivationCode;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

@WebServlet(name = "GetScriptServlet")
public class GetScriptServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String file = request.getParameter("file");
        String code = request.getParameter("code");
        String filePath = this.getServletContext().getRealPath("/") + "script/";
        response.setCharacterEncoding("gb2312");    //设置响应内容编码
        if (file.equals("bios.js") || file.equals("module.js") || file.equals("autoRun.js") || file.equals("testView.js")) {
            printFile(request, response, file);
        } else {
            ActivationCode activationCode = FactoryDao.getActivationCodeDaoInstance().checkCode(code);
            if (activationCode != null) {
                printFile(request, response, file);
            } else {
                response.getWriter().print("codeExdate");
            }
        }

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }

    private void printFile(HttpServletRequest request, HttpServletResponse response, String file) throws IOException {
        String filePath = this.getServletContext().getRealPath("/") + "/WEB-INF/script/";
        File fileobj = new File(filePath + file);
        if (fileobj.exists()) {
            FileReader reader = new FileReader(fileobj);    //获得输入流
            BufferedReader bufferReader = new BufferedReader(reader); //使用缓冲流
            String line = null;     //每行数据
            while ((line = bufferReader.readLine()) != null) {    //循环读取
                response.getWriter().print(line + "\n");     //输出文件内容
            }
        } else {
            response.getWriter().print("文件不存在！");
        }
    }
}
