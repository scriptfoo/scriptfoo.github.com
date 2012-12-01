define([
	'backbone',
	'text!template/widget/action/message.mustache'
], function (Backbone, Template) {
	return Backbone.View.extend({
		messageThrottle: 400, // Milliseconds pause between messages
		/**
		 * Since messages are processed at a slow rate, we need to know when
		 * the queue is empty.
		 */
		isProcessing: false,
		attributes: {
			class: 'widget-action-messages'
		},
		ActionMessagesCollection: null,
		// Mustache for a message
		'template.mustache': Template,
		// Compiled version
		'template': null,
		initialize: function (options) {
			_.bindAll(this);
			this.template = Hogan.compile(this['template.mustache']);

			this.ActionMessagesCollection = options.ActionMessagesCollection;

			this.ActionMessagesCollection.bind("add", this.messageAdded);
		},
		messageAdded: function (ActionMessage) {
			if (!this.isProcessing) {
				this.processMessages(); // Start processing
			}
		},
		processMessages: function () {
			this.isProcessing = true;

			if (this.ActionMessagesCollection.length > 0) {
				var nextMessage = this.ActionMessagesCollection.shift();
				this.renderMessage(nextMessage);
				setTimeout(this.processMessages, this.messageThrottle);
			} else {
				this.isProcessing = false;
			}
		},
		renderMessage: function (ActionMessage) {
			// Nothing much to it! CSS handles all the crazy stuff!
			this.$el.append(this.template.render(ActionMessage.toJSON()));
		}
	});
});