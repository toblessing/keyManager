package Servlet;

import Factory.FactoryDao;
import bean.PageCount;

import com.alibaba.fastjson.JSON;
import valuebean.ActivationCode;
import valuebean.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "ManageKeyServlet")
public class ManageKeyServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        if (action == null) {
            action = "select";
        }
        if (request.getSession().getAttribute("user") == null) {
            response.sendRedirect("index.jsp");
        }

        if (action.equals("select")) {
            select(request, response);
        } else if (action.equals("addKey")) {
            addKey(request, response);
        } else if (action.equals("renewalKey")) {
            renewalKey(request, response);
        }
    }

    private void renewalKey(HttpServletRequest request, HttpServletResponse response) {
        String code = request.getParameter("code");
        float day = Float.parseFloat(request.getParameter("exdate"));
        int number = Integer.parseInt(request.getParameter("number"));
        ActivationCode activationCode = new ActivationCode(code, number);

        if (number < 1 && day < 1) {
            request.setAttribute("msg", "请选择续期或者增加的数量！");
            try {
                request.getRequestDispatcher("renewalKey.jsp").forward(request, response);
            } catch (ServletException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            activationCode = FactoryDao.getActivationCodeDaoInstance().renewalCode(activationCode, day);
            if (activationCode != null) {
                request.setAttribute("activationCode", activationCode);
                request.setAttribute("msg", "续费成功！");
                try {
                    request.getRequestDispatcher("keyInfo.jsp").forward(request, response);
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (ServletException e) {
                    e.printStackTrace();
                }
            } else {
                request.setAttribute("msg", "续费失败！");
                try {
                    request.getRequestDispatcher("renewalKey.jsp").forward(request, response);
                } catch (ServletException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

    //添加激活码
    private void addKey(HttpServletRequest request, HttpServletResponse response) {
        float exdate = Float.parseFloat(request.getParameter("exdate").toString());
        int number = Integer.parseInt(request.getParameter("number").toString());
        String user = request.getParameter("username");
        String admin = ((User) request.getSession().getAttribute("user")).getUsername();
        if (number < 1) {
            request.setAttribute("msg", "请输入0以上的数量！");
            try {
                request.getRequestDispatcher("addKey.jsp").forward(request, response);
            } catch (ServletException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else if (user == null || user.equals("")) {
            request.setAttribute("msg", "请输入用户名称！");
            try {
                request.getRequestDispatcher("addKey.jsp").forward(request, response);
            } catch (ServletException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            //向数据库插入激活码数据
            ActivationCode activationCode = FactoryDao.getActivationCodeDaoInstance().addKey(exdate, number, user, admin);
            if (activationCode != null) {
                request.setAttribute("activationCode", activationCode);
                request.setAttribute("msg", "发放成功！");

                try {
                    request.getRequestDispatcher("keyInfo.jsp").forward(request, response);
                } catch (IOException e) {
                    e.printStackTrace();
                } catch (ServletException e) {
                    e.printStackTrace();
                }
            } else {
                request.setAttribute("msg", "发放失败");
                try {
                    request.getRequestDispatcher("addKey.jsp").forward(request, response);
                } catch (ServletException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

    private void select(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String pageNumberStr = request.getParameter("pageNumber");
        int pageNumber;
        if (pageNumberStr == null) {
            pageNumber = 1;
        } else {
            pageNumber = Integer.parseInt(pageNumberStr);
        }
        List list = FactoryDao.getActivationCodeDaoInstance().select();
        String listStr = JSON.toJSONString(list);
        response.getWriter().print(listStr);
//
//        if (list.size() > 0) {
//            PageCount pageCount = new PageCount(list, 10);
//            list = pageCount.getPageList(pageNumber);
//            request.setAttribute("keyList", list);
//            request.setAttribute("pageCount", pageCount.getPageCount());
//            request.setAttribute("pageNumber", pageNumber);
//
//        } else {
//            request.setAttribute("keyList", null);
//            request.setAttribute("pageCount", 1);
//            request.setAttribute("pageNumber", pageNumber);
//        }
//        try {
//            request.getRequestDispatcher("manageKey.jsp").forward(request, response);
//        } catch (ServletException e) {
//            e.printStackTrace();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);

    }
}
