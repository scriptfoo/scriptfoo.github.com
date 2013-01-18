define([
	'app/app',
	'app/view/scene',
	'app/model/entity/player',
	'app/model/entity/tree',
	'app/model/entity/grass',
	'app/model/entity/cottage',
	'app/model/entity/weed',
	'app/model/entity/chest',
	'app/model/entity/flower',
	'app/model/entity/bush',
	'app/model/entity/bunny',
	'app/model/entity/villager1',
	'app/model/action/move',
	'app/model/action/speak',
	'app/model/action/wait',
	'app/model/action/bindspell',
	'app/model/action/playercontrols',
	'app/model/action/test',
	'app/model/tester',
	'app/collection/scene/entity',
	'app/collection/scene/action',
	'app/definition/scene/maze/1',

	'app/component/info'
], function (
	App,
	SceneView,
	PlayerEntityModel,
	TreeEntityModel,
	GrassEntityModel,
	CottageEntityModel,
	WeedEntityModel,
	ChestEntityModel,
	FlowerEntityModel,
	BushEntityModel,
	BunnyEntityModel,
	Villager1EntityModel,
	MoveActionModel,
	SpeakActionModel,
	WaitActionModel,
	BindSpellActionModel,
	PlayerControlsActionModel,
	TestActionModel,
	TesterModel,
	SceneEntityCollection,
	SceneActionCollection,
	SceneMazeDefinition1
) {
	var entities = {
		"PlayerEntityModel": PlayerEntityModel,
		"TreeEntityModel": TreeEntityModel,
		"GrassEntityModel": GrassEntityModel,
		"CottageEntityModel": CottageEntityModel,
		"WeedEntityModel": WeedEntityModel,
		"ChestEntityModel": ChestEntityModel,
		"FlowerEntityModel": FlowerEntityModel,
		"BushEntityModel": BushEntityModel,
		"BunnyEntityModel": BunnyEntityModel,
		"Villager1EntityModel": Villager1EntityModel
	}

	return SceneView.extend({
		sceneAssets: [],
		EditorSpellScriptModel: null,
		TesterModel: null,
		onSceneAssetsReady: function () {
			this.EditorSpellScriptModel = this.options.EditorSpellScriptModel;
			this.TesterModel = new TesterModel();

			this.$el.addClass('night');

			this.Player = new PlayerEntityModel({
				x: 380,
				y: 130
			});

			//Crafty.viewport.follow(this.Player.get('entity'), -60, 0);
			this.sceneEntities = new SceneEntityCollection(); 
			this.addSceneEntities();

			// Expose the player model
			App.exposed.Foo = this.Player;

			/*
			Crafty.audio.add("Music", [
				"sounds/Music.mp3",
				"sounds/Music.ogg"
			]);
			Crafty.audio.play("Music", -1);
			*/
		},
		addSceneEntities: function () {

			for (var sceneEntity in SceneMazeDefinition1) {
				var sceneSpritesAttrs = SceneMazeDefinition1[sceneEntity];

				for (var sceneSpritesAttr in sceneSpritesAttrs) {
					var attr = sceneSpritesAttrs[sceneSpritesAttr];
					new entities[sceneEntity](attr);
				}
			}
		}
	});
});