function menu(){
	var visible = false;
	var animationSpeed = 300;
	var hideTime
	var hideInterval = setInterval(function(){
		menu.hide();
		menu.visible = false;
	}, 4000);
	var onMouseMove = $(document).mousemove(function() {
		if(menuVisible == false){
			menu.show();
			menu.visible = true;
		}
	});
	var onHover = $('#menu').hover(
		function(){
			menu.show();
			clearInterval(menu.hideInterval);
		}, 
		function(){
			menu.hideInterval = setInterval(function(){
			menu.hide();
			menu.visible = false;
		}, 4000);
	});
	this.show = function(){
		$('#menu').animate({
			height: '50px'
		}, this.animationSpeed, function (){
			menuVisible = true;
		});
	}
	this.hide = function(){
		$('#menu').animate({
		height: '0px'
		}, this.animationSpeed, function (){
			menuVisible = false;
		});
	}
}