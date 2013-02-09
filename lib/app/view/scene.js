define([
	'backbone',
	'crafty',

	'app/definition/loader',

	'app/model/entity/loadingtext',
	'app/collection/dialog/messages',
	'app/view/widget/dialog',
	// Need this component loaded so I can inject the collection into it
	'app/component/speaker'
], function (
	Backbone,
	Crafty,

	DefinitionLoader,

	LoadingTextEntityModel,
	DialogMessagesCollection,
	DialogWidgetView
) {
	return Backbone.View.extend({
		/**
		 * All assets that will be loaded before the scene is drawn,
		 */
		sceneAssets: [],
		sceneDefinition: {},
		sceneLoader: null,
		sceneName: null,
		Player: null, // Main Player instance
		DialogWidgetView: null,
		DialogMessagesCollection: new DialogMessagesCollection(),
		_dayStates: ['day', 'dayFoggy', 'evening', 'night'],
		initialize: function () {
			_.bindAll(this);

			// We use a sub-view to handle dialog logic
			this.DialogWidgetView = new DialogWidgetView({
				el: $('.widget-game-dialog'), // We tell it exactly what to use
				DialogMessagesCollection: this.DialogMessagesCollection
			});

			// Send the DialogMessagesCollection to the SpeakerComponent so it can use it easily
			Crafty.components()['Speaker'].DialogMessagesCollection = this.DialogMessagesCollection;

			Crafty.scene(this.sceneName, this._onSceneLoad, this._onSceneUnload);
		},
		/**
		 * Starts the chain of loading scene -> main scene
		 */
		loadScene: function () {
			Crafty.scene(this.sceneName);
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
		_onSceneLoad: function () {
			this.sceneLoader = new DefinitionLoader(this.sceneDefinition);
			this.sceneLoader.load();
			this._sceneDayStatesAlternator();

			this.onSceneAssetsReady();
		},
		_onSceneUnload: function () {
			this.sceneLoader.sceneEntities.reset();
		},
		_sceneDayStatesAlternator: function () {
			var toggleNextClass;
			var dayStates = this._dayStates;
			var $el = this.$el;

			toggleNextClass = function () {
				var nextClass = dayStates.shift();
				dayStates.push(nextClass); // Put it back at the end of queue

				$('.day-state', $el).removeClass('day-state-active');
				$('.day-state.' + nextClass, $el).addClass('day-state-active');
				$el.removeClass().addClass(nextClass);
			};

			$el.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', toggleNextClass);
			toggleNextClass(); // Call it the first time
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