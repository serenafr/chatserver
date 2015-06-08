function ContactList() {
	this.listElem = document.getElementById('contact-list');
	this.selectedContact = null;
	this.contactChangeCallback = null;
	this.contacts = [];
}

ContactList.prototype.addContact = function(contact) {
	this.listElem.appendChild(contact.element);
	this.contacts.push(contact);
	contact.element.addEventListener(
		'click',
		bind(function() {
			this.onClickContact(contact);
		}, this));
}

ContactList.prototype.onClickContact = function(currentContact) {
	if (this.selectedContact == currentContact) {
		return;
	}
	if (this.selectedContact) {
		this.selectedContact.setSelected(false);
	}
	currentContact.setSelected(true);
	this.selectedContact = currentContact;
	if (this.contactChangeCallback) {
		this.contactChangeCallback(currentContact);
	}
	if(currentContact.containsUnreadMessage()) {
		currentContact.setUnreadMessage(false);
	}
}

ContactList.prototype.setContactChangeCallback = function(callback) {
	this.contactChangeCallback = callback;
}

ContactList.prototype.onPanelClose = function() {
	if (this.selectedContact) {
		this.selectedContact.setSelected(false);
		this.selectedContact = null;
	}
}

ContactList.prototype.getContactById = function(id) {
	for (var i = 0; i < this.contacts.length; i++) {
		if (id == this.contacts[i].getId()) {
			return this.contacts[i];
		}
	}
}

ContactList.prototype.getContactByName = function(name) {
	for (var i = 0; i < this.contacts.length; i++) {
		if (name == this.contacts[i].getName()) {
			return this.contacts[i];
		}
	}
}

ContactList.prototype.messageReceived = function(message) {
	var sender = message.getSender();
	if (this.selectedContact != sender) {
		this.getContactById(sender.getId()).setUnreadMessage(true);
	}
}