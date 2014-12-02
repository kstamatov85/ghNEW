(function(){
    
    var appCtrl = angular.module('appControllers',[]);
    
    appCtrl.controller('globalCtrl', function($rootScope, $scope, globalData) {
        $scope.showProfile = false;
        $scope.showStore = false;
        
        $scope.data = globalData.getData();
    });
    
    
    appCtrl.controller('gameCtrl', function($rootScope, $scope) {
        
        
        
        var game = new Phaser.Game(320, 480, Phaser.AUTO, 'gameScreen', game);
        
        // add game states
        game.state.add('Boot', gh.Boot);
        game.state.add('Preload', gh.Preload);
        game.state.add('mainMenu', gh.mainMenu);
        //game.state.add('Game', gh.Game);
        // start the Boot state
        game.state.start('Boot');
        
        
        
        

    });
    
    
    appCtrl.controller('storeCtrl', function($rootScope, $scope, storeData) {
        $scope.points = $rootScope.userStoreData.points;
		
		$scope.avaItems = $rootScope.userStoreData;
		
		$scope.storeData = storeData.getData();

    });
    
    appCtrl.controller('profileCtrl', function($rootScope, $scope, storeData) {
        $scope.points = $rootScope.userStoreData.points;
		
		$scope.avaItems = $rootScope.userStoreData;
		
		$scope.storeData = storeData.getData();

    });
    
    
    

})();