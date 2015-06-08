package me.christine.chatserver;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.googlecode.objectify.annotation.Parent;
import com.googlecode.objectify.Key;

import java.lang.String;
import java.util.List;

@Entity
public class SignUpInfo {
	@Id public Long id;
	public String username;
	public String password;
	public int question;
	public String answer; 

	public SignUpInfo(String username, String password, int question, String answer) {
		this.username = username;
		this.password = password;
		this.question = question;
		this.answer = answer;
	}
}