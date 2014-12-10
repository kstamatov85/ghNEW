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
        
        var gData = $rootScope.gh;
        
        
        //START MENU
        gData.Menu = function(game){};
        
        gData.Menu.prototype = {
            create: function(){
                // display images
                //var bg = this.add.tileSprite(0, 0, gData.GAME_WIDTH, gData.GAME_HEIGHT, 'background');
                var bg = this.add.sprite(0, 0, 'background');
                bg.width = gData.GAME_WIDTH;
                bg.height = gData.GAME_HEIGHT;
                
                //Profile Screen button
                this.add.button(100, 100, 'profileIcon', this.openProfile, this);
                //Store Screen button
                this.add.button(300, 100, 'storeIcon', this.openStore, this);
                // Start Game button
                this.add.button(gData.GAME_WIDTH-450, gData.GAME_HEIGHT-200, 'button-start', this.startGame, this, 1, 0, 2);
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
        gData.Game = function(game){
            
            // SET PARAMS
            
            // PUBLIC PARAMS
            gData.p_score = 0;
            gData.p_timer = 60;
            gData.windAngle = null;
            gData.p_scoreText = null;
            gData.p_timeAvab = null;
            gData.pointer = null;
            gData.bulletGroup = null;
            gData.hole = null;
            gData.mouth = null;
            gData.target = null;
            gData.tabZone = null;
            
            gData.windConstant = 150;
            gData.bulletSpeed = -1500;
            // PRIVATE PARAMS
            this.g_fontStyle = {font: "60px Arial", fill: "#FF0000", stroke: "#333333", strokeThickness: 5, align: "center"};
            this.g_fontStyle2 = {font: "80px Arial", fill: "#37bf0d", stroke: "#ffffff", strokeThickness: 10, align: "center"};
            
            this.SHOT_DELAY = 1300; // Delay between shoot bullets

        };
        
        gData.Game.prototype = {
        
            // CREATE GAME
            
            create: function(){
            
                //ADD GRAVITY
                
                
                // DISPLAY WORLD IMAGES
                
                var floor = new Phaser.Rectangle(0, 550, 800, 50);
                
                // Background
                var bg = this.add.tileSprite(0, 0, gData.GAME_WIDTH, gData.GAME_HEIGHT, 'gameBG-1');
                
                // Score 
                gData.p_scoreText = this.add.text(50, 50, "0", this.g_fontStyle);
                
                // Timer
                gData.p_timeAvab = this.add.text(gData.GAME_WIDTH/2, 50, '60', this.g_fontStyle);
                gData.p_timeAvab.anchor.setTo(0.5, 0.5);
                // Run timer
                this.time.events.loop(Phaser.Timer.SECOND, this.countDown, this);
                
                // Wind Arrow
                gData.windAngle = this.add.sprite(gData.GAME_WIDTH/2, 200, 'windArrow', this)
                gData.windAngle.anchor.setTo(0.5, 0.5);
                gData.windAngle.scale.setTo(0.5, 0.5);
                gData.windAngle.angle = 90;
                // Wind text value
                gData.p_windValue = this.add.text(gData.GAME_WIDTH/2, 270, '', this.g_fontStyle2);
                gData.p_windValue.anchor.setTo(0.5, 0.5);
                this.windManage(5);//Set first values
                
                // HOLE, MOUTH AND TARGET
                // Mouth image
                gData.mouth = this.add.sprite(gData.GAME_WIDTH/2, 500, 'mouth-1');
                gData.mouth.anchor.set(0.5, 0.5);
                // Hole image
                gData.hole = this.add.sprite( gData.GAME_WIDTH/2, 500, 'hole-1');
                gData.hole.anchor.setTo(0.5, 0.5);
                // Mouth size
                gData.mouth.width = gData.hole.width - 40;
                gData.mouth.height = gData.hole.height - 40;
                //Attach Mask to Mouth
                var mouth_mask = game.add.graphics(gData.GAME_WIDTH/2, 500).beginFill().drawCircle(0, 0, 200); 
                gData.mouth.mask = mouth_mask;
                // Target image
                gData.target = this.add.sprite( gData.GAME_WIDTH/2, 500, 'target');
                gData.target.anchor.setTo(0.5, 0.5);
                // Enable Physics for Target
                this.physics.arcade.enable(gData.target);
                gData.target.body.allowGravity = false;
                
                //Create bitmap layer to take tab events / pause button fix
                var bmd = this.make.bitmapData(1080, 1920);
                gData.tabZone = this.add.sprite(0, 0, bmd);
                gData.tabZone.inputEnabled = true;
                // add event listener to click/tap
                gData.tabZone.events.onInputDown.add(this.shootBullet, this);
                
                // POINTER
                gData.pointer = this.add.sprite(gData.GAME_WIDTH/2, gData.GAME_HEIGHT, 'windArrow', this);
                gData.pointer.anchor.setTo(0.5, 0.5);
                gData.pointer.scale.setTo(0.5, 0.5);
                gData.pointer.angle = 50;
                game.add.tween(gData.pointer).to({angle:-50}, 1200, Phaser.Easing.Linear.None, true, 0, 1200, true);
                
                // CREATE OBJECT POOL WITH BULLETS
                gData.bulletGroup = this.game.add.group();
                gData.bulletGroup.enableBody = true;// Enable physics for all bullets
                
                // POPULATE THE PULL WITH 5 BULLETS
                for(var i = 0; i < 5; i++) {
                    // Create each bullet and add it to the group.
                    var bullet = this.game.add.sprite(0, 0, 'ball-1');
                    bullet.width = 100;
                    bullet.height = 100;
                    gData.bulletGroup.add(bullet);
                    // Set its pivot point to the center of the bullet
                    bullet.anchor.setTo(0.5, 0.5);
                    // Set its initial state to "dead".
                    bullet.kill();
                };
                
                //this.inputEnabled = true;
                /* this.input.onDown.add(this.clickScore, this); */
                //this.events.onInputDown.add(this.clickScore, this);
                
                // Add Pause button
                this.add.button(gData.GAME_WIDTH-100, 50, 'pauseIcon', this.managePause, this);
                
            },
            
            // UPDATE GAME
            update: function() {
                
                game.physics.arcade.overlap(gData.bulletGroup, gData.target, this.targetHit, null, this);
                
                // Shoot a bullet
                /* if(this.input.activePointer.isDown) {
                    this.shootBullet();
                } */
                
            },
            
            // TIME COUNTER
            countDown : function(){
                
                //Handle with timer
                gData.p_timer-=1; //Reduce time
                gData.p_timeAvab.setText(gData.p_timer);// Show time
                this.windManage(gData.p_timer); // Update Wind value
                if(gData.p_timer === 0 ){
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
                    
                    gData.p_windValue.setText(wind);
                    game.physics.arcade.gravity.x = gData.windConstant * wind * angleVal;
                    game.add.tween(gData.windAngle).to({angle:90*angleVal}, 500, Phaser.Easing.Linear.None, true);
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
                var bullet = gData.bulletGroup.getFirstDead();

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
                bullet.reset(gData.pointer.x, gData.pointer.y);
                //bullet.rotation = gData.pointer.rotation;
                
                // Shoot it
                bullet.body.velocity.x = Math.sin(gData.pointer.rotation) * 1000; //Set Angle
                bullet.body.velocity.y = gData.bulletSpeed; //Set Speed

            },
            targetHit : function(mouth,bullet){
                bullet.kill();//REMOVE THE BULLET
                gData.p_score+=1;//increment score
                gData.p_scoreText.setText(gData.p_score);//show score
                
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
        var game = new Phaser.Game(gData.GAME_WIDTH , gData.GAME_HEIGHT, Phaser.AUTO, 'gameScreen', game);

        /* ### Add Game States ### */
        game.state.add('Boot', gData.Boot);
        game.state.add('Preload', gData.Preload);
        game.state.add('Menu', gData.Menu);
        game.state.add('Game', gData.Game);
        // start the Boot state
        game.state.start('Boot');
        

    });
    
})();    