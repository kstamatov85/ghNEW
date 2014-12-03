(function(){
    
    var appCtrl = angular.module('appControllers',[]);
    
    appCtrl.controller('storeCtrl', function($rootScope, $scope, storeData) {
        $scope.points = $rootScope.userStoreData.points;
		
		$scope.avaItems = $rootScope.userStoreData;
		
		$scope.storeData = storeData.getData();

    });
    
    appCtrl.controller('profileCtrl', function($rootScope, $scope, storeData) {
        $scope.points = $rootScope.userStoreData.points;
		
		$scope.avaItems = $rootScope.userStoreData;
		
		$scope.storeData = storeData.getData();
        
        $scope.menuScreen = function(key){
            $scope.$emit('closeMenu', key);
        }
        

    });
    
    

})();