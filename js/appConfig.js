(function(){
    
    
    /* ### ### ### INIT THE APP ### ### ###  */
    var gfApp = angular.module("ghApp", [
        'ngTouch',
        'ngAnimate',
        //Custom Modules
        'appServices', // Services
        'appControllers',
        'gameLogic'

    ]).run(function($rootScope){
        
        /* ### ### SET/LOAD USER DATA ### ###  */
		$rootScope.userStoreData;
		$rootScope.userProfileData;
        
		//STORE DATA
        if(localStorage.getItem('storeData')){
            $rootScope.userStoreData = JSON.parse(localStorage.getItem('storeData'));
        }
        else{
            var newStoreData = {
				points : 0,
				playGrounds : ['regular_wall'],
				holes : ['regular_hole'],
				pointers : ['regular_pointer']
            };
            localStorage.setItem('storeData', JSON.stringify(newStoreData));
            $rootScope.userStoreData = JSON.parse(localStorage.getItem('storeData'));
        };
		
		
        //PROFILE DATA
        if(localStorage.getItem('profileData')){
            $rootScope.userStoreData = JSON.parse(localStorage.getItem('profileData'));
        }
        else{
            var newProfileData = {
				bestScore : 0,
				totalGames : 0,
				lifetimeCoins : 0
            };
            localStorage.setItem('userProfileData', JSON.stringify(newProfileData));
            $rootScope.userProfileData = JSON.parse(localStorage.getItem('profileData'));
        };
        
        
        /* ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### */
        
        
        /* ### ### GAME BOOT DATA ### ###  */
        
        $rootScope.gh = {};
        
        //BOOT GAME DATA
        $rootScope.gh.Boot = function(game){};

        $rootScope.gh.Boot.prototype = {
            preload: function(){
                // preload the loading indicator first before anything else
                this.load.image('preloaderBar', 'img/loading-bar.png');
            },
            create: function(){
                // set scale options
                this.input.maxPointers = 1;
                this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
                this.scale.setScreenSize(true);
                // start the Preloader state
                this.state.start('Preload');
            }
        };
        
        
        //PRELOAD GAME DATA
        $rootScope.gh.Preload = function(game){
            // define width and height of the game
            $rootScope.gh.GAME_WIDTH = 1080;
            $rootScope.gh.GAME_HEIGHT = 1920;
        };
        $rootScope.gh.Preload.prototype = {
            preload: function(){
                // set background color and preload image
                this.stage.backgroundColor = '#cccccc';
                this.preloadBar = this.add.sprite(($rootScope.gh.GAME_WIDTH-311)/2, ($rootScope.gh.GAME_HEIGHT-27)/2, 'preloaderBar');
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
                //this.state.start('mainMenu');
            }
        };
        
        
        

		
	});
    

})();