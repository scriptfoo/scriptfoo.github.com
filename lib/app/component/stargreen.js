define([
	'crafty',
	'app/model/sprite/stargreen'
], function (Crafty, StarGreenSprite) {
	Crafty.c("StarGreen", {
		_StarGreen: null,
		init: function() {
			new StarGreenSprite().create();

			this._StarGreen = Crafty.e("2D, DOM, StarGreen, SpriteAnimation")
				.attr({
					h: 32,
					w: 31,
					x: this._x - (this._w / 2) + 10,
					y: this._y - 40
				})
				.animate("go", 0, 0, 24)
				.animate("go", 10, -1)
				// Start hidden
				.css('display', 'none');

			this.attach(this._StarGreen);

			return this;
		},
		showStar: function () {
			this._StarGreen.css('display', 'block');
		},
		hideStar: function () {
			this._StarGreen.css('display', 'none');
		}
	});
});