define([
	'app/collection/scene/entity',

	'app/model/entity/player',
	'app/model/entity/tree',
	'app/model/entity/grass',
	'app/model/entity/cottage',
	'app/model/entity/weed',
	'app/model/entity/chest',
	'app/model/entity/rune',
	'app/model/entity/flower',
	'app/model/entity/bush',
	'app/model/entity/friar',
	'app/model/entity/bear',
	'app/model/entity/bunny',
	'app/model/entity/villager1',
	'app/model/entity/villager2'
], function (
	SceneEntityCollection,

	PlayerEntityModel,
	TreeEntityModel,
	GrassEntityModel,
	CottageEntityModel,
	WeedEntityModel,
	ChestEntityModel,
	RuneEntityModel,
	FlowerEntityModel,
	BushEntityModel,
	FriarEntityModel,
	BearEntityModel,
	BunnyEntityModel,
	Villager1EntityModel,
	Villager2EntityModel
) {
	var entities = {
		"PlayerEntityModel": PlayerEntityModel,
		"TreeEntityModel": TreeEntityModel,
		"GrassEntityModel": GrassEntityModel,
		"CottageEntityModel": CottageEntityModel,
		"WeedEntityModel": WeedEntityModel,
		"ChestEntityModel": ChestEntityModel,
		"RuneEntityModel": RuneEntityModel,
		"FlowerEntityModel": FlowerEntityModel,
		"BushEntityModel": BushEntityModel,
		"FriarEntityModel": FriarEntityModel,
		"BearEntityModel": BearEntityModel,
		"BunnyEntityModel": BunnyEntityModel,
		"Villager1EntityModel": Villager1EntityModel,
		"Villager2EntityModel": Villager2EntityModel
	};

	// Our DefinitionLoader Constructor
	var DefinitionLoader = function (sceneDefinition) {
		this.sceneDefinition = sceneDefinition;
		this.sceneEntities = new SceneEntityCollection();
	};

	_.extend(DefinitionLoader.prototype, {
		load: function () {
			for (var sceneEntity in this.sceneDefinition) {
				var sceneSpritesAttrs = this.sceneDefinition[sceneEntity];

				for (var sceneSpritesAttr in sceneSpritesAttrs) {
					var attr = sceneSpritesAttrs[sceneSpritesAttr];
					this.sceneEntities.add(new entities[sceneEntity](attr));
				}
			}
		},
		unload: function () {
			console.log('unloading', this);
		}
	});

	return DefinitionLoader;
});