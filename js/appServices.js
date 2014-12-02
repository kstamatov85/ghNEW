(function(){
    
    var appCtrl = angular.module('appServices',[]);
    
    //GAME LOCALIZATIONS
    appCtrl.factory('globalData', function() {
        
        var data = {
            version: '1.00'
        };
        
        /* === PUBLIC ACCESS === */
        var publicData = {};
        publicData.getData = function(){
            return data;
        };
        return publicData;
    });
	
	//STORE GAME DATA
    appCtrl.factory('storeData', function($rootScope) {
		
		
		/* for(var i=0; i<data.length; i++){
			 for(j=0; j < data[i].storeItems.length; j++){
				if(data[i].storeItems[j].itemId == )
			 
			 }
		
		} */
		
		var data = [
			{
				catTitle : 'PlayGrounds',
				catId : 'playGrounds',
				storeItems : [
					{
						itemName : 'Regular Wall',
						itemId : 'regular_wall',
						itemThumbnail : 'img/wall1.jpg',
						itemPrice : 0,
						itemAvailable: true
					},
					{
						itemName : 'Dark Wood Wall',
						itemId : 'dark_wood_wall',
						itemThumbnail : 'img/wall1.jpg',
						itemPrice : 200,
						itemAvailable: false
					},
					{
						itemName : 'Stone Wall',
						itemId : 'stone_wall',
						itemThumbnail : 'img/wall1.jpg',
						itemPrice : 500,
						itemAvailable: false
					},
					{
						itemName : 'Toilet Wall 1',
						itemId : 'toilet_wall_1',
						itemThumbnail : 'img/wall1.jpg',
						itemPrice : 1000,
						itemAvailable: false
					},
					{
						itemName : 'Toilet Wall 2',
						itemId : 'toilet_wall_2',
						itemThumbnail : 'img/wall1.jpg',
						itemPrice : 2000,
						itemAvailable: false
					}
				]
			},
			
			{
				catTitle : 'Holes',
				catId : 'holes',
				storeItems : [
					{
						itemName : 'Hole 1',
						itemId : 'hole_1',
						itemThumbnail : 'img/hole1.jpg',
						itemPrice : 0,
						itemAvailable: true
					},
					{
						itemName : 'Hole 2',
						itemId : 'hole_2',
						itemThumbnail : 'img/hole1.jpg',
						itemPrice : 200,
						itemAvailable: false
					},
					{
						itemName : 'Hole 3',
						itemId : 'hole_3',
						itemPrice : 500,
						itemThumbnail : 'img/hole1.jpg',
						itemAvailable: false
					},
					{
						itemName : 'Hole 4',
						itemId : 'hole_4',
						itemThumbnail : 'img/hole1.jpg',
						itemPrice : 1000,
						itemAvailable: false
					},
					{
						itemName : 'Hole 5',
						itemId : 'hole_5',
						itemThumbnail : 'img/hole1.jpg',
						itemPrice : 2000,
						itemAvailable: false
					},
					{
						itemName : 'Hole 6',
						itemId : 'hole_6',
						itemThumbnail : 'img/hole1.jpg',
						itemPrice : 2500,
						itemAvailable: false
					},
					{
						itemName : 'Hole 7',
						itemId : 'hole_7',
						itemThumbnail : 'img/hole1.jpg',
						itemPrice : 2800,
						itemAvailable: false
					}
				]
			},
			
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
		];
		
		
		/* === PUBLIC ACCESS === */
        var publicData = {};
        publicData.getData = function(){
            return data;
        };
		
		
		
        return publicData;
	
	});
	
    //GAME SETTINGS
    appCtrl.factory('gameSettings', function() {
        
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