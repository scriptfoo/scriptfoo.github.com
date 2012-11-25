define([
	'backbone',
	'crafty',
	'app/model/entity/loadingtext'
], function (Backbone, Crafty, LoadingTextEntityModel) {
	return Backbone.View.extend({
		/**
		 * All assets that will be loaded before the scene is drawn,
		 */
		sceneAssets: [],
		Player: null, // Main Player instance
		initialize: function () {
			_.bindAll(this);

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
			this.Player.disableControl();
			return this;
		},
		/**
		 * Alias to enable player controls
		 */
		enablePlayerControl: function () {
			this.Player.enableControl();
			return this;
		},
	});
});