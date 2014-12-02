gh.mainMenu = function(game){};
gh.mainMenu.prototype = {
	create: function(){
		// display images
		this.add.sprite(0, 0, 'background');

		// add the button that will start the game
		this.add.button(gh.GAME_WIDTH-401-10, gh.GAME_HEIGHT-143-10, 'button-start', this.startGame, this, 1, 0, 2);
	},
	startGame: function() {
		// start the Game state
		//this.state.start('Game');
	}
};