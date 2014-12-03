(function(){
    
    var appGame = angular.module('gameLogic',[]);
    
    appGame.controller('gameCtrl', function($rootScope, $scope) {
        $scope.showProfile = true;
        $scope.showStore = false;
        
        // listen for the event in the relevant $scope
        $scope.$on('closeMenu', function (event, data) {
          console.log(data); // 'Data to send'
        });
        
        
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
                this.stage.backgroundColor = '#111111';
                this.preloadBar = this.add.sprite(($rootScope.gh.GAME_WIDTH-311)/2, ($rootScope.gh.GAME_HEIGHT-27)/2, 'preloaderBar');
                this.load.setPreloadSprite(this.preloadBar);
                // load images
                this.load.image('background', 'img/background.png');
                this.load.image('storeIcon', 'img/storeIcon.png');
                this.load.image('profileIcon', 'img/profileIcon.png');
                
                
                // load spritesheets
                /* this.load.spritesheet('candy', 'img/candy.png', 82, 98);
                this.load.spritesheet('monster-idle', 'img/monster-idle.png', 103, 131);*/
                this.load.spritesheet('button-start', 'img/button-start.png', 401, 143); 
            },
            create: function(){
                // start the MainMenu state
                this.state.start('Menu');
            }
        };
        
        
        //START GAME MENU
        $rootScope.gh.Menu = function(game){};
        $rootScope.gh.Menu.prototype = {
            create: function(){
                // display images
                //var bg = this.add.tileSprite(0, 0, $rootScope.gh.GAME_WIDTH, $rootScope.gh.GAME_HEIGHT, 'background');
                var bg = this.add.sprite(0, 0, 'background');
                bg.width = $rootScope.gh.GAME_WIDTH;
                bg.height = $rootScope.gh.GAME_HEIGHT;
                
                
                 // add the button that will start the game
                this.add.button($rootScope.gh.GAME_WIDTH-701-50, $rootScope.gh.GAME_HEIGHT-350-50, 'storeIcon', this.openStore, this);
                
                this.add.button(100, 100, 'profileIcon', this.openProfile, this);
                
                
                // add the button that will start the game
                this.add.button($rootScope.gh.GAME_WIDTH-401-50, $rootScope.gh.GAME_HEIGHT-143-50, 'button-start', this.startGame, this, 1, 0, 2);
            },
            startGame: function() {
                // start the Game state
                //this.state.start('Game');
            },
            
            openProfile: function() {
                $scope.showProfile = true;
                $scope.$apply();
                //this.state.start('Game');
            },
            
            openStore: function() {
                $scope.showStore = true;
                $scope.$apply();
                //this.state.start('Game');
            }
            
        };
        
        
        
       var game = new Phaser.Game(1080, 1920, Phaser.AUTO, 'gameScreen', game);

        /* ### Add Game States ### */
        game.state.add('Boot', $rootScope.gh.Boot);
        game.state.add('Preload', $rootScope.gh.Preload);
        game.state.add('Menu', $rootScope.gh.Menu);
        //game.state.add('Game', gh.Game);
        // start the Boot state
        game.state.start('Boot');
        

    });
    
})();    