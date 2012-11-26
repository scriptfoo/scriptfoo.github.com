define([
	'backbone',
	'text!template/widget/dialog/message.mustache'
], function (Backbone, Template) {
	return Backbone.View.extend({
		DialogMessagesCollection: null,
		/**
		 * Since messages are processed at a slow rate, we need to know when
		 * the queue is empty.
		 */
		isProcessing: false,
		// Mustache for a message
		'template.mustache': Template,
		// Compiled version
		'template': null,
		initialize: function (options) {
			_.bindAll(this);
			this.template = Hogan.compile(this['template.mustache']);

			this.DialogMessagesCollection = options.DialogMessagesCollection;

			this.DialogMessagesCollection.bind("add", this.messageAdded);
		},
		messageAdded: function (DialogMessage) {
			if (!this.isProcessing) {
				this.processMessages(); // Start processing
			}
		},
		processMessages: function () {
			this.isProcessing = true;

			if (this.DialogMessagesCollection.length > 0) {
				var nextMessage = this.DialogMessagesCollection.shift();
				this.processMessage(nextMessage);
			} else {
				// Hide the last message
				this.hide();
				this.isProcessing = false;
			}
		},
		processMessage: function (DialogMessage) {
			// Hide the current one first
			this.$el.hide('slow', _.bind(function () {
				// Update the HTML
				this.renderMessage(DialogMessage);
				// Show the new message
				this.show();

				// Process the next message in a bit
				setTimeout(this.processMessages, DialogMessage.get('duration'));
				if (DialogMessage.get('callback') !== null) {
					// Also call the callback when this message is done
					setTimeout(DialogMessage.get('callback'), DialogMessage.get('duration'));
				}
			}, this));
		},
		renderMessage: function (DialogMessage) {
			var speaker = DialogMessage.get('speaker');
			this.$el.html(this.template.render(DialogMessage.toJSON()));
			this.$('.image').css({
				background: "url('" + speaker.image + "') no-repeat -" + speaker.coord.x + "px -" + speaker.coord.y + "px",
				height: speaker.coord.h,
				width: speaker.coord.w
			});

			this.DialogMessagesCollection.remove(DialogMessage);
		},
		hide: function () {
			this.$el.hide('slow');
		},
		show: function () {
			this.$el.show('fast');
		}
	});
});