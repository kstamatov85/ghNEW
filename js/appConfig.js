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
		
		
		//PROFILE DATA
        if(localStorage.getItem('profileData')){
            $rootScope.userProfileData = JSON.parse(localStorage.getItem('profileData'));
        }
        else{
            var newProfileData = {
				points : 0,
				lifetimePoints : 0,
				bestScore : 0,
				totalGames : 0
			};
            localStorage.setItem('profileData', JSON.stringify(newProfileData));
            $rootScope.userProfileData = JSON.parse(localStorage.getItem('profileData'));
        };
		
		//STORE DATA
        if(localStorage.getItem('storeData')){
            $rootScope.userStoreData = JSON.parse(localStorage.getItem('storeData'));
        }
        else{
            var newStoreData = {
				PlayGrounds : {
					selectedItem : 'wallBG-1', //correspond to itemId
					'wallBG-1' : true,
					'wallBG-2' : false,
					'wallBG-3' : false,
					'wallBG-4' : false,
					'wallBG-5' : false,
					'wallBG-6' : false
				},
				Mouths : {
					selectedItem : 'mouth-1', //correspond to itemId
					'mouth-1' : true,
					'mouth-2' : true,
					'mouth-3' : false,
					'mouth-4' : false,
					'mouth-5' : false
				}
			};

            localStorage.setItem('storeData', JSON.stringify(newStoreData));
            $rootScope.userStoreData = JSON.parse(localStorage.getItem('storeData'));
        };
		
		
        /* ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### */
        /* ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### */
        /* ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### */
		

        /* ### ### GAME CONFIG ### ###  */
        
        //Create GAME DATA OBJ
        $rootScope.gh = {};
        
        //SET GAME SIZE
        $rootScope.gh.GAME_WIDTH = 1080;
        $rootScope.gh.GAME_HEIGHT = 1920;
        
        //BOOT GAME DATA - Apply game settings
        $rootScope.gh.Boot = function(game){};
        $rootScope.gh.Boot.prototype = {
            preload: function(){
                // preload the loading indicator first before anything else
                this.load.image('preloaderBar', 'img/loading-bar.png');
            },
            create: function(){
                // Loading screen will have dark background
                this.stage.backgroundColor = '#e9bae8';
                
                // Scaling options
                this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                
                // have the game centered horizontally
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
        
        //PRELOAD GAME RESOURCES - images/sounds
        $rootScope.gh.Preload = function(game){};
        $rootScope.gh.Preload.prototype = {
            preload: function(){
                // Add loading Bar image
                this.preloadBar = this.add.sprite(($rootScope.gh.GAME_WIDTH-420)/2, ($rootScope.gh.GAME_HEIGHT-27)/2, 'preloaderBar');
                // Run Loading Bar
                this.load.setPreloadSprite(this.preloadBar);
                
                // START LOADING RESOURCES
                
                // load general images
                this.load.image('background', 'img/background.png');
                this.load.image('storeIcon', 'img/storeIcon.png');
                this.load.image('profileIcon', 'img/profileIcon.png');
                this.load.image('pauseIcon', 'img/button-pause.png');
                this.load.image('windArrow', 'img/arrowImg.png');
                this.load.image('target', 'img/target.png');
                
				//Load hole
                this.load.image('hole-1', 'img/hole.png');
                
                //Load balls
                this.load.image('ball-1', 'img/ball.png');

				
                // load walls
                this.load.image('wallBG-1', 'img/walls/wallBG-1.jpg');
				this.load.image('wallBG-2', 'img/walls/wallBG-2.jpg');
				this.load.image('wallBG-3', 'img/walls/wallBG-3.jpg');
				this.load.image('wallBG-4', 'img/walls/wallBG-4.jpg');
				this.load.image('wallBG-5', 'img/walls/wallBG-5.jpg');
				this.load.image('wallBG-6', 'img/walls/wallBG-6.jpg');
				
				
				//Load mouth
                this.load.image('mouth-1', 'img/mouths/mouth-1.jpg');
				this.load.image('mouth-2', 'img/mouths/mouth-2.jpg');
				this.load.image('mouth-3', 'img/mouths/mouth-3.jpg');
				this.load.image('mouth-4', 'img/mouths/mouth-4.jpg');
				this.load.image('mouth-5', 'img/mouths/mouth-5.jpg');
				
				
                // load spritesheets
                this.load.spritesheet('button-start', 'img/button-start.png', 401, 143); 
				this.load.image('button-start2', 'img/button-start2.png'); 
            },
            create: function(){
                // start the MainMenu state
				
                this.state.start('Menu');
            }
        };
        
        
	});
    

})();