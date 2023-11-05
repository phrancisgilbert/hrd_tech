/**
 * Fullwidth image slider
 * Support responsive design
 * exclusively build for "Devvine WordPress Theme"
 * @version 1.0
 * @author FabulousTheme
 * (c) 2012
 */

(function($){
	var o  			= new Array;
	var autoInterval= new Array;
	var slObject 	= new Array;
	var img			= new Array;
	var imgWidth	= new Array;
	var imgHeight	= new Array;
	var totalratio	= new Array;
	var destinationW	= new Array;
	var destinationH	= new Array;
	var imageLeft	= new Array;
	var imageTop	= new Array;
	var desc		= new Array;
	var descToTop	= new Array;
	var arrows	= new Array;
	var pos			= new Array;
	var timer		= new Array;
	var onPlay 		= new Array;
	var moreOne 	= new Array;
	var defaultWidth = 980,
		lHolder, h, browserWidth, containerWidth;
	
	$.fn.DevvineFullwidthSlider = $.fn.DevvineFullwidthSlider = function(options){

		init = function(ft){
			o[ft.id] = $.extend({}, $.fn.DevvineFullwidthSlider.defaults, options);
			
			slObject[ft.id] = new Array();
			img[ft.id] = new Array();
			imgWidth[ft.id] = new Array();
			imgHeight[ft.id] = new Array();
			totalratio[ft.id] = new Array();
			destinationW[ft.id] = new Array();
			destinationH[ft.id] = new Array();
			imageLeft[ft.id] = new Array();
			imageTop[ft.id] = new Array();
			
			desc[ft.id] = new Array();
			descToTop[ft.id] = new Array();
			arrows[ft.id] = new Array();
			onPlay[ft.id] = false;
			moreOne[ft.id] = false;
			lHolder = $('#'+ft.id).find('#slide_objects');
			pos[ft.id] = 0;
			

			
			if( lHolder.length ){
				
				//start the animation when window finish to load
				//webkit can't read the browser size before all finish loaded
				$(window).on('load', function(){
					
					browserWidth = $(window).width();
					lHolder.css({background : 'none'});
					
					$.each( lHolder.find('>li'), function(i,item){
						slObject[ft.id][i] = $(item);
						img[ft.id][i] = $(item).find('img');
						imgWidth[ft.id][i] = img[ft.id][i].width();
						imgHeight[ft.id][i] = img[ft.id][i].height();
						totalratio[ft.id][i] = imgHeight[ft.id][i]/imgWidth[ft.id][i];
						
						desc[ft.id][i] = $(item).find('.slide-full-description-wrap');
						descToTop[ft.id][i] = 60;
						
						arrows[ft.id][i] = desc[ft.id][i].find('.arrow_slide');
						
						img[ft.id][i].css({ opacity : 0});
						
					});
					
					$.nwSliderResize(ft);
					
					onPlay[ft.id] =true;
					slObject[ft.id][0].css({ display : 'block' });
					img[ft.id][0].stop(true, true).animate({opacity : 1.0}, o[ft.id].speed,
							function(){
								desc[ft.id][0].animate({ bottom : descToTop[ft.id][pos[ft.id]]+'px'}, o[ft.id].speed, 'easeOutExpo');
								slObject[ft.id][0].addClass('onPlay');
								onPlay[ft.id] = false;
							}
					);
					
					if( lHolder.find('>li').length > 1 ) {
						moreOne[ft.id] = true;
						$.transition(ft);
					}
					
					$.arrowAction(ft);
					$.touchDeviceAction(ft);
					
					$(window).on('resize', function(){
						$.nwSliderResize(ft);
					});
					
				});
			}
			
		};
		
		
		
		$.transition = function(ft){
			autoInterval[ft.id] = setInterval(function() { $.tp(ft) }, o[ft.id].delay);		
		};
		


		$.tp = function(ft, direction){
			
			$.nwSliderResize(ft);
			
			if(typeof(direction) == "undefined")
				pos[ft.id]++;
			else
				pos[ft.id] = direction;

			if(pos[ft.id] == slObject[ft.id].length ) {
				pos[ft.id] = 0;
			}	

			if(pos[ft.id] == -1){
				pos[ft.id] = slObject[ft.id].length-1;
			}

			onPlay[ft.id] = true;
			$('.onPlay').find('img, .slide-full-description-wrap').stop(true, true).animate({opacity : 0}, o[ft.id].speed,
				function(){
					$('.onPlay').removeClass('onPlay').css({display:'none'});
				}
			);
			
			slObject[ft.id][pos[ft.id]].css({ display : 'block'});
			img[ft.id][pos[ft.id]].stop(true, true).animate({opacity : 1.0}, o[ft.id].speed,
				function(){
					desc[ft.id][pos[ft.id]].animate({ opacity : 1, bottom : descToTop[ft.id][pos[ft.id]]+'px'}, o[ft.id].speed );
					slObject[ft.id][pos[ft.id]].addClass('onPlay');
					onPlay[ft.id] = false;
				}
			);
				
		};		
		
		$.nwSliderResize = function( ft ){
			browserWidth = $(window).width();
			h = o[ft.id].sHeight;
			containerWidth = $('#main-layout').width();
			
			if( browserWidth <  defaultWidth ){
				h = browserWidth * ( o[ft.id].sHeight / defaultWidth );	
			} else {
				h = o[ft.id].sHeight;
			}
			$('#homepage_slider').css({ height : h+'px' });

			
			$.each($('#'+ft.id+' img'), function(a, resize){

				if ((h/browserWidth) > totalratio[ft.id][a] ){
					destinationH[ft.id][a] = h;
					destinationW[ft.id][a] = h / totalratio[ft.id][a];
				} else {
					destinationW[ft.id][a] = browserWidth;
					destinationH[ft.id][a] = browserWidth * totalratio[ft.id][a];
				}
				

				imageLeft[ft.id][a] = (browserWidth-destinationW[ft.id][a])/2+'px',
				imageTop[ft.id][a] = (h-destinationH[ft.id][a])/2+'px';
				
				
				
				if( containerWidth < 350 ){
					desc[ft.id][a].css({ left : '0px' });
					descToTop[ft.id][a] = 20;
				} else {
					desc[ft.id][a].css({ left : (browserWidth-desc[ft.id][a].width())/2+'px' });
					descToTop[ft.id][a] = 60;
				}
				
				if( slObject[ft.id][a].hasClass('onPlay') ){
					desc[ft.id][a].css({ bottom : descToTop[ft.id][a]+'px' } );
				} else {
					desc[ft.id][a].css({ bottom : -1*h+'px' } );
				}

				//alert(desc[ft.id][a].height());
				
				arrows[ft.id][a].css({ backgroundColor : o[ft.id].arrowColor });
				
				
				$(resize).css({
					top: imageTop[ft.id][a],
					left: imageLeft[ft.id][a],
					width: destinationW[ft.id][a]+'px',
					height: destinationH[ft.id][a]+'px'
				});
				
			});
		
		};
		
		
		$.arrowAction = function( ft ){
			$.each($('#'+ft.id+' .arrow_slide'), function(i, link){
				$(link).hover( function(){
					$(link).stop(true,true).animate({ backgroundColor : o[ft.id].arrowHoverColor }, 300);
				}, function(){
					$(link).stop(true,true).animate({ backgroundColor : o[ft.id].arrowColor }, 300);
				});
				
				$(link).bind('click', function(e){
					e.preventDefault();
					var nextDirection = pos[ft.id]+1,
						prevDirection = pos[ft.id]-1
					
					if( moreOne[ft.id] && onPlay[ft.id] == false ){
						if( $(link).hasClass('to_next_slide') ){
							clearInterval(autoInterval[ft.id]);
							
							$.tp(ft, nextDirection);
							$.transition(ft);
						}
						
						if( $(link).hasClass('to_prev_slide') ){
							clearInterval(autoInterval[ft.id]);
							
							$.tp(ft, prevDirection);
							$.transition(ft);
						}
					}
					
				});
			});
		};
		
		
		$.touchDeviceAction = function(ft){
		
			//detect touch devices
			if( Modernizr.touch ) {
				//if object length is more than 1
				if( moreOne[ft.id] ) {
					var swipeOptions={
						swipe: function(event, direction){
							if( direction == 'right' ){
								$('#'+ft.id).find('.onPlay').find('.to_prev_slide').click();
							}
							if( direction == 'left' ){
								$('#'+ft.id).find('.onPlay').find('.to_next_slide').click();
							}
						},
						threshold:0
					};
					$('#'+ft.id).swipe( swipeOptions );
				}
			}
		
		};
		

		this.each (
			/** fire up!!!! */
			function(){ init(this); }
		);
	};
	
	$.fn.DevvineFullwidthSlider.defaults = {	
		delay : 5000, //delay between object
		speed : 600, //speed of animation
		sHeight : 500,
		arrowColor : '#5e5e5e',
		arrowHoverColor : '#d74040'
	};

})(jQuery);