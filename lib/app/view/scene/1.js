define([
	'app/view/scene',
	'app/model/entity/player',
], function (SceneView, PlayerEntityModel) {
	return SceneView.extend({
		sceneAssets: [],
		onSceneAssetsReady: function () {
			this.$el.addClass('day');

			this.Player = new PlayerEntityModel();
		}
	});
});