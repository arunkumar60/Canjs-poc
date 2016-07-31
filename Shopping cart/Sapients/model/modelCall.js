define(['cartConfig'],function (cartConfig) {
	var url = cartConfig.URL;
	can.Model.extend('cart.ProductDetails', {
		findAll : function(){
			return $.ajax({
				url : url.productDetails,
				dataType: 'json',
				type: 'GET',
				data: "",
				success: function(tsJson,textStatus,jqXHR) {
					console.log("pass");
				},
				error: function(){
					console.log("fail");
				}
			});
		}
	}, {})
});
	
