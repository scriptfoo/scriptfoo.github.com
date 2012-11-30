define([
	'crafty'
], function (Crafty) {
	Crafty.c("PlayerControls", {
		init: function() {
			this.requires('Multiway');
		},
		playerControls: function(speed, directions) {
			// Set some defaults for directions
			directions = directions || {
				W: -90,
				S: 90,
				D: 0,
				A: 180
			};

			this.multiway(speed, directions)

			return this;
		}
	});
});
