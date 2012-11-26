define([
	'crafty'
], function (Crafty) {
	var component = Crafty.c("Action", {
		_currentAction: null,
		_actions: null, 
		_isActing: false,

		nextStep: function () {
			
		},

		_stopActions: function () {
			this._actions = null;
			this._currentAction = null;
			this.unbind("EnterFrame", this._enterFrame);
		},

		_enterFrame: function () {

			// Entity is still doing previous action
			if (this._isActing) {
				return; 
			}

			if (this._actions.isEmpty()) {
				this._stopActions();
				return;
			}

			this._currentAction = this._actions.shift();

			var e = this._currentAction.get('entity');
			var p = this._currentAction.get('params');

			switch (this._currentAction.get('method')) {
				case 'disable':
					e.get('entity').disableControl();
					break;
				case 'enable':
					e.get('entity').enableControl();
					break;
				case 'move': 
					e.get('entity').startMoving(p);

					var callback = _.bind(function() {
						this._isActing = false;	
					}, this);

					e.get('entity').bind("Stopped", callback);

					this._isActing = true;
					break;
				case 'speak': 
					p.forEach(function(el){
						e.get('entity').say(el);
					});
					break;
				case 'speakWait': 
					var callback = _.bind(function() {
						this._isActing = false;	
					}, this);

					e.get('entity').say(p, callback);
					
					this._isActing = true;
					break;
				case 'wait': 
					var callback = _.bind(function() {
						this._isActing = false;	
					}, this);

					setTimeout(callback, p);

					this._isActing = true;
					break;
			}
		},

		startActions: function (actions) {
			// clear any existing EnterFrame handlers
			this._stopActions();

			this._actions = actions;
			this.bind("EnterFrame", this._enterFrame);
		},

		setActions: function (actions) {
			this._actions = actions;
			return this;
		},

		init: function () {
			//console.log('action ready');
		}
	});

	/**
	 * The return value isn't all that useful here. Crafty.c keeps track of all
	 * the components we defined so we never have to use the component variable.
	 * We simply define this module as a dependency when we need to be sure that
	 * the component has been added to Crafty.
	 */
	return {
		component: component
	};
});