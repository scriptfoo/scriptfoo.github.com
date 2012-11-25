define([
	'backbone',
	'crafty',
	'app/model/entity/loadingtext',
	'app/collection/dialog/messages',
	'app/view/widget/dialog'
], function (Backbone, Crafty, LoadingTextEntityModel, DialogMessagesCollection, DialogWidgetView) {
	return Backbone.View.extend({
		/**
		 * All assets that will be loaded before the scene is drawn,
		 */
		sceneAssets: [],
		Player: null, // Main Player instance
		DialogWidgetView: null,
		initialize: function () {
			_.bindAll(this);

			// We use a sub-view to handle dialog logic
			this.DialogWidgetView = new DialogWidgetView({
				el: $('.widget-game-dialog'), // We tell it exactly what to use
				DialogMessagesCollection: new DialogMessagesCollection()
			});

			this.DialogWidgetView.DialogMessagesCollection.add({
				text: "Hello! This message is going to appear for 3 seconds!",
				duration: 3000
			});

			this.DialogWidgetView.DialogMessagesCollection.add({
				text: "Hello again! This one is going to stay a bit longer… 10 seconds!",
				duration: 10000
			});

			this.DialogWidgetView.DialogMessagesCollection.add({
				text: "Bye! This is quick! 1 second!",
				duration: 1000
			});

			this.DialogWidgetView.DialogMessagesCollection.add({
				text: "I'm back! This message duration is automatically calculated!"
			});

			this.DialogWidgetView.DialogMessagesCollection.add({
				text: "Bye again!"
			});

			this.loadScene();
		},
		/**
		 * Starts the chain of loading scene -> main scene
		 */
		loadScene: function () {
			Crafty.scene("loading", this.loadingSceneCB);
			Crafty.scene("main", this.mainSceneCB);

			// Start the loading scene
			Crafty.scene("loading");
		},
		initializeSceneObjects: function () {},
		/**
		 * This scene prepares all the needed assets before calling mainSceneCB
		 */
		loadingSceneCB: function () {
			// Black background with some loading text
			var loadingText = new LoadingTextEntityModel();

			// Load takes an array of assets and a callback when complete
			if (this.sceneAssets.length) {
				Crafty.load(this.sceneAssets, function () {
					// When everything is loaded, run the main scene
					setTimeout(function () {
						Crafty.scene("main");
					}, 1000);
				});
			} else {
				setTimeout(function () {
					Crafty.scene("main");
				}, 1000);
			}
		},
		/**
		 * Callback used when the loading screen has finished loading all needed
		 * assets.
		 */
		mainSceneCB: function () {
			this.onSceneAssetsReady();
		},
		/**
		 * The specific scene implements this
		 */
		onSceneAssetsReady: function () {},
		/**
		 * Alias to disable player controls
		 */
		disablePlayerControl: function () {
			this.Player.get('entity').disableControl();
			return this;
		},
		/**
		 * Alias to enable player controls
		 */
		enablePlayerControl: function () {
			this.Player.get('entity').enableControl();
			return this;
		}
	});
});