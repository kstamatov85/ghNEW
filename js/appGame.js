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
            
            // SET PARAMS
            
            // PUBLIC PARAMS
            $rootScope.gh.p_score = 0;
            $rootScope.gh.p_timer = 60;
            $rootScope.gh.windAngle = null;
            $rootScope.gh.p_scoreText = null;
            $rootScope.gh.p_timeAvab = null;
            $rootScope.gh.pointer = null;
            $rootScope.gh.bulletGroup = null;
            $rootScope.gh.hole = null;
            $rootScope.gh.mouth = null;
            $rootScope.gh.target = null;
            $rootScope.gh.tabZone = null;
            
            $rootScope.gh.windConstant = 150;
            $rootScope.gh.bulletSpeed = -1500;
            // PRIVATE PARAMS
            this.g_fontStyle = {font: "60px Arial", fill: "#FF0000", stroke: "#333333", strokeThickness: 5, align: "center"};
            this.g_fontStyle2 = {font: "80px Arial", fill: "#37bf0d", stroke: "#ffffff", strokeThickness: 10, align: "center"};
            
            this.SHOT_DELAY = 1300; // Delay between shoot bullets

        };
        
        $rootScope.gh.Game.prototype = {
        
            // CREATE GAME
            
            create: function(){
            
                //ADD GRAVITY
                this.physics.startSystem(Phaser.Physics.ARCADE);
                this.physics.arcade.gravity.y = 0;
                this.physics.arcade.gravity.x = 0;
                
                // DISPLAY WORLD IMAGES
                
                var floor = new Phaser.Rectangle(0, 550, 800, 50);
                
                // Background
                var bg = this.add.tileSprite(0, 0, $rootScope.gh.GAME_WIDTH, $rootScope.gh.GAME_HEIGHT, 'gameBG-1');
                
                // Score 
                $rootScope.gh.p_scoreText = this.add.text(50, 50, "0", this.g_fontStyle);
                
                // Timer
                $rootScope.gh.p_timeAvab = this.add.text($rootScope.gh.GAME_WIDTH/2, 50, '60', this.g_fontStyle);
                $rootScope.gh.p_timeAvab.anchor.setTo(0.5, 0.5);
                // Run timer
                this.time.events.loop(Phaser.Timer.SECOND, this.countDown, this);
                
                // Wind Arrow
                $rootScope.gh.windAngle = this.add.sprite($rootScope.gh.GAME_WIDTH/2, 200, 'windArrow', this)
                $rootScope.gh.windAngle.anchor.setTo(0.5, 0.5);
                $rootScope.gh.windAngle.scale.setTo(0.5, 0.5);
                $rootScope.gh.windAngle.angle = 90;
                // Wind text value
                $rootScope.gh.p_windValue = this.add.text($rootScope.gh.GAME_WIDTH/2, 270, '', this.g_fontStyle2);
                $rootScope.gh.p_windValue.anchor.setTo(0.5, 0.5);
                this.windManage(5);//Set first values
                
                // HOLE, MOUTH AND TARGET
                // Mouth image
                $rootScope.gh.mouth = this.add.sprite($rootScope.gh.GAME_WIDTH/2, 500, 'mouth-1');
                $rootScope.gh.mouth.anchor.set(0.5, 0.5);
                // Hole image
                $rootScope.gh.hole = this.add.sprite( $rootScope.gh.GAME_WIDTH/2, 500, 'hole-1');
                $rootScope.gh.hole.anchor.setTo(0.5, 0.5);
                // Mouth size
                $rootScope.gh.mouth.width = $rootScope.gh.hole.width - 40;
                $rootScope.gh.mouth.height = $rootScope.gh.hole.height - 40;
                //Attach Mask to Mouth
                var mouth_mask = game.add.graphics($rootScope.gh.GAME_WIDTH/2, 500).beginFill().drawCircle(0, 0, 200); 
                $rootScope.gh.mouth.mask = mouth_mask;
                // Target image
                $rootScope.gh.target = this.add.sprite( $rootScope.gh.GAME_WIDTH/2, 500, 'target');
                $rootScope.gh.target.anchor.setTo(0.5, 0.5);
                // Enable Physics for Target
                this.physics.arcade.enable($rootScope.gh.target);
                $rootScope.gh.target.body.allowGravity = false;
                
                //Create bitmap layer to take tab events / pause button fix
                var bmd = this.make.bitmapData(1080, 1920);
                $rootScope.gh.tabZone = this.add.sprite(0, 0, bmd);
                $rootScope.gh.tabZone.inputEnabled = true;
                // add event listener to click/tap
                $rootScope.gh.tabZone.events.onInputDown.add(this.shootBullet, this);
                
                // POINTER
                $rootScope.gh.pointer = this.add.sprite($rootScope.gh.GAME_WIDTH/2, $rootScope.gh.GAME_HEIGHT, 'windArrow', this);
                $rootScope.gh.pointer.anchor.setTo(0.5, 0.5);
                $rootScope.gh.pointer.scale.setTo(0.5, 0.5);
                $rootScope.gh.pointer.angle = 50;
                game.add.tween($rootScope.gh.pointer).to({angle:-50}, 1200, Phaser.Easing.Linear.None, true, 0, 1200, true);
                
                // CREATE OBJECT POOL WITH BULLETS
                $rootScope.gh.bulletGroup = this.game.add.group();
                $rootScope.gh.bulletGroup.enableBody = true;// Enable physics for all bullets
                
                // POPULATE THE PULL WITH 5 BULLETS
                for(var i = 0; i < 5; i++) {
                    // Create each bullet and add it to the group.
                    var bullet = this.game.add.sprite(0, 0, 'ball-1');
                    bullet.width = 100;
                    bullet.height = 100;
                    $rootScope.gh.bulletGroup.add(bullet);
                    // Set its pivot point to the center of the bullet
                    bullet.anchor.setTo(0.5, 0.5);
                    // Set its initial state to "dead".
                    bullet.kill();
                };
                
                //this.inputEnabled = true;
                /* this.input.onDown.add(this.clickScore, this); */
                //this.events.onInputDown.add(this.clickScore, this);
                
                // Add Pause button
                this.add.button($rootScope.gh.GAME_WIDTH-100, 50, 'pauseIcon', this.managePause, this);
                
            },
            
            // UPDATE GAME
            update: function() {
                
                game.physics.arcade.overlap($rootScope.gh.bulletGroup, $rootScope.gh.target, this.targetHit, null, this);
                
                // Shoot a bullet
                /* if(this.input.activePointer.isDown) {
                    this.shootBullet();
                } */
                
            },
            
            // TIME COUNTER
            countDown : function(){
                
                //Handle with timer
                $rootScope.gh.p_timer-=1; //Reduce time
                $rootScope.gh.p_timeAvab.setText($rootScope.gh.p_timer);// Show time
                this.windManage($rootScope.gh.p_timer); // Update Wind value
                if($rootScope.gh.p_timer === 0 ){
                    //STOP TIME AND GAME OVER
                    this.time.events.stop()
                }
            },
            
            // WIND MANAGER
            windManage : function(checkVal){
                //Change wind on every 5 secs
                if(checkVal % 5 === 0 ){ //RUN on every 5 sec
                    var angleVal = Math.cos( Math.PI * Math.round( Math.random() ) ); //1 or -1
                    var wind = Math.floor(Math.random() * 10 ); // 0 to 10
                    
                    $rootScope.gh.p_windValue.setText(wind);
                    game.physics.arcade.gravity.x = $rootScope.gh.windConstant * wind * angleVal;
                    game.add.tween($rootScope.gh.windAngle).to({angle:90*angleVal}, 500, Phaser.Easing.Linear.None, true);
                }
            },
            
            shootBullet : function() {
                // Enforce a short delay between shots by recording
                // the time that each bullet is shot and testing if
                // the amount of time since the last shot is more than
                // the required delay.
                if (this.lastBulletShotAt === undefined){ 
                    this.lastBulletShotAt = 0
                }    
                //console.log(this.SHOT_DELAY);
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
                
                // Shoot it
                bullet.body.velocity.x = Math.sin($rootScope.gh.pointer.rotation) * 1000; //Set Angle
                bullet.body.velocity.y = $rootScope.gh.bulletSpeed; //Set Speed

            },
            targetHit : function(mouth,bullet){
                bullet.kill();//REMOVE THE BULLET
                $rootScope.gh.p_score+=1;//increment score
                $rootScope.gh.p_scoreText.setText($rootScope.gh.p_score);//show score
                
            },
            // PAUSE FUNCTION
            managePause: function() {
                this.game.paused = true;
                var pausedText = this.add.text(100, 450, "Game paused.\nTap anywhere to continue.", this.g_fontStyle);
                this.input.onDown.add(function(){
                    pausedText.destroy();
                    this.game.paused = false;
                }, this);
            },
            clickScore : function(){ //CURRENTLY NOT USED
                console.log('sss');
            },
            
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