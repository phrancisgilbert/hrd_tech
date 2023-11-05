/**
 * Custom slide
 * Support responsive design
 * exclusively build for "Devvine WordPress Theme"
 * @version 1.0
 * @author FabulousTheme
 * (c) 2012
 */
 
( function($){

	var ao = new Array;
	var slObj = new Array;
	var moveHeight = new Array;
	var moveWidth = new Array;
	var marginL = new Array;
	var marginR = new Array;
	var firstPos = new Array;
	var currentPos = new Array;
	var countPos = new Array;
	var markUp = '<div id="{unique_id}" class="ft_accordion_wrap"><div class="ft_accordion_inner">{acc_object}</div></div>';
	var slideButton = '<a id="{next_button_id}" class="acc_next" href="#"></a><a id="{prev_button_id}" class="acc_prev" href="#"></a>';
	var sectionTitle = '<div class="section-title"/>';
	var totalPos = new Array;
	var moveBy = new Array;
	var theMaster = new Array;
	var slObjMarkup = new Array;

	$.fn.DevvineSlide = $.fn.DevvineSlide = function(options){
		init = function(sl){
			ao[sl.id] = $.extend({}, $.fn.DevvineSlide.defaults, options);

			slObj[sl.id] = new Array();
			moveHeight[sl.id] = new Array();
			moveWidth[sl.id] = 0;
			marginL[sl.id] = 0;
			marginR[sl.id] = 0;
			firstPos[sl.id] = 0;
			currentPos[sl.id] = 0;
			countPos[sl.id] = 0;
			totalPos[sl.id] = 0;
			moveBy[sl.id] = 0;

			slObjMarkup[sl.id] = markUp.replace(/{unique_id}/g, 'wraper-'+sl.id ).replace(/{acc_object}/g, $('#'+sl.id).parent().html() );
			$('#'+sl.id).parent().html( slObjMarkup[sl.id] );
			
			theMaster[sl.id] = $('#wraper-'+sl.id);


			if( theMaster[sl.id].find('.section-title').length ){
				theMaster[sl.id].find('.section-title').append( slideButton.replace(/{next_button_id}/g, 'next-button-'+sl.id ).replace(/{prev_button_id}/g, 'prev-button-'+sl.id ) );
			} else if( theMaster[sl.id].find('.sidebar-title').length ){
				theMaster[sl.id].find('.sidebar-title').append( slideButton.replace(/{next_button_id}/g, 'next-button-'+sl.id ).replace(/{prev_button_id}/g, 'prev-button-'+sl.id ) );
			} else if( theMaster[sl.id].find('.footer_widget_title').length ) {
				theMaster[sl.id].find('.footer_widget_title').append( slideButton.replace(/{next_button_id}/g, 'next-button-'+sl.id ).replace(/{prev_button_id}/g, 'prev-button-'+sl.id ) );
			}else {
				$(sectionTitle).insertBefore( $('#'+sl.id) );
				theMaster[sl.id].find('.section-title').append( slideButton.replace(/{next_button_id}/g, 'next-button-'+sl.id ).replace(/{prev_button_id}/g, 'prev-button-'+sl.id ) );
			}
				
			
			$.slideRecount( sl, false );
			
			$.slideButtonAction(sl);
			$.touchSlideAction(sl);

				if( totalPos[sl.id] < 2 ){
					$('#next-button-'+sl.id).hide();
					$('#prev-button-'+sl.id).hide();
				} else {
					$('#next-button-'+sl.id).show();
					$('#prev-button-'+sl.id).show();				
				}

			$(window).on('resize', function(){
				$.slideRecount(sl, false);

				if( totalPos[sl.id] < 2 ){
					$('#next-button-'+sl.id).hide();
					$('#prev-button-'+sl.id).hide();
				} else {
					$('#next-button-'+sl.id).show();
					$('#prev-button-'+sl.id).show();				
				}
			});
			
		};
		
		
		$.slideRecount = function(sl, onMoving ){
			
			moveWidth[sl.id] = 0;
			
			$.each( $('#'+sl.id).children(), function(i,item){
				slObj[sl.id][i] = $(item);
				$(item).removeClass('first').removeClass('last').css('float','left');
				
				moveHeight[sl.id][i] = $(item).height();
				moveWidth[sl.id] += $(item).width();
				moveWidth[sl.id] += parseInt( $(item).css('margin-left') );
				moveWidth[sl.id] += parseInt( $(item).css('margin-right') );
				
				marginL[sl.id] = parseInt( $(item).css('margin-left') );
				marginR[sl.id] = parseInt( $(item).css('margin-right') );
							
			});

			$('#'+sl.id).css({ position : 'relative', width : moveWidth[sl.id]+'px' });
			
			moveBy[sl.id] = theMaster[sl.id].width()+marginL[sl.id]+marginR[sl.id];
			totalPos[sl.id] = Math.ceil( moveWidth[sl.id]/moveBy[sl.id] );
			
			//alert(moveBy[sl.id]);
			
			if( parseInt( slObj[sl.id][0].css('margin-left') ) != 0 ){
				firstPos[sl.id] = -1*parseInt( slObj[sl.id][0].css('margin-left') );
				currentPos[sl.id] = -1*parseInt( slObj[sl.id][0].css('margin-left') );
			} else {
				firstPos[sl.id] = 0;
				currentPos[sl.id] = 0;
			}
			
			if( !onMoving ) {
				countPos[sl.id] = 0;
				$('#'+sl.id).css({ left : firstPos[sl.id]+'px' });	
			}
			
		};
		
		
		$.doSlide = function( sl, direction ){
		
			$.slideRecount(sl, true);
			
			if(typeof(direction) == "undefined")
				countPos[sl.id]++;
			else
				countPos[sl.id] = direction;

			if(countPos[sl.id] == totalPos[sl.id] ) {
				countPos[sl.id] = 0;
			}	

			if(countPos[sl.id] == -1){
				countPos[sl.id] = totalPos[sl.id]-1;
			}
			
			
			//alert(countPos[sl.id]);
			
			if( countPos[sl.id] == 0 ){
				$('#'+sl.id).stop( true, true).animate({ left : firstPos[sl.id]+'px'}, ao[sl.id].speed, 'easeInOutExpo' );
			} else {
				$('#'+sl.id).stop( true, true).animate({ left : ( -1*(countPos[sl.id]*moveBy[sl.id]))+firstPos[sl.id]+'px'}, ao[sl.id].speed, 'easeInOutExpo' );
			}
			
			
			
		}
		
		
		$.slideButtonAction = function( sl ){
		
			$('#next-button-'+sl.id).css({ backgroundColor : ao[sl.id].arrowColor });
			$('#prev-button-'+sl.id).css({ backgroundColor : ao[sl.id].arrowColor });
			
			$('#next-button-'+sl.id).hover( function(){
				$('#next-button-'+sl.id).stop(true,true).animate({ backgroundColor : ao[sl.id].arrowHoverColor }, 300);
			}, function(){
				$('#next-button-'+sl.id).stop(true,true).animate({ backgroundColor : ao[sl.id].arrowColor }, 300);
			});
			
			$('#prev-button-'+sl.id).hover( function(){
				$('#prev-button-'+sl.id).stop(true,true).animate({ backgroundColor : ao[sl.id].arrowHoverColor }, 300);
			}, function(){
				$('#prev-button-'+sl.id).stop(true,true).animate({ backgroundColor : ao[sl.id].arrowColor }, 300);
			});
			
			
			$('#next-button-'+sl.id).bind('click', function(e){
				e.preventDefault();
				if( totalPos[sl.id] > 0 ){
					$.doSlide( sl, countPos[sl.id]+1 );
				}
			});
			
			$('#prev-button-'+sl.id).bind('click', function(e){
				e.preventDefault();
				if( totalPos[sl.id] > 0 ){
					$.doSlide( sl, countPos[sl.id]-1 );
				}
			});
		
		};
		
		
		$.touchSlideAction = function(sl){
		
			//detect touch devices
			if( Modernizr.touch ) {

				var slideSwipeOptions={
					swipe: function(event, direction){
						if( direction == 'right' ){
							$('#prev-button-'+sl.id).click();
						}
						if( direction == 'left' ){
							$('#next-button-'+sl.id).click();
						}
					},
					threshold:0
				};
				theMaster[sl.id].swipe( slideSwipeOptions );
			}
		
		};
		
		
		this.each (
			/** fire up!!!! */
			function(){ init(this); }
		);
	
	};
	
	$.fn.DevvineSlide.defaults = {	
		speed : 600, //slidespeed
		arrowColor : devvine.arrowColor,
		arrowHoverColor : devvine.arrowHoverColor
	};

	
})(jQuery);

