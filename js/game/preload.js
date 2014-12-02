gh.Preload = function(game){
	// define width and height of the game
	gh.GAME_WIDTH = 320;
	gh.GAME_HEIGHT = 480;
};
gh.Preload.prototype = {
	preload: function(){
		// set background color and preload image
		this.stage.backgroundColor = '#cccccc';
		this.preloadBar = this.add.sprite((gh.GAME_WIDTH-311)/2, (gh.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		// load images
		this.load.image('background', 'img/background.png');
		// load spritesheets
		/* this.load.spritesheet('candy', 'img/candy.png', 82, 98);
		this.load.spritesheet('monster-idle', 'img/monster-idle.png', 103, 131);*/
		this.load.spritesheet('button-start', 'img/button-start.png', 401, 143); 
	},
	create: function(){
		// start the MainMenu state
		this.state.start('mainMenu');
	}
};