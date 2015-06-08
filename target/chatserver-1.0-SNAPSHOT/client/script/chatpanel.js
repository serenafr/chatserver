function ChatPanel(me, conversationManager) {
	this.me = me;
	this.contact = null;
	this.conversationManager = conversationManager;
	this.panel = document.getElementById('chat-panel');
	this.header = document.getElementById('chat-header');
	var closeButton = document.getElementById('close-button');
	closeButton.addEventListener(
		'click', 
		bind(this.onCloseClick, this));
	this.panelCloseCallBack = null;
	this.inputBox = document.getElementById('chat-input-box');
	this.chatHistory = document.getElementById('chat-history');
	var sendButton = document.getElementById('send-button');
	sendButton.addEventListener(
		'click',
		bind(this.onSendClick, this));
	this.inputBox.addEventListener(
		'keyup',
		bind(this.onEnterUp, this));
}

ChatPanel.prototype.show = function(contact) {
	this.panel.style.display = '';
	this.contact = contact;
	var chatName = document.getElementById('chat-name');
	var text = document.createTextNode(contact.getName());
	if (chatName.firstChild) {
		chatName.removeChild(chatName.firstChild);
	}
	chatName.appendChild(text);
	this.loadConversation(contact);
	this.inputBox.focus();
}

ChatPanel.prototype.onCloseClick = function() {
	this.panel.style.display = 'none';
	this.panelCloseCallBack();
}

ChatPanel.prototype.setPanelCloseCallback = function(callback) {
	this.panelCloseCallBack = callback;
}

ChatPanel.prototype.getInputText = function() {
	return this.inputBox.value;
}

ChatPanel.prototype.onSendClick = function() {
	var text = this.getInputText();
	if (text) {	
		var sender = this.me;
		var time = new Date();
		var message = new Message(sender, text, time);
		var conversation = this.conversationManager.getConversation(this.contact.getId());
		var element = this.appendMessage(message);
		this.addMessageToConversation(message, conversation);
		this.conversationManager.sendMassageToServer(message, bind(function() {
			this.sendSuccess(element);
		}, this));
	}
	this.inputBox.value = '';
	this.inputBox.focus();
}

ChatPanel.prototype.appendMessage = function(message) {
	var chatContentNode = document.createTextNode(message.text);
	var element = document.createElement('div');
	element.appendChild(chatContentNode);
	if(message.getSender() == this.me) {
		element.className = 'message-me';
	} else {
		element.className = 'message-received';
	}
	this.chatHistory.appendChild(element);
	return element;
}

ChatPanel.prototype.onEnterUp = function(event) {
	if (event.keyCode == 13) {
		this.onSendClick();
	}
}

ChatPanel.prototype.clearConversation = function() {
	while (this.chatHistory.lastChild) {
		this.chatHistory.removeChild(this.chatHistory.lastChild);
	}
}

ChatPanel.prototype.loadConversation = function(contact) {	
	this.clearConversation();
	var conversation = this.conversationManager.getConversation(contact.getId());
	var messages = conversation.getMessages();
	for (var i = 0; i < messages.length; i++) {
		this.appendMessage(messages[i]);
	}
}

ChatPanel.prototype.addMessageToConversation = function(message, conversation) {
	conversation.addMessage(message);
}

ChatPanel.prototype.receiveMessage = function(message) {
	var sender = message.getSender();
	if (sender == this.contact) {
		this.appendMessage(message);		
	}
}

ChatPanel.prototype.sendSuccess = function(element) {
	element.style.color = 'red';
}
