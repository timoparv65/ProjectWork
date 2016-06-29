main_module.directive('customerLogin',function(){
   
    var directive = {};
    
    //'A' as attribute
    //'E' as element
    directive.restrict = 'E';
    //directive.controller = 'CustomerLoginController';
    //directive.require = 'form';
    /*
    directive.scope = {}
    
    directive.link = function(scope,elem,attrs){
		console.log('customerLogin_directive/link');
        
        $(elem).click(function(){
            console.log('directive clicked');
            console.log(elem);
        });
	}
    */
    directive.templateUrl = '/FrontEnd/directives/customerLogin.html';
    
    return directive;
    
});
