define([
	'app/model/entity',
], function (EntityModel) {
	return EntityModel.extend({
		initialize: function (options) {
			var entity = Crafty.e("2D, DOM, Text")
				.attr({x: 1, y: 1, h: 400, w: 960})
				.text("LOADING …")
				.css({
					"text-align": "center",
					"color": "#FFFFFF",
					"lineHeight": "400px"
				});

			this.set('entity', entity);
		}
	});
});