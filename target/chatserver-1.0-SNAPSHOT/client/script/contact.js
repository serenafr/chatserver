function Contact(id, name) {
	this.id = id;
	this.name = name;
	var contentNode = document.createTextNode(name);
	this.element = document.createElement('div');
	this.element.appendChild(contentNode);
	this.element.className = 'contact';
	this.unreadMessage = false;
}

Contact.prototype.setSelected = function(selected) {
	this.element.className = selected ? 'contact selected' : 'contact';
}

Contact.prototype.getName = function() {
	return this.name;
}

Contact.prototype.getId = function() {
	return this.id;
}

Contact.prototype.containsUnreadMessage = function() {
	return this.unreadMessage;
}

Contact.prototype.setUnreadMessage = function(hasUnreadMessage) {
	this.unreadMessage = hasUnreadMessage;
	this.element.className = this.unreadMessage? 'contact new-message' : 'contact';
}