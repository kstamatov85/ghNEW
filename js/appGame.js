(function(){
    
    var appGame = angular.module('gameLogic',[]);
    
    appGame.controller('gameCtrl', function($rootScope, $scope) {
    

       var game = new Phaser.Game(1080, 1920, Phaser.AUTO, 'gameScreen', game);

        /* ### Add Game States ### */
        game.state.add('Boot', $rootScope.gh.Boot);
        game.state.add('Preload', $rootScope.gh.Preload);
        //game.state.add('mainMenu', gh.mainMenu);
        //game.state.add('Game', gh.Game);
        // start the Boot state
        game.state.start('Boot');
        

    });
    
})();    