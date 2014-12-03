(function(){
    
    
    /* ### ### ### INIT THE APP ### ### ###  */
    var gfApp = angular.module("ghApp", [
        'ngTouch',
        'ngAnimate',
        //Custom Modules
        'appServices', // Services
        'appControllers',
        'gameLogic'

    ]).run(function($rootScope){
        
        /* ### ### SET/LOAD USER DATA ### ###  */
		$rootScope.userStoreData;
		$rootScope.userProfileData;
        
		//STORE DATA
        if(localStorage.getItem('storeData')){
            $rootScope.userStoreData = JSON.parse(localStorage.getItem('storeData'));
        }
        else{
            var newStoreData = {
				points : 0,
				playGrounds : ['regular_wall'],
				holes : ['regular_hole'],
				pointers : ['regular_pointer']
            };
            localStorage.setItem('storeData', JSON.stringify(newStoreData));
            $rootScope.userStoreData = JSON.parse(localStorage.getItem('storeData'));
        };
		
		
        //PROFILE DATA
        if(localStorage.getItem('profileData')){
            $rootScope.userStoreData = JSON.parse(localStorage.getItem('profileData'));
        }
        else{
            var newProfileData = {
				bestScore : 0,
				totalGames : 0,
				lifetimeCoins : 0
            };
            localStorage.setItem('userProfileData', JSON.stringify(newProfileData));
            $rootScope.userProfileData = JSON.parse(localStorage.getItem('profileData'));
        };
        
        
        /* ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### */
        
		
	});
    

})();