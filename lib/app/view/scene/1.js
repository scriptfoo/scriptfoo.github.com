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
	RuneItemModel
) {
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
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 301,
				y: 565
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 773, y: 40
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 842, y: 13
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 788, y: 4
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 809, y: 49
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 631, y: -18
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 513, y: 4
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 270, y: -44
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 474, y: -43
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 383, y: -26
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 581, y: -2
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 814, y: 220
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 839, y: 85
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 722,	y: -8
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 716,	y: 67
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 21, y: -10
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 50, y: 46
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: -7, y: 55
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: -18, y: 1
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 101, y: -11
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: -18, y: 94
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 39, y: 121
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 172, y: -41
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 68, y: 177
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 11, y: 186
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 0, y: 132
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 119, y: 120
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 214, y: -14
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 0, y: 225
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 0, y: 276
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 751, y: 110
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 837, y: 117
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 785, y: 109
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 110, y: 418
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 308, y: 421
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 29, y: 1041
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 352, y: 587
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 838, y: 336
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 554, y: 267
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 808, y: 117
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 794, y: 345
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 856, y: 262
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 746, y: 387
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 855, y: 370
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 650, y: 267
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 842, y: 122
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 845, y: 181
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 856, y: 238
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 0, y: 318
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 278, y: 2
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 809, y: 405
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 806, y: 469
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 836, y: 505
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 649, y: 748
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 865, y: 443
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 582, y: 749
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 514, y: 750
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 447, y: 736
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 354, y: 634
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 350, y: 698
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 593, y: 799
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 443, y: 783
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 421, y: 818
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 431, y: 863
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 285, y: 622
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 335, y: 734
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 301, y: 654
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 390, y: 742
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 368, y: 826
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 728, y: 739
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 770, y: 779
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 288, y: 700
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 238, y: 652
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 712, y: 819
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 240, y: 709
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 681, y: 778
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 503, y: 855
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 798, y: 821
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 727, y: 879
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 655, y: 825
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 174, y: 667
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 833, y: 872
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 794, y: 911
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 646, y: 1141
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 746, y: 953
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 809, y: 971
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 708, y: 929
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 628, y: 866
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 567, y: 852
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 513, y: 817
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 320, y: 788
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 602, y: 909
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 695, y: 1107
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 656, y: 924
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 832, y: 1017
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 803, y: 1070
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 745, y: 1098
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 735, y: 1147
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 524, y: 1113
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 428, y: 1103
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 299, y: 1116
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 808, y: 1116
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 601, y: 1097
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 571, y: 1154
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 351, y: 1122
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 654, y: 34
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 132, y: -17
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 409, y: -6
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 0, y: 360
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 0, y: 408
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: -9, y: 504
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: -20, y: 450
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: -20, y: 543
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: -20, y: 594
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: -20, y: 636
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: -20, y: 678
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: -20, y: 726
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 0, y: 810
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: -11, y: 756
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: -11, y: 849
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: -11, y: 900
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: -11, y: 942
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: -11, y: 984
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: -11, y: 1032
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: -3, y: 1074
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: -3, y: 1122
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 38, y: 417
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 803, y: 1164
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 173, y: 421
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 235, y: 425
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 38, y: 1094
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 124, y: 1103
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 328, y: -8
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 394, y: 1146
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 468, y: 1147
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 267, y: 1135
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 171, y: 1125
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 42, y: 1138
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 94, y: 1144
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 137, y: 1168
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 211, y: 1169
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: -10, y: 1144
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 849, y: 1118
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 516, y: 55
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 292, y: 47
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 817, y: 583
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 832, y: 553
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 793, y: 643
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 842, y: 612
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 777, y: 680
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 815, y: 697
			});
			new TreeEntityModel({
				'sprite': 'TreeOlive',
				x: 843, y: 745
			});
			new TreeEntityModel({
				'sprite': 'TreeGreen',
				x: 687, y: 367
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 665, y: 363
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 680, y: 378
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 121, y: 905
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 164, y: 852
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 225, y: 894
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 227, y: 828
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 267, y: 865
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 105, y: 793
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 49, y: 727
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 320, y: 931
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 222, y: 922
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 617, y: 393
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 659, y: 707
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 723, y: 682
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 791, y: 509
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 721, y: 427
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 194, y: 1026
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 131, y: 1041
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 740, y: 1069
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 784, y: 1013
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 487, y: 557
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 464, y: 261
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 500, y: 219
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaTall',
				x: 374, y: 237
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: -12, y: 564, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: -3, y: 870, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: 141, y: 773, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: 466, y: 971, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: 64, y: 979, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: 59, y: 651, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: 153, y: 594, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: 544, y: 1045, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: 191, y: 889, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: 165, y: 1050, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: 671, y: 76, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: -10, y: 115, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: 8, y: 246, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: 556, y: 164, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: 662, y: 204, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: 733, y: 249, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: 656, y: 402, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: 482, y: 402, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: 152, y: 402, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: 553, y: 538, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaSmall',
				x: 366, y: 516, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaLarge',
				x: 92, y: 46, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaLarge',
				x: 158, y: 255, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaLarge',
				x: 352, y: 615, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaLarge',
				x: 284, y: 354, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaLarge',
				x: 53, y: 336, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaLarge',
				x: 503, y: 471, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaLarge',
				x: 526, y: 672, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaLarge',
				x: 272, y: 451, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaLarge',
				x: 153, y: 175, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaLarge',
				x: 342, y: 175, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaLarge',
				x: 290, y: 306, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaLarge',
				x: 527, y: 249, z: 1
			});
			new GrassEntityModel({
				'sprite': 'GrassAreaLarge',
				x: 587, y: 339, z: 1
			});
			new CottageEntityModel({
				'sprite': 'CottageBrown',
				x: 347, y: 56
			});
			new CottageEntityModel({
				'sprite': 'CottageBrown',
				x: 407, y: 280
			});
			new CottageEntityModel({
				'sprite': 'CottageBrown',
				x: 125, y: 276
			});
			new CottageEntityModel({
				'sprite': 'CottageBrown',
				x: 214, y: 276
			});
			new CottageEntityModel({
				'sprite': 'CottageMaroon',
				x: 434, y: 56
			});
			new CottageEntityModel({
				'sprite': 'CottageMaroon',
				x: 686, y: 478
			});

			this.sceneEntities.add([
				new FriarEntityModel({
					'sprite': 'IdleLeft',
					x: 530, y: 318,
					id: 'Friar Barlow'
				}),
				new FriarEntityModel({
					'sprite': 'IdleLeft',
					x: 255, y: 160,
					id: 'Friar Carleton'	
				}),
				new FriarEntityModel({
					'sprite': 'IdleLeft',
					x: 653, y: 132,
					id: 'Friar Gordon'
				}),
				new Villager1EntityModel({
					'sprite': 'IdleLeft',
					x: 644, y: 213,
					id: 'Villager Raymond'
				}),
				new Villager1EntityModel({
					'sprite': 'IdleLeft',
					x: 157, y: 521,
					id: 'Villager Maxwell'
				}),		
				new Villager1EntityModel({
					'sprite': 'IdleLeft',
					x: 674, y: 213,
					id: 'Villager Edgar'
				}),	
				new Villager2EntityModel({
					'sprite': 'IdleLeft',
					x: 606, y: 641,
					id: 'Villager Githa'
				}),
				new Villager2EntityModel({
					'sprite': 'IdleLeft',
					x: 282, y: 160,
					id: 'Villager Ingrith'
				}),
				new BearEntityModel({
					'sprite': 'IdleLeft',
					x: 688, y: 1026,
					id: 'Randall'
				}),
				new BunnyEntityModel({
					'sprite': 'IdleLeft',
					x: 770, y: 598,
					id: 'Tanner'
				}),
				new BunnyEntityModel({
					'sprite': 'IdleLeft',
					x: 203, y: 1026,
					id: 'Stuart'
				})
			]);

			new WeedEntityModel({
				'sprite': 'WeedDark',
				x: 241, y: 102
			});
			new WeedEntityModel({
				'sprite': 'WeedDark',
				x: 153, y: 108
			});
			new WeedEntityModel({
				'sprite': 'WeedDark',
				x: 200, y: 98
			});
			new WeedEntityModel({
				'sprite': 'WeedDark',
				x: 746, y: 581
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 631, y: 625
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 771, y: 595
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 624, y: 126
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 801, y: 577
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 254, y: 1034
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 117, y: 1022
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 516, y: 1092
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 476, y: 1066
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 381, y: 1101
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 230, y: 1109
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 265, y: 1130
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 130, y: 1096
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 451, y: 1084
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 516, y: 1056
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 753, y: 1035
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 801, y: 1069
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 61, y: 1019
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 68, y: 951
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 106, y: 966
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 104, y: 921
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 650, y: 570
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 748, y: 634
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 640, y: 594
			});
			new WeedEntityModel({
				'sprite': 'WeedBright',
				x: 668, y: 601
			});
			//Dog{x: 309, y: 175} id: Winston
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 623, y: 553
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 646, y: 553
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 666, y: 553
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 617, y: 561
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 608, y: 572
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 600, y: 584
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 592, y: 596
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 583, y: 608
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 459, y: 364
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 407, y: 363
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 574, y: 620
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 201, y: 363
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 314, y: 148
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 565, y: 632
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 557, y: 642
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 772, y: 553
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 795, y: 553
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 819, y: 553
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 840, y: 554
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 835, y: 565
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 830, y: 574
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 825, y: 587
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 819, y: 598
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 813, y: 610
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 807, y: 621
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 801, y: 633
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 513, y: 146
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 536, y: 146
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 557, y: 146
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 580, y: 642
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 603, y: 642
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 627, y: 642
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 420, y: 149
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 336, y: 148
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 620, y: 654
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 729, y: 645
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 750, y: 645
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 773, y: 645
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 795, y: 645
			});
			new BushEntityModel({
				'sprite': 'BushGreen',
				x: 721, y: 654
			});
			new FlowerEntityModel({
				'sprite': 'FlowerBlue',
				x: 653, y: 621
			});
			new FlowerEntityModel({
				'sprite': 'FlowerBlue',
				x: 786, y: 618
			});
			new FlowerEntityModel({
				'sprite': 'FlowerBlue',
				x: 665, y: 585
			});
			new FlowerEntityModel({
				'sprite': 'FlowerBlue',
				x: 778, y: 574
			});
			new FlowerEntityModel({
				'sprite': 'FlowerBlue',
				x: 616, y: 628
			});
			new FlowerEntityModel({
				'sprite': 'FlowerPink',
				x: 635, y: 602
			});
			new FlowerEntityModel({
				'sprite': 'FlowerPink',
				x: 744, y: 615
			});
			new FlowerEntityModel({
				'sprite': 'FlowerPink',
				x: 693, y: 576
			});
			new FlowerEntityModel({
				'sprite': 'FlowerPink',
				x: 760, y: 608
			});
			new FlowerEntityModel({
				'sprite': 'FlowerPink',
				x: 799, y: 595
			});
			new ChestEntityModel({
				'sprite': 'ChestBlue',
				x: 219, y: 187
			});
			new ChestEntityModel({
				'sprite': 'ChestRed',
				x: 603, y: 349
			});
			new RuneEntityModel({
				'sprite': 'RuneRed',
				x: 551, y: 360
			});
			new RuneEntityModel({
				'sprite': 'RuneBlue',
				x: 539, y: 360
			});
			new RuneEntityModel({
				'sprite': 'RuneGreen',
				x: 563, y: 360
			});
			new RuneEntityModel({
				'sprite': 'RuneGreen',
				x: 807, y: 1036
			});
			new RuneEntityModel({
				'sprite': 'RuneYellow',
				x: 575, y: 360
			});
		}
	});
});