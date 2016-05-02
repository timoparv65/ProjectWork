main_module.directive('customerLogin',function(){
   
    var directive = {};
    
    //'A' as attribute
    //'E' as element
    directive.restrict = 'AE';
    
    directive.templateUrl = '/FrontEnd/directives/customerLogin.html';
    /*
    directive.scope = {
        
        navbarData:'=' // two-way binding
    }*/
    /*
    directive.link = function(scope,elem,attrs){
		
		//$('a').first.addClass('active');
		$('a').click(function(){
			console.log('Link cliked');
			if(!this.hasClass('active'))
				this.addClass('active');
		});
	}*/
    
    return directive;
    
});
