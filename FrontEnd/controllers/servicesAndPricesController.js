main_module.controller('servicesAndPricesController',function($scope,serviceChoiseDataFactory){
    
    console.log('servicesAndPricesController loaded');
    
    $scope.navbarData = {
        
        urls:['#/','#/palvelun_valinta',"#/palvelut_ja_hinnasto",'#/yhteystiedot'],
        texts:['Etusivu','Palvelun valinta','Palvelut ja hinnasto','Yhteystiedot'],
        classes:['','','active','']
    }
    
    $scope.serviceChoiseData = [];
    
    serviceChoiseDataFactory.getAll(dataCallBack);
    
    function dataCallBack(dataArray){
        console.log('servicesAndPricesController/dataCallBack');
        
        //console.log('dataArray');
        //console.log(dataArray);
        
        $scope.serviceChoiseData = groupBy(dataArray, 'category','categoryextrainfo');
        //console.log('$scope.serviceChoiseData');
        //console.log($scope.serviceChoiseData);
    }
    
    function groupBy(arr, key, key2) {
        console.log('servicesAndPricesController/groupBy');
    
        var newArr = [],
            types = {},
            newItem, i, j, cur;
        for (i = 0, j = arr.length; i < j; i++) {
            cur = arr[i];
            if (!(cur[key] in types)) {
                types[cur[key]] = { type: cur[key], type2: cur[key2], data: [] };
                newArr.push(types[cur[key]]);
            }
            types[cur[key]].data.push(cur);
        }
        return newArr;
    }
    
    
});