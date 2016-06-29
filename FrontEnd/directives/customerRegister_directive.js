main_module.directive('customerRegister',function(){
   
    var directive = {};
    
    //'A' as attribute
    //'E' as element
    directive.restrict = 'E';
   
    directive.templateUrl = '/FrontEnd/directives/customerRegister.html';
    
    return directive;
    
});
