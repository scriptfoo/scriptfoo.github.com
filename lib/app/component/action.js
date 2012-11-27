define([
	'crafty'
], function (Crafty) {
	var component = Crafty.c("Action", {
		_currentAction: null,
		_actions: null, 
		_isActing: false,

		_starting: function () {
			this._isActing = true;
		},

		_stopping: function () {
			this._isActing = false;
		},

		_stopActions: function () {
			this._actions = null;
			this._currentAction = null;
			this.unbind("EnterFrame", this._enterFrame);
			this.unbind("actionStarting", this._starting);
			this.unbind("actionStopping", this._stopping);
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

			this._currentAction.execute();
		},

		startActions: function (actions) {
			// clear any existing EnterFrame handlers
			this._stopActions();

			this._actions = actions;
			this.bind("EnterFrame", this._enterFrame);
			this.bind("actionStarting", this._starting);
			this.bind("actionStopping", this._stopping);
		},

		setActions: function (actions) {
			this._actions = actions;
			return this;
		},

		init: function () {
			_.bindAll(this);
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