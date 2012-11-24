define([
	'app/view/scene',
	'app/model/entity/player'
], function (SceneView, PlayerEntityModel) {
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
			Crafty.sprite(27, 39, "images/sprites/FooSheet.png", {
				FooIdle: [0, 2]
			}, 1);

			this.Player = new PlayerEntityModel();
		}
	});
});