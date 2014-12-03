(function(){
    
    var appCtrl = angular.module('appControllers',[]);
    
    /* appCtrl.controller('globalCtrl', function($rootScope, $scope, globalData) {
        
        
        $scope.data = globalData.getData();
    }); */
    

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