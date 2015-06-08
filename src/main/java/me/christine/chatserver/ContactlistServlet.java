package me.christine.chatserver;

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
        JSONArray userArray = new JSONArray().put(newUser1).put(newUser2);
        JSONObject messageReceived = new JSONObject().put("sender", "Alice").put("text", "Que'est-ce que tu manges cet apre-midi?").put("time", "2:20");
        JSONObject response = new JSONObject().put("contacts", userArray).put("conversation", messageReceived);
        resp.getWriter().print(response);
  }
}