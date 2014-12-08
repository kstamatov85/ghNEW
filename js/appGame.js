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
                this.load.image('windArrow', 'img/arrowImg.png');
                //Load pointers
                
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
            $rootScope.gh.windAngle = null;
            $rootScope.gh.p_scoreText = null;
            $rootScope.gh.p_timeAvab = null;
            $rootScope.gh.pointer = null;
            $rootScope.gh.bulletGroup = null;
            $rootScope.gh.hole = null;
            $rootScope.gh.mouth = null;
            
            
            //PRIVATE PARAMS
            this.g_fontStyle = {font: "60px Arial", fill: "#FF0000", stroke: "#333333", strokeThickness: 5, align: "center"};
            
            
            this.SHOT_DELAY = 1200; // milliseconds (10 bullets/second)
            this.BULLET_SPEED = 500; // pixels/second
            
        
        };
        
        $rootScope.gh.Game.prototype = {
            create: function(){
                //Add gravity
                this.physics.startSystem(Phaser.Physics.ARCADE);
                this.physics.arcade.gravity.y = 0;
                //this.physics.arcade.gravity.x = 0;
                
                // DISPLAY WORLD IMAGES
                
                // Background
                var bg = this.add.tileSprite(0, 0, $rootScope.gh.GAME_WIDTH, $rootScope.gh.GAME_HEIGHT, 'gameBG-1');
                
                // Score 
                $rootScope.gh.p_scoreText = this.add.text(50, 50, "0", this.g_fontStyle);
                
                // Timer
                $rootScope.gh.p_timeAvab = this.add.text($rootScope.gh.GAME_WIDTH/2, 50, $rootScope.gh.p_timer, this.g_fontStyle);
                $rootScope.gh.p_timeAvab.anchor.setTo(0.5, 0.5);
                this.time.events.loop(Phaser.Timer.SECOND, this.countDown, this);
                
                // Add Pause button
                this.add.button($rootScope.gh.GAME_WIDTH-100, 50, 'pauseIcon', this.managePause, this);
                
                // Wind Arrow
                $rootScope.gh.windAngle = this.add.sprite($rootScope.gh.GAME_WIDTH/2, 200, 'windArrow', this);
                $rootScope.gh.windAngle.anchor.setTo(0.5, 0.5);
                $rootScope.gh.windAngle.scale.setTo(0.5, 0.5);
                $rootScope.gh.windAngle.angle = 90;

                
                //HOLE AND MOUTH
                //$rootScope.gh.mouth = this.add.sprite($rootScope.gh.GAME_WIDTH/2, 500, 'mouth-1').anchor.set(0.5, 0.5);
                //$rootScope.gh.mouth.anchor.set(0.5, 0.5);
                //$rootScope.gh.hole = this.add.sprite( $rootScope.gh.GAME_WIDTH/2, 500, 'hole-1').anchor.set(0.5, 0.5);
                //$rootScope.gh.hole.anchor.setTo(0.5, 0.5);
                //Mouth size
              //  $rootScope.gh.mouth.width = $rootScope.gh.hole - 70;
               // $rootScope.gh.mouth.height = $rootScope.gh.hole - 70;
                // Enable Phycics for mouth
              //  this.physics.arcade.enable($rootScope.gh.mouth);
               

               var bmd = this.make.bitmapData(128, 128);
                //creates the BitmapData object, you can use it to create figures:
               bmd.alphaMask('mouth-1', 'ball-1');
               
               this.add.sprite($rootScope.gh.GAME_WIDTH/2, 500, bmd).anchor.set(0.5, 0.5);
               
                //ADD MASK TO THE MOUTH
                /* var graphics = game.add.graphics($rootScope.gh.GAME_WIDTH/2, 500);
                graphics.beginFill();
                graphics.drawCircle(0, 0,300); */
               // mouth.mask = graphics;
                

                
                
                
                
                // POINTER
                $rootScope.gh.pointer = this.add.sprite($rootScope.gh.GAME_WIDTH/2, $rootScope.gh.GAME_HEIGHT, 'windArrow', this);
                $rootScope.gh.pointer.anchor.setTo(0.5, 0.5);
                $rootScope.gh.pointer.scale.setTo(0.5, 0.5);
                $rootScope.gh.pointer.angle = 0;
               // game.add.tween($rootScope.gh.pointer).to({angle:-50}, 1200, Phaser.Easing.Linear.None, true, 0, 1200, true);
                // CREATE OBJECT POOL WITH BULLETS
                $rootScope.gh.bulletGroup = this.game.add.group();
                $rootScope.gh.bulletGroup.enableBody = true;
                // POPULATE THE PULL WITH 5 BULLETS
                for(var i = 0; i < 5; i++) {
                    // Create each bullet and add it to the group.
                    var bullet = this.game.add.sprite(0, 0, 'ball-1');
                    $rootScope.gh.bulletGroup.add(bullet);
                    // Set its pivot point to the center of the bullet
                    bullet.anchor.setTo(0.5, 0.5);
                    // Enable physics on the bullet
                    //this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
                    // Set its initial state to "dead".
                    bullet.kill();
                }
                
                
                
                
                
                this.inputEnabled = true;
                /* this.input.onDown.add(this.clickScore, this); */
                //this.events.onInputDown.add(this.clickScore, this);
 
            },
            update: function() {
                
                game.physics.arcade.overlap($rootScope.gh.bulletGroup, $rootScope.gh.hole, this.collectStar, null, this);
                
                // Shoot a bullet
                if(this.input.activePointer.isDown) {
                    this.shootBullet();
                }
                

            },
            collectStar : function(mouth,bullet){
                bullet.kill();
                console.log('aaaa');
            },
            
            // MANAGE PAUSE FUNCTION
            managePause: function() {
                this.game.paused = true;
                var pausedText = this.add.text(100, 450, "Game paused.\nTap anywhere to continue.", this.g_fontStyle);
                this.input.onDown.add(function(){
                    pausedText.destroy();
                    this.game.paused = false;
                }, this);
            },
            // TIME COUNTER
            countDown : function(){
            
                //Change wind on every 5 secs
                if($rootScope.gh.p_timer % 5 === 0 ){
                    var angleVal = Math.cos( Math.PI * Math.round( Math.random() ) );
                    game.add.tween($rootScope.gh.windAngle).to({angle:90*angleVal}, 500, Phaser.Easing.Linear.None, true);
                }
                
                //Handle with timer
                $rootScope.gh.p_timer-=1;
                if($rootScope.gh.p_timer === 0 ){this.time.events.stop()}
                $rootScope.gh.p_timeAvab.setText($rootScope.gh.p_timer);
            },
            clickScore: function(){ //CURRENTLY NOT USED
                console.log('sss');
               
            },
            shootBullet : function() {
                // Enforce a short delay between shots by recording
                // the time that each bullet is shot and testing if
                // the amount of time since the last shot is more than
                // the required delay.
                if (this.lastBulletShotAt === undefined){ 
                    this.lastBulletShotAt = 0
                }    
                if (this.time.now - this.lastBulletShotAt < this.SHOT_DELAY){
                    return;
                };    
                this.lastBulletShotAt = this.game.time.now;

                // Get a dead bullet from the pool
                var bullet = $rootScope.gh.bulletGroup.getFirstDead();

                // If there aren't any bullets available then don't shoot
                if (bullet === null || bullet === undefined){
                    return;
                };
                // Revive the bullet
                // This makes the bullet "alive"
                bullet.revive();

                // Bullets should kill themselves when they leave the world.
                // Phaser takes care of this for me by setting this flag
                // but you can do it yourself by killing the bullet if
                // its x,y coordinates are outside of the world.
                bullet.checkWorldBounds = true;
                bullet.outOfBoundsKill = true;

                // Set the bullet position to the gun position.
                bullet.reset($rootScope.gh.pointer.x, $rootScope.gh.pointer.y);
                //bullet.rotation = $rootScope.gh.pointer.rotation;
                
                bullet.body.velocity.x = Math.sin($rootScope.gh.pointer.rotation) * 1000;
                bullet.body.velocity.y = -1200;
                // Shoot it
                //bullet.body.velocity.x = 0;
                //bullet.body.velocity.y = -1250;
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