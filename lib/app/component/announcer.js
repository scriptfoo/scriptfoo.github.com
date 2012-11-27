define([
	'crafty',
	'app/collection/action/messages',
	'app/model/action/message',
	'app/view/widget/action/messages'
], function (Crafty, ActionMessagesCollection, ActionMessageModel, ActionMessagesView) {
	var component = Crafty.c('Announcer', {
		ActionMessageModel: ActionMessageModel,
		ActionMessagesCollection: null,
		ActionMessagesView: null,
		ActionMessagesEntity: null, // The Crafty DOM Entity holding messages
		init: function () {
			// Initialize the collection
			this.ActionMessagesCollection = new ActionMessagesCollection();
			// Initialize the View
			this.ActionMessagesView = new ActionMessagesView({
				ActionMessagesCollection: this.ActionMessagesCollection
			});

			this.ActionMessagesEntity = Crafty.e('2D, DOM')
				.attr({
					z: 1000 // Place on top
				});

			this.y += 20;

			this.attach(this.ActionMessagesEntity);

			$('#'+this.ActionMessagesEntity.getDomId())
				.append(this.ActionMessagesView.$el);
		},
		announceAction: function (text, type) {
			type = type || 'positive'; // Simple default
			this.ActionMessagesCollection.add({
				type: type,
				text: text
			});
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