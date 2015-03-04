(function(){
    
    var appServ = angular.module('appServices',[]);
    
    
    /* ### GLOBAL DATA ### */
    appServ.factory('globalData', function() {
        
        var data = {
            version: '1.00',
			storeLabel : 'GLORY STORE',
			profileLabel : 'GLORY PROFILE',
			backLabel : 'BACK TO MENU'
        };
        
        /* === PUBLIC ACCESS === */
        var publicData = {};
        publicData.getData = function(){
            return data;
        };
        return publicData;
    });
	
	/* ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### */
	
	/* ### PROFILE DATA ### */
    appServ.factory('profileData', function($rootScope) {
		
		var data = [
			{title : 'POINTS:', value : $rootScope.userProfileData.points},
			{title : 'LIFETIME POINTS:', value : $rootScope.userProfileData.lifetimePoints},
			{title : 'BEST SCORE:', value : $rootScope.userProfileData.bestScore},
			{title : 'TOTAL GAMES:', value : $rootScope.userProfileData.totalGames}
		];
		
		/* === PUBLIC ACCESS === */
        var publicData = {};
        publicData.getData = function(){
            return data;
        };

        return publicData;
	
	});
	
	
	
    /* ### STORE DATA ### */
    appServ.factory('storeData', function($rootScope) {
		
		
		var data = [
		
			
			// MOUTHS
			{
				catTitle : 'Mouths',
				catId : 'Mouths',
				storeItems : [
					{
						itemName : 'Mouth 1',
						itemId : 'mouth-1',
						itemThumbnail : 'img/mouths/mouth-1.jpg',
						itemPrice : 0
					},
					{
						itemName : 'Mouth 2',
						itemId : 'mouth-2',
						itemThumbnail : 'img/mouths/mouth-2.jpg',
						itemPrice : 200
					},
					{
						itemName : 'Mouth 3',
						itemId : 'mouth-3',
						itemThumbnail : 'img/mouths/mouth-3.jpg',
						itemPrice : 500
					},
					{
						itemName : 'Mouth 4',
						itemId : 'mouth-4',
						itemThumbnail : 'img/mouths/mouth-4.jpg',
						itemPrice : 1000
					},
					{
						itemName : 'Mouth 5',
						itemId : 'mouth-5',
						itemThumbnail : 'img/mouths/mouth-5.jpg',
						itemPrice : 2000
					}
				]
			},
			
			// PLAY GROUNDS
			{
				catTitle : 'PlayGrounds',
				catId : 'PlayGrounds',
				storeItems : [
					{
						itemName : 'wall 1',
						itemId : 'wallBG-1',
						itemThumbnail : 'img/walls/wallBG-1.jpg',
						itemPrice : 0
					},
					{
						itemName : 'wall 2',
						itemId : 'wallBG-2',
						itemThumbnail : 'img/walls/wallBG-2.jpg',
						itemPrice : 200
					},
					{
						itemName : 'wall 3',
						itemId : 'wallBG-3',
						itemThumbnail : 'img/walls/wallBG-3.jpg',
						itemPrice : 500
					},
					{
						itemName : 'wall 4',
						itemId : 'wallBG-4',
						itemThumbnail : 'img/walls/wallBG-4.jpg',
						itemPrice : 1000
					},
					{
						itemName : 'wall 5',
						itemId : 'wallBG-5',
						itemThumbnail : 'img/walls/wallBG-5.jpg',
						itemPrice : 2000
					},
					{
						itemName : 'wall 6',
						itemId : 'wallBG-6',
						itemThumbnail : 'img/walls/wallBG-6.jpg',
						itemPrice : 2000
					}
				]
			}
			
			/*
			{
				catTitle : 'Pointers',
				catId : 'pointers',
				storeItems : [
					{
						itemName : 'Pointer 1',
						itemId : 'pointer_1',
						itemThumbnail : 'img/regular_wall.jpg',
						itemPrice : 0,
						itemAvailable: true
					},
					{
						itemName : 'Pointer 2',
						itemId : 'p2',
						itemThumbnail : 'img/regular_wall.jpg',
						itemPrice : 200,
						itemAvailable: false
					},
					{
						itemName : 'Pointer 3',
						itemId : 'p3',
						itemPrice : 500,
						itemThumbnail : 'img/regular_wall.jpg',
						itemAvailable: false
					},
					{
						itemName : 'Pointer 4',
						itemId : 'p4',
						itemThumbnail : 'img/regular_wall.jpg',
						itemPrice : 1000,
						itemAvailable: false
					},
					{
						itemName : 'Pointer 5',
						itemId : 'p5',
						itemThumbnail : 'img/regular_wall.jpg',
						itemPrice : 2000,
						itemAvailable: false
					}
				]
			}
		 */
		
		];
		
		
		/* === PUBLIC ACCESS === */
        var publicData = {};
        publicData.getData = function(){
            return data;
        };

        return publicData;
	
	});
	
	
	
	
	
    /* ### ### ### ### ### ### ### ### ### ### ### ### ### ### ### */
    
    //GAME SETTINGS
    appServ.factory('gameSettings', function() {
        
        var gameSettings = {
            gameTime : 60000, //game time ms
            throwPause : 1000, //ms
            windRange : 10, //Game constant
            gunRotation : 120, //Percent
            gunSpeed : 1000, //ms speed
            bonus_1 : 2000, // 3 correct shots
            bonus_2 : 5000 // 5 correct shots
        };
        
        /* === PUBLIC ACCESS === */
        var publicData = {};
        publicData.getData = function(){
            return gameSettings;
        };
        return publicData;
    });
    
    
})();