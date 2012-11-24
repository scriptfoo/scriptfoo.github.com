define([
	'app/view/scene',
	'app/model/entity/player',
	'app/model/entity/weed'
], function (SceneView, PlayerEntityModel, WeedsEntityModel) {
	return SceneView.extend({
		sceneAssets: [
			'images/sprites/GrassAreaSmall.png',
			'images/sprites/GrassAreaLarge.png',
			'images/sprites/GrassAreaTall.png',
			'images/sprites/FooSheet.png'
		],
		onSceneAssetsReady: function () {
			Crafty.background('#6D8063');

			Crafty.sprite(141, 45, "images/sprites/GrassAreaSmall.png", {GrassAreaSmall: [0, 0]});
			Crafty.sprite(222, 57, "images/sprites/GrassAreaLarge.png", {GrassAreaLarge: [0, 0]});
			Crafty.sprite(93, 42, "images/sprites/GrassAreaTall.png", {GrassAreaTall: [0, 0]});

			new WeedsEntityModel({
				type: 'WeedBright',
				x: 0,
				y: 100
			});

			this.Player = new PlayerEntityModel();
		}
	});
});