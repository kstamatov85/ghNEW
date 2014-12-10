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
        
        /* ### ### GAME CONFIG ### ###  */
        
        //Create GAME DATA OBJ
        $rootScope.gh = {};
        
        //SET GAME SIZE
        $rootScope.gh.GAME_WIDTH = 1080;
        $rootScope.gh.GAME_HEIGHT = 1920;
        
        //BOOT GAME DATA
        $rootScope.gh.Boot = function(game){};
        $rootScope.gh.Boot.prototype = {
            preload: function(){
                // preload the loading indicator first before anything else
                this.load.image('preloaderBar', 'img/loading-bar.png');
            },
            create: function(){
                // Loading screen will have dark background
                this.stage.backgroundColor = '#111111';
                
                // Scaling options
                this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                
                //have the game centered horizontally
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
                
                //screen size will be set automatically
                this.scale.setScreenSize(true);
                
                // The maximum number of Pointers allowed to be active at any one time
                this.input.maxPointers = 1;
                
                //Physics system
                this.physics.startSystem(Phaser.Physics.ARCADE);
                this.physics.arcade.gravity.y = 0;
                this.physics.arcade.gravity.x = 0;
                
                // start the Preloader state
                this.state.start('Preload');
            }
        };
        
        //PRELOAD GAME DATA
        $rootScope.gh.Preload = function(game){};
        $rootScope.gh.Preload.prototype = {
            preload: function(){
                
                // Add load Bar image
                this.preloadBar = this.add.sprite(($rootScope.gh.GAME_WIDTH-311)/2, ($rootScope.gh.GAME_HEIGHT-27)/2, 'preloaderBar');
                //Run Load Bar
                this.load.setPreloadSprite(this.preloadBar);
                
                // load general images
                this.load.image('background', 'img/background.png');
                this.load.image('storeIcon', 'img/storeIcon.png');
                this.load.image('profileIcon', 'img/profileIcon.png');
                this.load.image('pauseIcon', 'img/button-pause.png');
                this.load.image('windArrow', 'img/arrowImg.png');
                this.load.image('target', 'img/target.png');
                
                // load walls
                this.load.image('gameBG-1', 'img/pattern6.jpg');
                
                //Load hole
                this.load.image('hole-1', 'img/hole.png');
                
                //Load mouth
                this.load.image('mouth-1', 'img/mouth1.jpg');
                
                //Load balls
                this.load.image('ball-1', 'img/ball.png');
                
                // load spritesheets
                this.load.spritesheet('button-start', 'img/button-start.png', 401, 143); 
            },
            create: function(){
                // start the MainMenu state
                this.state.start('Menu');
            }
        };
        
        
	});
    

})();