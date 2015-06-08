package me.christine.chatserver;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.googlecode.objectify.annotation.Parent;
import com.googlecode.objectify.Key;

import java.lang.String;
import java.util.Date;
import java.util.List;

@Entity
public class Message {
	@Id public Long id;
	@Index public long senderId;
	@Index public long receiverId;
	public String text;
	public Date date;

	public Message() {
		this.date = new Date();
	}

	public Message(long senderId, long receiverId, String text) {
		this.senderId = senderId;
		this.receiverId = receiverId;
		this.text = text;
		this.date = new Date();
	}
}
