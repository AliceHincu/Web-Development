package webubb.controller;

/**
 * Created by forest.
 */


import java.io.IOException;


import webubb.domain.TravelRoute;
import webubb.model.DBManager;
import webubb.domain.User;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.*;


public class LoginController extends HttpServlet {

    public LoginController() {
        super();
    }

    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response) throws ServletException, IOException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");
        RequestDispatcher rd = null;

        if (username.isEmpty()) {
            // username is wrong
            request.getSession().setAttribute("error", "Username must not be empty");
            rd = request.getRequestDispatcher("/error.jsp");
        }

        else if (password.isEmpty()) {
            // password is wrong
            request.getSession().setAttribute("error", "Password must not be empty");
            rd = request.getRequestDispatcher("/error.jsp");
        }

        else {
            DBManager dbmanager = new DBManager();
            User user = dbmanager.authenticate(username, password);
            if (user != null) {
                rd = request.getRequestDispatcher("/success.jsp");
                // Here is with cookies
                response.addCookie(new Cookie("userId", Integer.toString(user.getId())));
                response.addCookie(new Cookie("userName", user.getUsername()));

                // Here is with session:
                HttpSession session = request.getSession();
                session.setAttribute("user", user);

            } else {
                request.getSession().setAttribute("error", "Username or password invalid");
                rd = request.getRequestDispatcher("/error.jsp");
            }
        }

        rd.forward(request, response);
    }

}