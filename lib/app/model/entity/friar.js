define([
	'app/model/entity',
	'app/model/sprite/friar',
	// Don't need the instance of the components below but I need to be sure
	// they were created
	'app/component/moveto'
], function (EntityModel, FriarSpriteModel) {
	return EntityModel.extend({
		defaults: {
			'spriteModel': FriarSpriteModel,
			'sprite': 'IdleLeft',
			'components': '2D, Canvas, SpriteAnimation, Solid, MoveTo',
			'x': 0,
			'y': 0,
			'z': 0,
			'entity': null
		},
		oldDirection: null,
		postInit: function (entity) {
			entity.animate("walkLeft", 4, 0, 5)
				.animate("walkRight", 6, 0, 7)
				.animate("idleLeft", 0, 0, 1)
				.animate("idleRight", 2, 0, 3)
				.animate("idleLeft", 50, -1);

			entity.bind("NewDirection", function (direction) {
				if (direction.x < 0) {
					leftOrRight = "left";
					if (!this.isPlaying("walkLeft"))
						this.stop().animate("walkLeft", 10, -1);
				}
				if (direction.x > 0) {
					leftOrRight = "right";
					if (!this.isPlaying("walkRight"))
						this.stop().animate("walkRight", 10, -1);
				}
				if(!direction.x && !direction.y) {
					if (this.oldDirection.x < 0) {
						this.stop().animate("idleLeft", 50, -1);
					} else {
						this.stop().animate("idleRight", 50, -1);
					}
				}
				// set the direction for later use	
				this.oldDirection = direction;
			});
		},
	});
});