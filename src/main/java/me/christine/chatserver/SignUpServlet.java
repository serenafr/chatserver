package me.christine.chatserver;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

import com.googlecode.objectify.ObjectifyService;

import java.io.IOException;
import java.util.Properties;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.json.JSONArray;

public class SignUpServlet extends HttpServlet {
	public void doPost(HttpServletRequest req, HttpServletResponse resp) {
		ObjectifyService.register(SignUpInfo.class);
		ObjectifyService.register(User.class);
		SignUpInfo signUpInfo;
		String userName = req.getParameter("username");
		String password = req.getParameter("receiverId");
		String answer = req.getParameter("answer");
		int question = Integer.parseInt(req.getParameter("question"));
		signUpInfo = new SignUpInfo(userName, password, question, answer);
		ObjectifyService.ofy().save().entity(signUpInfo).now();
	}
}