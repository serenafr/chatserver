package me.christine.chatserver;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

import org.json.JSONObject;

@Entity
public class User {
	@Id public long id;
	public String name;

	public User(String name) {
		this.name = name;
	}

	public User(long id, String name) {
		this.id = id;
		this.name = name;
	}

	public long getUserId() {
		return this.id;
	}

	public JSONObject toJsonObject() {
		return new JSONObject().put("id", this.id + "").put("name", this.name);
	}
}