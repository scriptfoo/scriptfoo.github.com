define([
	'crafty',
	'app/model/dialog/message',

	'app/component/announcer'
], function (Crafty, DialogMessageModel) {
	var component = Crafty.c('Speaker', {
		DialogMessagesCollection: null,
		init: function () {
			this.requires('Announcer');
		},
		speaker: function(DialogMessagesCollection) {
			// Store the collection for messages
			this.DialogMessagesCollection = DialogMessagesCollection;

			return this;
		},
		say: function (options, callback) {
			this.announceAction(this.Model.getName()+'.say()', 'method');

			if (typeof options == 'string' || options instanceof String) {
				options = {
					'text': options,
					'callback': callback || null
				};
			}

			options.speaker = {
				'coord': {
					x: this.__coord[0] || 0,
					y: this.__coord[1] || 0,
					w: this.__coord[2] || 0,
					h: this.__coord[3] || 0
				},
				'image': this.__image
			};

			this.DialogMessagesCollection.add(options);
		}
	});

	/**
	 * The return value isn't all that useful here. Crafty.c keeps track of all
	 * the components we defined so we never have to use the component variable.
	 * We simply define this module as a dependency when we need to be sure that
	 * the component has been added to Crafty.
	 */
	return {
		component: component
	};
});