function Conversation() {
	this.messages = [];
}

Conversation.prototype.getMessages = function() {
	return this.messages;
}

Conversation.prototype.addMessage = function(message) {
	this.messages.push(message);
}
