package me.christine.contactlist;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

import java.io.IOException;
import java.util.Properties;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.json.JSONArray;

public class ContactlistServlet extends HttpServlet {
  @Override
  public void doGet(HttpServletRequest req, HttpServletResponse resp)
      throws IOException {
        resp.setContentType("application/json");
        JSONObject newUser1 = new JSONObject().put("id", "1").put("name", "Alice");
        JSONObject newUser2 = new JSONObject().put("id", "2").put("name", "Bob");
        JSONArray array = new JSONArray().put(newUser1).put(newUser2);
        JSONObject contactlist = new JSONObject().put("Contacts", array);
        resp.getWriter().println(contactlist);
    /*if (req.getParameter("testing") == null) {
      resp.setContentType("text/plain");
      resp.getWriter().println("Hello, this is a testing servlet. \n\n");
      Properties p = System.getProperties();
      p.list(resp.getWriter());

    } else {
      UserService userService = UserServiceFactory.getUserService();
      User currentUser = userService.getCurrentUser();

      if (currentUser != null) {
        resp.setContentType("text/plain");
        resp.getWriter().println("Hello, " + currentUser.getNickname());
      } else {
        resp.sendRedirect(userService.createLoginURL(req.getRequestURI()));
      }
    }*/
  }
}