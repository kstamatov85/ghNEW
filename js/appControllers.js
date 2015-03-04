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
		
		//CLOSE SCREEN
        $scope.clickItem = function(available, selected, storeItemId, category, itemPrice){
			console.log(available);
			if(available){
				if(selected == storeItemId){
					return
				};
				$rootScope.userStoreData[category].selectedItem = storeItemId;
				$scope.userStoreData[category].selectedItem = storeItemId;
				
				
			}else{
					//console.log($rootScope.userProfileData.points);
					//console.log(itemPrice);
					
				if($rootScope.userProfileData.points >= itemPrice){
					var buy = confirm("Do you want to buy it?");
					
					if(buy){
						$rootScope.userProfileData.points-=itemPrice;
						
						$rootScope.userStoreData[category][storeItemId]=true;
						
						console.log($rootScope.userStoreData[category]);
						console.log(storeItemId);
						$rootScope.userStoreData[category].selectedItem = storeItemId;
						$scope.userStoreData[category].selectedItem = storeItemId;
						
						
					}
				}else{
					alert('You have no points for that item!');
				}
				
				
				
				
			}
			
			
        }
		
		
		function updateData(scope){
			
			
		}

    });
    
    

})();