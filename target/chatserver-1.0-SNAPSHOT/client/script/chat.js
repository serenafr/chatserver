function init() {
	var me = new Contact(3, 'Christine');
	var conversationManager = new ConversationManager();
	var contactList = new ContactList();
	var chatPanel = new ChatPanel(me, conversationManager);
	contactList.setContactChangeCallback(function(contact) {
		chatPanel.show(contact);
	});
	chatPanel.setPanelCloseCallback(
		bind(contactList.onPanelClose, contactList));
	conversationManager.addMessageReceivedCallback(function(message) {
		contactList.messageReceived(message);
	});
	conversationManager.addMessageReceivedCallback(function(message) {
		chatPanel.receiveMessage(message);
	});
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/contactlist');
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var jsonList = JSON.parse(xhr.response);
			var contacts = jsonList['contacts'];
			var conversation = jsonList['conversation'];
			for (var i = 0; i < contacts.length; i++) {
				contact = new Contact(contacts[i]['id'], contacts[i]['name']);
				contactList.addContact(contact);
			}
			var senderAlice = contactList.getContactByName(conversation['sender']);
			var textOfAlice = conversation['text'];
			var timeOfAlicesmessage = conversation['time'];
			var messageOfAlice = new Message(senderAlice, textOfAlice, timeOfAlicesmessage);
			conversationManager.onMessageReceived(messageOfAlice);
		}
	}
	xhr.send();
}
