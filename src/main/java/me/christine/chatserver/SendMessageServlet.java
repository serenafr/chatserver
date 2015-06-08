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

public class SendMessageServlet extends HttpServlet {
	public void doPost(HttpServletRequest req, HttpServletResponse resp) {
		ObjectifyService.register(Message.class);
		Message message;
		long senderId = Long.parseLong(req.getParameter("senderId"));
		long receiverId = Long.parseLong(req.getParameter("receiverId"));
		String text = req.getParameter("text");
		message = new Message(senderId, receiverId, text);
		ObjectifyService.ofy().save().entity(message).now();
	}
}