define([
	'crafty',
	'app/model/sprite/ping'
], function (Crafty, PingSprite) {
	Crafty.c("Ping", {
		_Ping: {},
		init: function() {
			new PingSprite().create();

			// Create a ping area (square because we're lazy)
			this._Ping = Crafty.e("2D, Canvas, PingSprite, SpriteAnimation, Collision, PingHitbox")
				.attr({
					h: 300,
					w: 300,
					x: this._x - 135,
					y: this._y - 120,
					z: 1
				})
				.collision()
				.animate("ping", 0, 0, 26);

			this.attach(this._Ping);

			return this;
		},
		ping: function () {
			this.announceAction('Foo.ping()', 'method');

			this._Ping.animate("ping", 40, 0);
			setTimeout(_.bind(function () {
				var hits, i, entity;

				// Find any colliding Pong components and make them pong()!
				if(this._Ping.hit('PongHitbox')) {
					hits = this._Ping.hit('PongHitbox');
					for (i = 0; i < hits.length; i++) {
						entity = hits[i].obj;
						if (entity !== this) {
							setTimeout(function (en) {
								return function () {
									en.pong();
								};
							}(entity), Crafty.math.randomInt(10, 100) * 10);
						}
					}
				}
			}, this), 2000);
		}
	});
});