requirejs.config({
	shim: {
		can : {
			deps : ['jQuery'],
			exports : 'can'
		}
	},
	paths:{
		styles : 'css',
		model : 'model/modelCall',
		productFixture : 'fixture/cart',
		cartViewController : 'controller/cartViewController',
		cartConfig : 'cartConfig',
	}
});

require(['model','productFixture','cartViewController','cartConfig'],function(model,productFixture,cartViewController,cartConfig){
	var pageLoad = can.Control.extend({},{
		init : function(element,options) {
			new cartViewController('body',{

			});
		}
	});
	new pageLoad();
});