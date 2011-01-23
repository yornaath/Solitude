define(["jquery"],
	function animationHandler() {
		//START CODE
		return{
		}
	}
);




var menuVisible = false;
var animationSpeed = 300;
var hideTime;

var menuHideInterval = setInterval(function(){
	menuHide();
	menuVisible = false;
}, 4000);

var menuOnMouseMove = $(document).mousemove(function() {
	if(menuVisible == false){
		menuShow();
		menuVisible = true;
	}
});

$('#menu').hover(
	function(){
		menuShow();
		clearInterval(menuHideInterval);
	}, 
	function(){
		menuHideInterval = setInterval(function(){
		menuHide();
		menuVisible = false;
	}, 4000);
});

function menuShow(){
	$('#menu').animate({
		height: '50px'
	}, this.animationSpeed, function (){
		menuVisible = true;
	});
}

function menuHide(){
	$('#menu').animate({
	height: '0px'
	}, this.animationSpeed, function (){
		menuVisible = false;
	});
}