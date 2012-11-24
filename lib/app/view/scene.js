define([
	'backbone',
	'crafty'
], function (Backbone, Crafty) {
	return Backbone.View.extend({
		/**
		 * All assets that will be loaded before the scene is drawn,
		 */
		sceneAssets: [],
		Player: null, // Main Player instance
		initialize: function () {
			_.bindAll(this);

			// Component for controls
			Crafty.c("LeftControls", {
				init: function() {
					this.requires('Multiway');
				},
				leftControls: function(speed) {
					this.multiway(speed, {W: -90, S: 90, D: 0, A: 180})
					return this;
				}
			});

			// Apes can move around
			Crafty.c('Ape', {
				ape: function() {
					//setup animations
					this.requires("SpriteAnimation, Collision, Grid")
						.animate("walkUp", 0, 0, 1)
						.animate("walkDown", 2, 1, 3)
						.animate("walkLeft", 0, 1, 1)
						.animate("walkRight", 2, 0, 3)
						.animate("idle", 0, 2, 0);
					this.bind("NewDirection", function (direction) {
						if (direction.x < 0) {
							if (!this.isPlaying("walkLeft"))
								this.stop().animate("walkLeft", 20, -1);
						}
						if (direction.x > 0) {
							if (!this.isPlaying("walkRight"))
								this.stop().animate("walkRight", 20, -1);
						}
						if (direction.y < 0) {
							if (!this.isPlaying("walkUp"))
								this.stop().animate("walkUp", 20, -1);
						}
						if (direction.y > 0) {
							if (!this.isPlaying("walkDown"))
								this.stop().animate("walkDown", 20, -1);
						}
						if(!direction.x && !direction.y) {
							this.stop().animate("idle", 1, 1);
						}
					});
					return this;
				}
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
			Crafty.background("#000000");
			Crafty.e("2D, DOM, Text")
				.attr({x: 1, y: 1, h: 400, w: 960})
				.text("LOADING …")
				.css({
					"text-align": "center",
					"color": "#FFFFFF",
					"lineHeight": "400px"
				});

			// Load takes an array of assets and a callback when complete
			Crafty.load(this.sceneAssets, function () {
				// When everything is loaded, run the main scene
				Crafty.scene("main");
			});
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