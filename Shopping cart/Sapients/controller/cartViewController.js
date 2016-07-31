define(['cartConfig'],function (cartConfig) {
	var cartViewController = can.Control.extend({
  		defaults : {
  			responseData : []
  		}
  	},
  	{
	  	init : function(elements,options) {
	  		var self = this,
	  			productDetails = [],
	  			items = 0,
	  			originalPriceToShow = false,
	  			totalPrice = 0,
	  			currency = "";
	  		can.when(cart.ProductDetails.findAll()).then(function(response){
	  			self.options.responseData = response;
	  			can.each(response,function(val,index){
	  				if (val.p_originalprice > val.p_price) {
	  					originalPriceToShow = true;
	  				};
	  				currency = val.c_currency;
	  				totalPrice = totalPrice + val.p_price;
	  				productDetails.push({
	  					"name" : val.p_variation +" "+ val.p_name,
	  					"style" : val.p_style,
	  					"color" : val.p_selected_color.name,
	  					"size" : val.p_selected_size.code,
	  					"qty" : val.p_quantity,
	  					"price" : val.p_price.toFixed(2),
	  					"o_price" : val.p_originalprice.toFixed(2),
	  					"currency" : val.c_currency,
	  					"id" : val.p_id,
	  					"originalPriceToShow" : originalPriceToShow
	  				});
	  				originalPriceToShow = false;
	  			});
	  			items = productDetails.length;
	  			estimatedTotal = totalPrice - 7;
	  			var productDetailsView = can.view("view/productDisplay.mustache",{
	  				productDetails : productDetails,
	  				items : items,
	  				totalPrice : totalPrice.toFixed(2),
	  				currency : currency,
	  				estimatedTotal : estimatedTotal.toFixed(2)
	  			});			
	  			$("#items-container").append(productDetailsView);
	  		});
	  	},
	  	'.edit click' : function(ele){
	  		var self = this,
	  			productId = $(ele).attr("data-name"),
	  			productDetailsToShow = [],
	  			sizeToShow = [],
	  			colorToShow = [];
	  			$("#edit-view").html("");
	  			can.each(self.options.responseData,function(val,index){
	  				if(val.p_id === productId){
	  					productDetailsToShow.push({
	  						"name" : val.p_variation +" "+ val.p_name,
	  						"currency" : val.c_currency,
	  						"price" : val.p_price,
	  						"fname" : val.p_name,
	  						"qty" : val.p_quantity,
	  						"id" : val.p_id
	  					});
	  					can.each(val.p_available_options.sizes,function(valS,indexS){
	  						sizeToShow.push({
	  							"size" : valS.name
	  						});
	  					});
	  					can.each(val.p_available_options.colors,function(valC,indexC){
	  						colorToShow.push({
	  							"color" : valC.name
	  						});
	  					});
	  				}
	  			});
	  			var productDetailsEdit = can.view("view/productDisplayEdit.mustache",{
	  					productDetailsToShow : productDetailsToShow,
	  					sizeToShow : sizeToShow,
	  					colorToShow : colorToShow
	  			});	
	  			$("#mask").css("height",$(document ).height());
	  			$("#edit-view").append(productDetailsEdit);
	  			$("#items-edit").removeClass("edit-disable");
	  			$("#items-edit").addClass("edit-enable");
	  			$("#mask").removeClass("mask-disable");
	  			$("#mask").addClass("mask-enable");
	  	},

	  	'.size-list click' : function(ele){
	  		$("#sizeSel").text($(ele).text());
	 	},

	  	'.edit-btn-div click' : function(){
	  		var pIdEdit = $(".edit-btn").attr("data-pid"),
	  			sizeSelected = $("#sizeSel").text();

	  		if(sizeSelected === "small"){
	  			$('#'+pIdEdit).html("S");
	  		}
	  		else if(sizeSelected === "medium"){
				$('#'+pIdEdit).html("M");
	  		}
	  		else if(sizeSelected === "large"){
	  			$('#'+pIdEdit).html("L");
	  		}
	  		else if(sizeSelected === "extra large"){
	  			$('#'+pIdEdit).html("XL");
	  		}
	  		$( ".close-btn" ).trigger( "click" );
	  	},

	  	'.close-btn click' : function(){
	  		$("#items-edit").addClass("edit-disable");
	  		$("#items-edit").removeClass("edit-enable");
	  		$("#mask").addClass("mask-disable");
	  		$("#mask").removeClass("mask-enable");
	  	}
	});
	return cartViewController;
});




