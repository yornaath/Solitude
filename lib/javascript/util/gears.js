define(['jquery'],function($){
	
	return function Gears(){
		var self = this;
		
		self.systemPrompt = function(message, options){
		  options['cancel'] = function(){
				$('.prompt').fadeOut(400, function(){
					$(this).remove()
				})};
			$("body").append("<div class='prompt'><div class='prompt_message'><p>"+message+"</p><div class='options'></div></div></div");
			$('.prompt').fadeIn(400);
			$(".prompt_message .options").append("<table><tr></tr></table>");
			var optionsContainer = $('.prompt .options tr');
			for(key in options){
				optionsContainer.append("<td id='"+key+"'>"+key+"</td>");
				$("#"+key).click(function(){
					options[$(this).attr('id')]();
				});
			}
		} 
	}
	
});