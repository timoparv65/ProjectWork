main_module.controller('loginDoneServicesAndPricesController',function($scope,employeeDataFactory){
    
    console.log('loginDoneServicesAndPricesController loaded');
    
    $scope.navbarData = {
        
        urls:['#/palvelun_valinta_sisaankirjauduttu',"#/palvelut_ja_hinnasto_sisaankirjauduttu",'#/yhteystiedot_sisaankirjauduttu'],
        texts:['Palvelun valinta','Palvelut ja hinnasto','Yhteystiedot'],
        classes:[,'active','']
    }
    
    $scope.serviceChoiseData = [];
    
    employeeDataFactory.getServiceChoises(dataCallBack);
    
    function dataCallBack(dataArray){
        console.log('loginDoneServicesAndPricesController/dataCallBack');
        
        //console.log('dataArray');
        //console.log(dataArray);
        
        $scope.serviceChoiseData = groupBy(dataArray, 'category','categoryextrainfo');
        //console.log('$scope.serviceChoiseData');
        //console.log($scope.serviceChoiseData);
    }
    
    function groupBy(arr, key, key2) {
        console.log('loginDoneServicesAndPricesController/groupBy');
    
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