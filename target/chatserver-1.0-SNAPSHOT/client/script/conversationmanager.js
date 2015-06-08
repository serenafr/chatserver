function ConversationManager() {
	this.contactConversationMap = {};
	this.messageReceivedCallbacks = [];
}

ConversationManager.prototype.getConversation = function(contactId) {
	if (!(contactId in this.contactConversationMap)) {
		conversation = new Conversation();
		this.contactConversationMap[contactId] = conversation;
	}
	return this.contactConversationMap[contactId];
}

ConversationManager.prototype.onMessageReceived = function(message) {
	var sender = message.getSender();
	var conversation = this.getConversation(sender.getId());
	conversation.addMessage(message);
	for (var i = 0; i < this.messageReceivedCallbacks.length; i++) {
		this.messageReceivedCallbacks[i](message);
	}
}

ConversationManager.prototype.addMessageReceivedCallback = function(callback) {
	this.messageReceivedCallbacks.push(callback);
}

ConversationManager.prototype.sendMassageToServer = function(message, callback) {
	var xhr = new XMLHttpRequest();
	var params = 'senderId=' + message.getSender().getId() + '&' +
		'receiverId=' + 1 + '&' +
		'text=' + message.getSentText();
	xhr.open('POST', '/sendmessage');
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			callback();
		}
	}
	xhr.send(params);
}
