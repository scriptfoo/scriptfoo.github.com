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
			if (!this.isProcessing || DialogMessage.get('force') === true) {
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

				// Process the next message in a bit (unless this is sticky)
				if (DialogMessage.get('sticky') !== true) {
					setTimeout(_.bind(function () {
						var callback = _.once(this.processMessages);
						var dialogCallback = DialogMessage.get('callback') && _.once(DialogMessage.get('callback'));
						var keyDownCB = function (e) {
							if (e.keyCode == Crafty.keys['SPACE']) {
								Crafty.unbind('KeyDown', keyDownCB);
								callback();
								dialogCallback && dialogCallback();
							}
						};

						Crafty.bind('KeyDown', keyDownCB);

						return function () {
							Crafty.unbind('KeyDown', keyDownCB);
							callback();
							dialogCallback && dialogCallback();
						};
					}, this)(), DialogMessage.get('duration'));
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
		},
		hide: function () {
			this.$el.hide('slow');
		},
		show: function () {
			this.$el.show('fast');
		}
	});
});