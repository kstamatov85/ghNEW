(function(){
    
    var appCtrl = angular.module('appControllers',[]);
	
    
	appCtrl.controller('profileCtrl', function($rootScope, $scope, globalData, profileData) {
		
		//GET LOCALIZATION
		$scope.localization = globalData.getData();
		
		//GET USER PROFILE DATA
		$scope.profileData = profileData.getData();
		
		
        //CLOSE SCREEN
        $scope.menuScreen = function(key){
			setTimeout(function(){
				$('#profileScreen').removeClass('show');
			},100);
			
		
			
            //$scope.$emit('closeMenu', key);
			//$("#gameScreen").css({"display":"block"});
        }
    });
	
	
    appCtrl.controller('storeCtrl', function($rootScope, $scope, globalData, storeData) {
		
		//GET LOCALIZATION
		$scope.localization = globalData.getData();
		//GET ALL STORE DATA
		$scope.storeData = storeData.getData();
        //GET USER STORE DATA
		$scope.userStoreData = $rootScope.userStoreData;
		//GET USER PROFILE DATA
		$scope.profileData = $rootScope.userProfileData;

        
        //CLOSE SCREEN
        $scope.menuScreen = function(key){
			setTimeout(function(){
				$('#storeScreen').removeClass('show');
			},100);
           // $scope.$emit('closeMenu', key);
			//$("#gameScreen").css({"display":"block"});
        }

    });
    
    

})();