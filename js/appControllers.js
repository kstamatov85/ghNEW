(function(){
    
    var appCtrl = angular.module('appControllers',[]);
    
	appCtrl.controller('profileCtrl', function($rootScope, $scope, profileData) {
		
		//GET USER DATA
		$scope.profileData = $rootScope.userProfileData
		
        //CLOSE SCREEN
        $scope.menuScreen = function(key){
            $scope.$emit('closeMenu', key);
        }
    });
	
	
    appCtrl.controller('storeCtrl', function($rootScope, $scope, storeData) {
		
		$scope.storeData = storeData.getData();
        
		$scope.userStoreData = $rootScope.userStoreData;
		
		console.log($scope.userStoreData);
        
        //CLOSE SCREEN
        $scope.menuScreen = function(key){
            $scope.$emit('closeMenu', key);
        }

    });
    
    
    
    
    
})();