define([
	'app/view/scene',
	'app/model/entity/player',
], function (SceneView, PlayerEntityModel, GrassEntityModel) {
	return SceneView.extend({
		sceneAssets: [],
		onSceneAssetsReady: function () {
			Crafty.background('#6D8063');

			this.Player = new PlayerEntityModel();
		}
	});
});