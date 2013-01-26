define([
	'app/app',
	'app/module/state/model',
	'app/module/state/view',
	'app/view/scene',
	'app/view/widget/inventory',
	'app/view/widget/item/belt',
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
	'app/model/entity/villager2',
	'app/model/quest',
	'app/model/action/move',
	'app/model/action/speak',
	'app/model/action/wait',
	'app/model/action/bindspell',
	'app/model/action/playercontrols',
	'app/model/action/test',
	'app/model/test/001',
	'app/model/test/002',
	'app/model/test/003',
	'app/model/test/004',
	'app/model/tester',
	'app/collection/scene/entity',
	'app/collection/scene/action',
	'app/collection/scene/quest',
	'app/definition/scene/1',

	'app/model/item/rune',


	'app/component/info'
], function (
	App,
	StateModuleModel,
	StateModuleView,
	SceneView,
	InventoryWidget,
	ItemBeltWidget,
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
	Villager2EntityModel,
	QuestModel,
	MoveActionModel,
	SpeakActionModel,
	WaitActionModel,
	BindSpellActionModel,
	PlayerControlsActionModel,
	TestActionModel,
	Test001Model,
	Test002Model,
	Test003Model,
	Test004Model,
	TesterModel,
	SceneEntityCollection,
	SceneActionCollection,
	SceneQuestCollection,
	Scene1Definition,
	RuneItemModel
) {
	var entities = {
		"App": App,
		"StateModuleModel": StateModuleModel,
		"StateModuleView": StateModuleView,
		"SceneView": SceneView,
		"InventoryWidget": InventoryWidget,
		"ItemBeltWidget": ItemBeltWidget,
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
		"Villager2EntityModel": Villager2EntityModel,
		"QuestModel": QuestModel,
		"MoveActionModel": MoveActionModel,
		"SpeakActionModel": SpeakActionModel,
		"WaitActionModel": WaitActionModel,
		"BindSpellActionModel": BindSpellActionModel,
		"PlayerControlsActionModel": PlayerControlsActionModel,
		"TestActionModel": TestActionModel,
		"Test001Model": Test001Model,
		"Test002Model": Test002Model,
		"Test003Model": Test003Model,
		"Test004Model": Test004Model,
		"TesterModel": TesterModel,
		"SceneEntityCollection": SceneEntityCollection,
		"SceneActionCollection": SceneActionCollection,
		"SceneQuestCollection": SceneQuestCollection,
		"Scene1Definition": Scene1Definition,
		"RuneItemModel": RuneItemModel
	};

	return SceneView.extend({
		sceneAssets: [],
		EditorSpellScriptModel: null,
		TesterModel: null,
		onSceneAssetsReady: function () {
			// This is the gold rune that allows for the first editor
			var goldRune = new RuneItemModel({
				type: 'gold'
			});

			this.EditorSpellScriptModel = this.options.EditorSpellScriptModel;
			this.TesterModel = new TesterModel();

			this.$el.addClass('day');

			this.Player = new PlayerEntityModel({
				x: 380,
				y: 130
			});

			// Puts the gold rune in your backpack
			this.Player.addToPack(goldRune, 0);
			// Puts the gold rune in position 0 of the shortcut belt
			this.Player.addToRuneBelt(goldRune, 0);

			// Set up the state module to toggle the inventory
			this.inventoryStateModel = new StateModuleModel();
			this.inventoryStateView = new StateModuleView({
				stateModel: this.inventoryStateModel,
				el: $('.l-toolbar-inventory')
			});

			// Render the view in charge of the inventory
			this.inventoryWidget = new InventoryWidget({
				itemSlotsCollection: this.Player.pack,
				stateModel: this.inventoryStateModel
			});

			// Render the view in charge of the rune belt
			this.runeBeltWidget = new ItemBeltWidget({
				itemSlotsCollection: this.Player.runeBelt
			});

			//Crafty.viewport.follow(this.Player.get('entity'), -60, 0);
			this.sceneEntities = new SceneEntityCollection(); 
			this.addSceneEntities();

			// Expose the player model
			App.exposed.Foo = this.Player;

			Crafty.audio.add("Music", [
				"sounds/Music.mp3",
				"sounds/Music.ogg"
			]);
			//Crafty.audio.play("Music", -1);

			// Add the quests to the scene and run the first
			this.addSceneQuests();
			this.sceneQuestCollection.shift().startActions();
		},
		addSceneQuests: function () {

			// Hold this scene's quests	
			this.sceneQuestCollection = new SceneQuestCollection();

			// Intro
			var actions = new SceneActionCollection([
				new PlayerControlsActionModel({
					entity: this.Player,
					controlsState: false
				}),
				new MoveActionModel({
					entity: this.sceneEntities.get('Friar Barlow'), 
					params: {x: 620, y: 132} 
				}),
				new WaitActionModel({
					params: 200
				}),
				new SpeakActionModel({
					entity: this.sceneEntities.get('Friar Barlow'),
					params: 'Yes, that must be him. I can tell by his mighty fork wand.',
					wait: true
				}),
				new MoveActionModel({
					entity: this.sceneEntities.get('Friar Barlow'), 
					params: {x: 420, y: 130} 
				}),
				new SpeakActionModel({
					entity: this.sceneEntities.get('Friar Barlow'),
					params: ['You must be Foo!']
				}),
				new SpeakActionModel({
					entity: this.Player,
					params: ['I am. And you are?']
				}),
				new SpeakActionModel({
					entity: this.sceneEntities.get('Friar Barlow'),
					params: [
						'I\'m Friar Barlow. Welcome to our lovely universe. :)',
						'Beyond the great characters and lovely vistas, there\'s an interesting magic to the place.',
						'I could tell you more, but I think it\'s best you find out for yourself.',
						'You\'re probably wondering how to move around, huh?<br/><br/>For that, use the "w", "a", "s" and "d" keys.',
						'When you get close to a person or creature, use the "e" key to enguage with them.'
					]
				}),
				new SpeakActionModel({
					entity: this.sceneEntities.get('Friar Barlow'),
					params: 'Good luck on your journey!',
					wait: true
				}),
				new PlayerControlsActionModel({
					entity: this.Player,
					controlsState: true
				}),
				new MoveActionModel({
					entity: this.sceneEntities.get('Friar Barlow'), 
					params: {x: 530, y: 318},
				})
			]);

			this.sceneQuestCollection.push({
				id: 0,
				name: 'intro',
				actions: actions
			});

			// Lessons 01 
			actions = new SceneActionCollection([
				new PlayerControlsActionModel({
					entity: this.Player,
					controlsState: false
				}),
				new SpeakActionModel({
					entity: this.sceneEntities.get('Friar Carleton'),
					params: ['Hello Foo.']
				}),
				new SpeakActionModel({
					entity: this.Player,
					params: ['Wait, how does everyone know my name?']
				}),

				new SpeakActionModel({
					entity: this.sceneEntities.get('Friar Carleton'),
					params: 'Right. Anyway, I have a few things to tell you about the basics of our magic.',
					wait: true
				}),
				new TestActionModel({
					TestModel: new Test001Model({
						SpeakerModel: this.sceneEntities.get('Friar Carleton'),
						SpellScriptModel: this.EditorSpellScriptModel,
						TesterModel: this.TesterModel
					})
				}),
				new TestActionModel({
					TestModel: new Test002Model({
						SpeakerModel: this.sceneEntities.get('Friar Carleton'),
						SpellScriptModel: this.EditorSpellScriptModel,
						TesterModel: this.TesterModel
					})
				}),
				new PlayerControlsActionModel({
					entity: this.Player,
					controlsState: true 
				})
			]);

			this.sceneQuestCollection.push({
				id: 1,
				name: 'lessons01',
				actions: actions
			});

			// Lessons 02 
			actions = new SceneActionCollection([
				new PlayerControlsActionModel({
					entity: this.Player,
					controlsState: false
				}),
				new SpeakActionModel({
					entity: this.sceneEntities.get('Friar Gordon'),
					params: ['Who are you?']
				}),
				new SpeakActionModel({
					entity: this.Player,
					params: ['Finally, someone who doesn\'t know my name!']
				}),

				new SpeakActionModel({
					entity: this.sceneEntities.get('Friar Gordon'),
					params: 'Just kidding, Foo! So, ready for more knowledge?',
					wait: true
				}),
				new TestActionModel({
					TestModel: new Test003Model({
						SpeakerModel: this.sceneEntities.get('Friar Gordon'),
						SpellScriptModel: this.EditorSpellScriptModel,
						TesterModel: this.TesterModel
					})
				}),
				new TestActionModel({
					TestModel: new Test004Model({
						SpeakerModel: this.sceneEntities.get('Friar Gordon'),
						SpellScriptModel: this.EditorSpellScriptModel,
						TesterModel: this.TesterModel
					})
				}),
				new PlayerControlsActionModel({
					entity: this.Player,
					controlsState: true 
				})
			]);

			this.sceneQuestCollection.push({
				id: 2,
				name: 'lessons02',
				actions: actions
			});

			// Set entity's interact function to trigger this lesson
			this.sceneEntities.get('Friar Carleton').get('entity').showStar();
			this.sceneEntities.get('Friar Carleton').interact = _.once(_.bind(function (Player) {
				// Set entity's interact function to trigger this lesson
				this.sceneEntities.get('Friar Gordon').get('entity').showStar();
				this.sceneEntities.get('Friar Gordon').interact = _.once(_.bind(function (Player) {
					this.sceneEntities.get('Friar Gordon').get('entity').hideStar();
					this.sceneQuestCollection.shift().startActions();
				}, this));

				this.sceneEntities.get('Friar Carleton').get('entity').hideStar();
				this.sceneQuestCollection.shift().startActions();
			}, this));

			this.sceneEntities.get('Villager Raymond').interact = _.bind(function (Raymond) {
				var key = 0;
				var tips = [
					'Hey! Did you know, you can find out what someone\'s object is called by casting "Foo.ping();"? Try it out!',
					'I\'m not supposed to tell you this, but you can control just about everything in this world.',
					'That fork wand gives you access to a "Game" object in the caster below. Try finding out what\'s stored inside!',
					'When creatures in this world do something, they will often announce the method they used. You can usually learn how to copy them with a little experimentation and the power of that fork wand of yours.',
					'Stop nagging me! It\'s Javascript, RTFM!'
				];

				Raymond.get('entity').addComponent('Info').showInfoSprite();
				Raymond.get('entity')._InfoSprite.x -= 5; // Move the info sprite a bit :)

				return function (Player) {
					Raymond.say({
						text: tips[key],
						force: true,
						callback: function () {speaking = false;}
					});
					key++;
					if (key === tips.length) {
						key = 0; // Reset key when we reach the end
						// Remove the indicator
						Raymond.get('entity').hideInfoSprite();
					}
				};
			}(this.sceneEntities.get('Villager Raymond')), this);
		},
		addSceneEntities: function () {
			for (var sceneEntity in Scene1Definition) {
				var sceneSpritesAttrs = Scene1Definition[sceneEntity];

				for (var sceneSpritesAttr in sceneSpritesAttrs) {
					var attr = sceneSpritesAttrs[sceneSpritesAttr];
					this.sceneEntities.add(new entities[sceneEntity](attr));
				}
			}
		}
	});
});