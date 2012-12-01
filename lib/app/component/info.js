define([
	'crafty',
	'app/model/sprite/info'
], function (Crafty, InfoSprite) {
	Crafty.c("Info", {
		_InfoSprite: null,
		init: function() {
			new InfoSprite().create();

			this._InfoSprite = Crafty.e("2D, DOM, InfoSprite")
				.attr({
					h: 32,
					w: 31,
					x: this._x - (this._w / 2) + 15,
					y: this._y - 30
				})
				// Start hidden
				.css('display', 'none');

			this.attach(this._InfoSprite);

			return this;
		},
		showInfoSprite: function () {
			this._InfoSprite.css('display', 'block');
		},
		hideInfoSprite: function () {
			this._InfoSprite.css('display', 'none');
		}
	});
});