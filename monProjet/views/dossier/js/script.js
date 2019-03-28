$(document).ready(function(){

	$('div.ongle:not(#menu)').hide()
	var tab=$('li')
	
	$(tab).each(function(){
		$(this).on('click', function(){
			$(tab).not(this).removeClass('active')
			$(this).addClass('active')
			var anchor = $(this).find('a').attr('href');
		 	$('.ongle:not('+anchor+')').hide()
		 	$(anchor).fadeIn()
		})
	})

})