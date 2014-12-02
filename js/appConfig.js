(function(){
    
    
    /* ### ### ### INIT THE APP ### ### ###  */
    var gfApp = angular.module("ghApp", [
        'ngTouch',
        'ngAnimate',
        //Custom Modules
        'appServices', // Services
        'appControllers' //Controllers
    ]).run(function($rootScope){
        
		$rootScope.userStoreData;
		$rootScope.userProfileData;
        $rootScope.game;

		//Get Store data from LocalStorage
        if(localStorage.getItem('userStoreData')){
            $rootScope.userStoreData = JSON.parse(localStorage.getItem('userStoreData'));
        }
        //Set Store data to LocalStorage if none found
        else{
            var newStoreData = {
				points : 0,
				playGrounds : ['regular_wall'],
				holes : ['regular_hole'],
				pointers : ['regular_pointer']
            };
            localStorage.setItem('userStoreData', JSON.stringify(newStoreData));
            $rootScope.userStoreData = JSON.parse(localStorage.getItem('userStoreData'));
        };
		
		
		//Get Profile data from LocalStorage
        if(localStorage.getItem('userProfileData')){
            $rootScope.userStoreData = JSON.parse(localStorage.getItem('userProfileData'));
        }
        //Set Profile data to LocalStorage if none found
        else{
            var newProfileData = {
				bestScore : 0,
				totalGames : 0,
				lifetimeCoins : 0
            };
            localStorage.setItem('userProfileData', JSON.stringify(newProfileData));
            $rootScope.userProfileData = JSON.parse(localStorage.getItem('userProfileData'));
        };
        
        
        
        
        
        
        

		
	});
    

})();