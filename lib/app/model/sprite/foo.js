define([
	'app/model/sprite'
], function (SpriteModel) {
	return SpriteModel.extend({
		defaults: {
			'file' : 'images/sprites/FooSheet.png',
			'tilew' : 27,
			'tileh' : 39,
			'paddingX': 1,
			'paddingY': 1,
			'elements': {
				Foo: [0, 2]
			},
		}
	});
});