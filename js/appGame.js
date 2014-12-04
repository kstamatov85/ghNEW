(function(){
    
    var appGame = angular.module('gameLogic',[]);
    
    appGame.controller('gameCtrl', function($rootScope, $scope) {
        
        //CLOSE EXTRA SCREENS BY DEFAULT
        $scope.showProfile = false;
        $scope.showStore = false;
        
        //CLOSE MENU LISTENER
        $scope.$on('closeMenu', function (event, data) {
          $scope[data] = false;
        });
        
        
        /* ### ### GAME BOOT DATA ### ###  */
        
        $rootScope.gh = {};
        
        //SET GAME SIZE
        $rootScope.gh.GAME_WIDTH = 1080;
        $rootScope.gh.GAME_HEIGHT = 1920;
        
        //BOOT DATA
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
        
        
        //PRELOAD DATA
        $rootScope.gh.Preload = function(game){};
        $rootScope.gh.Preload.prototype = {
            preload: function(){
                // set background color and preload image
                this.stage.backgroundColor = '#111111';
                // Add load Bar image
                this.preloadBar = this.add.sprite(($rootScope.gh.GAME_WIDTH-311)/2, ($rootScope.gh.GAME_HEIGHT-27)/2, 'preloaderBar');
                //Run Load Bar
                this.load.setPreloadSprite(this.preloadBar);
                
                // load general images
                this.load.image('background', 'img/background.png');
                this.load.image('storeIcon', 'img/storeIcon.png');
                this.load.image('profileIcon', 'img/profileIcon.png');
                this.load.image('pauseIcon', 'img/button-pause.png');
                // load walls
                this.load.image('gameBG-1', 'img/pattern6.jpg');
                //Load holes
                this.load.image('hole-1', 'img/hole1.jpg');
                
                
                // load spritesheets
                this.load.spritesheet('button-start', 'img/button-start.png', 401, 143); 
            },
            create: function(){
                // start the MainMenu state
                this.state.start('Menu');
            }
        };
        
        
        //START MENU
        $rootScope.gh.Menu = function(game){};
        
        $rootScope.gh.Menu.prototype = {
            create: function(){
                // display images
                //var bg = this.add.tileSprite(0, 0, $rootScope.gh.GAME_WIDTH, $rootScope.gh.GAME_HEIGHT, 'background');
                var bg = this.add.sprite(0, 0, 'background');
                bg.width = $rootScope.gh.GAME_WIDTH;
                bg.height = $rootScope.gh.GAME_HEIGHT;
                
                //Profile Screen button
                this.add.button(100, 100, 'profileIcon', this.openProfile, this);
                //Store Screen button
                this.add.button(300, 100, 'storeIcon', this.openStore, this);
                // Start Game button
                this.add.button($rootScope.gh.GAME_WIDTH-450, $rootScope.gh.GAME_HEIGHT-200, 'button-start', this.startGame, this, 1, 0, 2);
            },
            startGame: function() {
                this.state.start('Game');
            },
            openProfile: function() {
                $scope.showProfile = true;
                $scope.$apply();
            },
            openStore: function() {
                $scope.showStore = true;
                $scope.$apply();
            }
            
        };
        
        
        //START GAME
        $rootScope.gh.Game = function(game){
            //PUBLIC PARAMS
            $rootScope.gh.p_score = 0;
            $rootScope.gh.p_timer = 60;
            
            $rootScope.gh.p_scoreText = null;
            $rootScope.gh.p_timeAvab = null;
            //PRIVATE PARAMS
            this.g_fontStyle = {font: "60px Arial", fill: "#FF0000", stroke: "#333333", strokeThickness: 5, align: "center"};
        
        };
        
        $rootScope.gh.Game.prototype = {
            create: function(){
                //Add gravity
                this.physics.startSystem(Phaser.Physics.ARCADE);
                this.physics.arcade.gravity.y = 200;
                
                // display images
                var bg = this.add.tileSprite(0, 0, $rootScope.gh.GAME_WIDTH, $rootScope.gh.GAME_HEIGHT, 'gameBG-1');
               
                
                var wall = this.add.sprite(($rootScope.gh.GAME_WIDTH-128)/2, 128, 'hole-1');
                
                // Add score
                $rootScope.gh.p_scoreText = this.add.text(200, 100, "0", this.g_fontStyle);
                
                // Add Timer
                $rootScope.gh.p_timeAvab = this.add.text(200, 500, $rootScope.gh.p_timer, this.g_fontStyle);
                
                // Add Pause button
                this.add.button($rootScope.gh.GAME_WIDTH-200, 100, 'pauseIcon', this.managePause, this);
                
                /* bg.input.onDown.add(function(){
                    $rootScope.gh.p_score+=1;
                    $rootScope.gh.p_scoreText.setText($rootScope.gh.p_score);
                }, this); */
                
                this.time.events.loop(Phaser.Timer.SECOND, this.countDown, this);
 
            },
            managePause: function() {
                this.game.paused = true;
                var pausedText = this.add.text(100, 450, "Game paused.\nTap anywhere to continue.", this.g_fontStyle);
                this.input.onDown.add(function(){
                    pausedText.destroy();
                    this.game.paused = false;
                }, this);
            },
            update: function() {
                
                
            },
            clickScore: function(){
                console.log('sss');
                $rootScope.gh.p_score+=1;
                    $rootScope.gh.p_scoreText.setText($rootScope.gh.p_score);
            },
            countDown : function(){
                $rootScope.gh.p_timer-=1;
                if($rootScope.gh.p_timer === 0 ){this.time.events.stop()}
                $rootScope.gh.p_timeAvab.setText($rootScope.gh.p_timer);
            }
            
        };
        
        
        
        
        /* ### INIT AND RUN THE GAME ### */
        var game = new Phaser.Game($rootScope.gh.GAME_WIDTH , $rootScope.gh.GAME_HEIGHT, Phaser.AUTO, 'gameScreen', game);

        /* ### Add Game States ### */
        game.state.add('Boot', $rootScope.gh.Boot);
        game.state.add('Preload', $rootScope.gh.Preload);
        game.state.add('Menu', $rootScope.gh.Menu);
        game.state.add('Game', $rootScope.gh.Game);
        // start the Boot state
        game.state.start('Boot');
        

    });
    
})();    