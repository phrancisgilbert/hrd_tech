(function($){
	
	function menuAction(){
		var menu = $('#main-nav');
		var firstLists = menu.find('>li').not(":has(>ul)");
		var topBG = $('#logo_and_menu').css('background-color');
		
		firstLists.each(function(){
			 $(this).find('>a').hover( function(){
				var tw = $(this);
				
				if( ! tw.hasClass('pageactive') ) tw.stop(true,true).animate({ borderBottomColor : devvine.menuParentBorderHover, color : devvine.menuHoverColor }, 500);
			}, function(){
				var tw = $(this);
				
				if( ! tw.hasClass('pageactive') ) {
					tw.stop(true,true).animate({ borderBottomColor : topBG, color : devvine.menuColor }, 300, function(){
						this.style.borderBottomColor='transparent';
					});	
				}
			});
		});
	};
	
	
	function FixMenuPos(){
		var menu = $('#main-nav');
		var firstLists = menu.find('>li');
		
		if( firstLists.length ){
			var numb = firstLists.length;
			
			$.each( firstLists, function(i,item){
				var t = $(this);
				if( i > (numb-3) ){
					if( t.find('ul').length ){
						t.find('ul').addClass('hit_width');
					}
				}
			});
		}
	};
	
	
	function pagemenu(pageid){
		$(pageid + " ul").css({display: "none"});
		$(pageid).find('a').removeAttr('title');
		var kl = $(pageid + " li").filter(":has(>ul)");
		
		kl.each(function(){
			$(this).css({position: "relative"});
		
			$(this).hover(function(){
				var ulDrop = $(this).find('ul:first');
				$(this).addClass('onhove');
				$(this).find('a:eq(0)').addClass('onhov');
				
				if( $(this).find('>a').hasClass('pageactive') ){
					$(this).find('>a').removeClass('pageactive');
				}
				
				ulDrop.stop(true,true).css({overflow:"hidden", height:"auto",visibility: "visible",display: "none"}).slideDown(300,
					function(){
						ulDrop.css({overflow:"visible", height:"auto"});
					}
				);	
			}, function(){
				var biz = $(this).find('a:eq(0)'),
					ulDrop = $(this).find('ul:first');

				if( $(this).hasClass('current_page_item') || $(this).hasClass('current-menu-item') ){
					biz.addClass('pageactive');
				}
					
				ulDrop.stop(true,true).css({overflow:"hidden", display:"none"});
				biz.removeClass('onhov');
				$(this).removeClass('onhove');				
			});
		})
		$(pageid +' .current_page_item').find('a:first').addClass('pageactive');
		$(pageid +' .current-menu-item').find('a:first').addClass('pageactive');
		
	};

	
	
	function serviceHover(){
	
	if( $('.col_inner').length ){
		$('.col_inner').each(function(){
			var t = $(this),
				al = t.find('.services_link_to_page'),
				mainBG = $('#main-layout').css('background-color');
				parH = t.parent().innerHeight(),
				circle_bg = "";
				
			t.css({ height : (parH-43)+'px'});
			
			if( t.find('.service_icon').length ){
				circle_bg = t.find('.service_icon').css('background-color');
			}
			
			t.hover( function(){
				t.css({top: '-1px'});
				if( al.length ) al.css({ bottom : '-1px'});
				t.find('h3,p').css({ position: 'relative', bottom : '-1px'});
				
				t.stop(true,true).animate({ borderTopColor : devvine.primaryColor }, 300);
				
				if( circle_bg != "" ){
					t.find('.service_icon').stop(true,true).animate({ backgroundColor : devvine.primaryColor }, 300);
				}		
			}, function(){
	
				t.stop(true,true).animate({ borderTopColor : mainBG },300, function(){
					this.style.borderTopColor='transparent';
					t.css({top: '0px'});
					if( al.length ) al.css({ bottom : '0px'});
					t.find('h3,p').css({ position: 'relative', bottom : '0px'});				
				});

				if( circle_bg != "" ){
					t.find('.service_icon').stop(true,true).animate({ backgroundColor : circle_bg }, 300);
				}
			});
		});
		
	}
	
	};
	
	
	function fixTopMargin(){
		var spLayout = $('#main-content');
		
		if( spLayout.length ){
		
			var firstDiv = spLayout.find('div:eq(0)');
			
			if( firstDiv.hasClass('fullwidth-container') ){
				var fwl = firstDiv.find('div:eq(0)');
				
				if( fwl.hasClass('services_module_wrap') || fwl.hasClass('teaser_wrap') ){
					firstDiv.css({ paddingTop : '0px' });
				}
			}
		}
	};
	
	
	function any_hover(){
		var wp = $('.social_icons'),
			top_bg = $('#top').css('background-color'),
			blogS = $('.blog-object-standard');
		
		if( wp.length ){
			wp.find('a').each(function(){
				
				var t = $(this),
					im = t.find('img').not('.second_icon'),
					imS = t.find('.second_icon');
				

					t.hover( function(){
						im.stop(true,true).animate({ opacity : 0 }, 300);
						imS.stop(true,true).animate({ opacity : 1 }, 300);
					}, function(){
						im.stop(true,true).animate({ opacity : 1 }, 300);
						imS.stop(true,true).animate({ opacity : 0 }, 300);
					});

				
			});
		}
		
		
		if( blogS.length ){
			blogS.each(function(){
				var b = $(this),
					ba = b.find('a'),
					bi = b.find('img');
				
					ba.hover( function(){
						bi.stop(true,true).animate({ opacity : 0.3 }, 300);
					}, function(){
						bi.stop(true,true).animate({ opacity : 1 }, 300);
					});				
			});
		}
	};
	
	
	function toggleHandle(){
		var togPar = $('.accordion-lists');
		
		if( togPar.length ){
			togPar.each(function(){
				var redeclareTogPar = $(this);
				
				redeclareTogPar.find('.accordion_content').hide();
				
				togPar.find('li').each(function(){
					var th = $(this),
						headClick = $(this).find('.accordion_head_text');
					
					if( th.hasClass('accordion_open') ){
						th.find('.accordion_content').slideDown('normal');
					}
					
					headClick.bind('click', function(e){
						e.preventDefault();
						
						if( th.find('.accordion_content').is(':hidden') ){
							var hClick = $(this),
								currentOpen = th.parent().find('.accordion_open');
							
							currentOpen.find('.accordion_content').slideUp('normal');
							currentOpen.find('.accordion_marker').html('&#43;');
							currentOpen.removeClass('accordion_open').addClass('accordion_closed');
							
							th.find('.accordion_content').slideDown('normal');
							hClick.find('.accordion_marker').html('&ndash;');
							th.addClass('accordion_open');
						}
					});
				});
			
			});
		}
	};

	
	function shortcodeTabs(){

		if( $('div.devvine_tab_shortcode').length ){

			$('div.devvine_tab_shortcode').each( function(){
				var $tabs_wrapper = $(this);

				$tabs_wrapper.find('.panes .pane').hide();
				$tabs_wrapper.find('.panes .pane:eq(0)').show();
				$tabs_wrapper.find('ul.tab-lists li:eq(0)').addClass('active');

				$tabs_wrapper.find('ul.tab-lists li a').click(function(){
					var $tab = $(this);

					$('ul.tab-lists li', $tabs_wrapper).removeClass('active');
					$('div.pane', $tabs_wrapper).hide();
					$('div.pane:eq(' + $tab.attr('rel') + ')', $tabs_wrapper).show();
					$tab.parent().addClass('active');

					return false;
				});

			});
		}
	};
	
	
	
	function skillsAnimator(){
		var skills = $('.skill-lists');
		
		if( skills.length ){
			skills.each( function(){
				var t = $(this),
					skill = t.find('li');

				skill.each(function(){
					var nt = $(this),
						percentNum = nt.find('.skills_text').text().match(/\d+/g);
					
					nt.find('.skills_animator_run').stop(true,true).animate({ width : percentNum+'%' }, 1800, 'easeInOutExpo');
				});
			});
		}
	};

	$(document).ready(function(){
		menuAction();
		pagemenu('#main-nav');
		FixMenuPos();
		//serviceHover();
		fixTopMargin();
		any_hover();
		toggleHandle();
		shortcodeTabs();
		skillsAnimator();
	});
	
	
	$(window).on('load', function(){
		//some old webkit 
		//can't read height of container before window loaded
		serviceHover();
	});
	


})(jQuery);





//********************************
//Change Dropdown menu into select field
//********************************
var customMenu;
(function($){
	var apiMenus = customMenu = {
		options : {
			mobileWidth : 960 //define in specific width, the dropdown menu will converted into select
		},
		
		init : function() {
			apiMenus.menuWrap = $('#main-menu');
			apiMenus.menuID = $('#main-nav');
			
			this.createSelect();
			this.executeMenu();

			$(window).resize( function(){ apiMenus.executeMenu(); });
			
			$('#ft-nav-select').bind('change', function(){
				if( $(this).val() != '#' ) window.location = $(this).val();
			});
		},
		
		createSelect : function(){
			var _select = $('<select id="ft-nav-select"><option value="#">Choose a page</option></select>');
			var _opt = "";
			
			apiMenus.menuID.find('>li').each(function(){
				var _li = $(this),
					selected = ( _li.hasClass('current-menu-item') || _li.hasClass('current_page_item' ) ) ? ' selected="selected"' : '';
				
				if( _li.filter(":has(>ul)") ){
					$('<option value="'+_li.find('a:first').attr('href')+'"'+selected+'>'+_li.find('a:first').text()+'</option>').appendTo(_select);
					apiMenus.eachLi( _li, _select);
				} else {
					$('<option value="'+_li.find('a:first').attr('href')+'"'+selected+'>'+_li.find('a:first').text()+'</option>').appendTo(_select);
				}
				
			});
			
			
			_select.appendTo( apiMenus.menuWrap );
			
		},
		
		
		eachLi : function( theLi, container ){
			var parLi = theLi.find('ul:first'),
				depth = parLi.find('li:first').parents('ul').size(),
				nbspchild = '';
			
			
			var i=1;
			for (i=1;i<depth;i++){
				nbspchild += '&#150;';
			}
			nbspchild += '&nbsp;';
			
			parLi.find('>li').each(function(){
				var _li = $(this),
					selected = ( _li.hasClass('current-menu-item') || _li.hasClass('current_page_item' ) ) ? ' selected="selected"' : '';
				
				if( _li.filter(":has(>ul)") ){
					$('<option value="'+_li.find('a:first').attr('href')+'"'+selected+'>'+nbspchild+''+_li.find('a:first').text()+'</option>').appendTo(container);
					apiMenus.eachLi( _li, container);
				} else {

					$('<option value="'+_li.find('a:first').attr('href')+'"'+selected+'>'+nbspchild+''+_li.find('a:first').text()+'</option>').appendTo(container);
				}
				
			});
			
		},
		
		executeMenu : function(){	
			if( $('#main-layout').width() < apiMenus.options.mobileWidth ){
				apiMenus.menuID.hide();
				$('#ft-nav-select').show()
			} else {
				apiMenus.menuID.show();
				$('#ft-nav-select').hide();
			}
		}

	};
	$(document).ready(function(){ customMenu.init(); });

})(jQuery);



//********************************
// Portfolio Lists
//********************************
var portfolioLists;
(function($){
	var wd = new Array, 
		hg = new Array, 
		tImg = new Array, 
		toLink = new Array,
		toObj = new Array, 
		Xpos = new Array, 
		Ypos = new Array;
		
	var apiPortLists = portfolioLists = {
		options : {
			speed : 500
		},
		
		init : function() {
			apiPortLists.theThumbnail = $('.project-thumbnail');
			
			if( apiPortLists.theThumbnail.length ){
				this.refreshData();
				this.DoAnimate();
				$(window).resize( function(){ apiPortLists.refreshData(); });
			}
		},
		
		refreshData : function(){
			
			$.each( apiPortLists.theThumbnail, function(i,item){
				
				wd[i] = $(item).innerWidth();
				hg[i] = $(item).innerHeight();
				tImg[i] = $(item).find('img');
				toLink[i] = $(item).find('.link-to-project');
				toObj[i] = $(item).find('.link-to-object');
				Xpos[i] = (wd[i]/2)-34;
				Ypos[i] = Math.ceil( (hg[i]-32)/2 );
				
				toLink[i].removeAttr('style').css({left : Xpos[i]+'px', top : '-42px'});
				toObj[i].removeAttr('style').css({right : Xpos[i]+'px', bottom : '-42px'});			
			});
			
		},
		
		DoAnimate : function(){
		
			$.each( apiPortLists.theThumbnail, function(a, dat){
				
				$(dat).hover(function(){
					tImg[a].stop(true, true).animate({opacity : 0.4}, 500);
					toLink[a].stop(true, true).animate({top : Ypos[a]+'px'}, 500, 'easeOutExpo');
					toObj[a].stop(true, true).animate({bottom : (hg[a]-(Ypos[a]+32))+'px'}, 500, 'easeOutExpo');
					
				}, function(){
					tImg[a].stop(true, true).animate({opacity : 1.0}, 500);
					toLink[a].stop(true, true).animate({top : '-42px'}, 500, 'easeInExpo');
					toObj[a].stop(true, true).animate({bottom : '-42px'}, 500, 'easeInExpo');				
				
				});
				
				toLink[a].hover(function(){
					toLink[a].stop(true, true).animate({backgroundColor : devvine.portfolioButtonHover}, 500);
				}, function(){
					toLink[a].stop(true, true).animate({backgroundColor : devvine.portfolioButton}, 300);
				});
				
				toObj[a].hover(function(){
					toObj[a].stop(true, true).animate({backgroundColor : devvine.portfolioButtonHover}, 500);
				}, function(){
					toObj[a].stop(true, true).animate({backgroundColor : devvine.portfolioButton}, 300);
				});
			
			});		
		}
		
	};
	$(window).load(function(){ portfolioLists.init(); });

})(jQuery);



//********************************
// Header Image
//********************************
(function($){
	
	var op = new Array, 
		WinWidth = new Array, 
		totalratio = new Array, 
		desW = new Array, 
		desH = new Array, 
		iLeft = new Array, 
		iTop = new Array,
		imgWraper = '<div id="header_image_wrap"><div id="header_image_mask" /></div>';
	
	$.fn.devvineHeaderImage = $.fn.devvineHeaderImage = function(options){
	
		init = function(dv){
			op[dv.id] = $.extend({}, $.fn.devvineHeaderImage.defaults, options);
			
			$(imgWraper).appendTo('#'+dv.id);
			totalratio[dv.id] = op[dv.id].h/op[dv.id].w;
			
			var img = new Image();
			$(img).css('display', 'none').attr('src', op[dv.id].image).attr('id', 'devvine_header_image').appendTo('#header_image_wrap');
			
			$(window).on('load', function(){
				$.objResize(dv);
				$('#devvine_header_image').fadeIn();
				
				$(window).on('resize', function(){
					$.objResize(dv);
				});
			});
		};
		
		
		$.objResize = function(dv){
			WinWidth[dv.id] = $(window).width();
			
			if ( ( op[dv.id].ch / WinWidth[dv.id] ) > totalratio[dv.id] ){
				desH[dv.id] = op[dv.id].ch;
				desW[dv.id] = op[dv.id].ch / totalratio[dv.id];
			} else {
				desW[dv.id] = WinWidth[dv.id];
				desH[dv.id] = WinWidth[dv.id] * totalratio[dv.id];
			}
			

			iLeft[dv.id] = ( WinWidth[dv.id]-desW[dv.id] )/2+'px',
			iTop[dv.id] = (op[dv.id].ch-desH[dv.id])/2+'px';

			$('#devvine_header_image').css({
				top: iTop[dv.id],
				left: iLeft[dv.id],
				width: desW[dv.id]+'px',
				height: desH[dv.id]+'px'
			});				
		};
	
		this.each (
			/** fire up!!!! */
			function(){ init(this); }
		);
	};

	$.fn.devvineHeaderImage.defaults = {	
		image : '',
		ch : 180,
		w : 1600,
		h : 600
	};

})(jQuery);



//********************************
// Blog Gallery Format
//********************************
(function($) {
	//Define variables
	var optionwip	= new Array;
	var obj_src		= new Array;
	var obj_img		= new Array;
	var holder	= new Array;
	var widthImg	= new Array;
	var pposition	= new Array;
	var umrInterval = new Array;
	var moreOne = false;
	var navStruc = '<a href="#" class="gallery_arrow_slide blog-gal-prev"></a><a href="#" class="gallery_arrow_slide blog-gal-next"></a>';
	var imgLength, imgObj;

	
	$.fn.blogGallery = $.fn.blogGallery = function(options){
		
		init = function(wip){
			
			optionwip[wip.id] = $.extend({}, $.fn.blogGallery.defaults, options);
			 
				obj_img[wip.id]		= new Array();
				obj_src[wip.id]		= new Array();
				holder[wip.id]	= new Array();
				widthImg[wip.id]	= new Array();
				pposition[wip.id]	= 0;
				
				//get data from each box
				$.each($('#'+wip.id+' li'), function(i,item){
					$(item).css({ display : 'none'});
					holder[wip.id][i] = $(item);
					obj_img[wip.id][i] = $(item).find('img');						
					obj_src[wip.id][i] = $(item).find('img').attr('src');
					widthImg[wip.id][i] = 0;
				});
				
			if( $(holder[wip.id]).length > 1 ){
				moreOne = true;
			}
			
			$(window).load(function(){
				$('#'+wip.id).css({'background-image' : 'none'});
				$.umr(wip);
			});
			
			$(window).on('resize', function(){
				$.refreshHeight(wip);
			});
			
		};
		
		
		$.refreshHeight = function(wip){

			$('#'+wip.id).find('img').css({width:'100%',height:'auto',display:'block'});
			$('#'+wip.id).stop(true,true).animate({ height : $('.slideShow').find('img').height()+'px'}, optionwip[wip.id].animateSpeed );
			$('#'+wip.id).find('ul').css('height', $('.slideShow').find('img').height()+'px');
				
			if( moreOne ) {
				$.positioningNav(wip);
			}	
		};
		
		$.umr = function(wip){
			
			$(holder[wip.id][0]).addClass('slideShow').css({opacity: 0,display:'block'}).stop(true,true).animate({opacity : 1.0}, optionwip[wip.id].animateSpeed);
			$('#'+wip.id).find('ul').fadeIn().css('height', $(obj_img[wip.id][0]).height()+'px');
			$(obj_img[wip.id][0]).css({width:'100%',height:'auto',display:'block'});
			$('#'+wip.id).stop(true,true).animate({ height : $(obj_img[wip.id][0]).outerHeight()+'px'}, optionwip[wip.id].animateSpeed);
			
			
			if( moreOne ) {
				$.createNav(wip);
				$.showHideNav(wip);
				$.clickedNav(wip);
			}
			
			//detect touch devices
			if( Modernizr.touch ) {
				//if object length is more than 1
				if( moreOne ) {
					var swipeOptions={
						swipe: function(event, direction){
							if( direction == 'right' ){
								$('#'+wip.id).find('.blog-gal-prev').click();
							}
							if( direction == 'left' ){
								$('#'+wip.id).find('.blog-gal-next').click();
							}
						},
						threshold:0
					};
					$('#'+wip.id).swipe( swipeOptions );
				}
			}
			
			//umrInterval[wip.id] = setInterval(function() { $.doit(wip) }, optionwip[wip.id].speed);
		
		};
		
		
		$.createNav = function(wip){
		
			$('#'+wip.id).append(navStruc);
			$('#'+wip.id).find('.gallery_arrow_slide').css({ backgroundColor : devvine.arrowColor });
			$.positioningNav(wip);

		};
		
		
		$.positioningNav = function(wip){
		
			var pH = (( $('#'+wip.id).find('ul').height() - 40 ) / 2) + 4;
		
			$('#'+wip.id).find('.blog-gal-next, .blog-gal-prev').stop(true,true).animate({top : pH+'px'}, optionwip[wip.id].animateSpeed);
		}
		
		$.showHideNav = function(wip){
			
			$('#'+wip.id).hover(function(){
			
				$('#'+wip.id).find('.blog-gal-next, .blog-gal-prev').css({display : 'block'});
			
			}, function(){
			
				$('#'+wip.id).find('.blog-gal-next, .blog-gal-prev').css({display : 'none'});
			
			});
		
		};
		
		$.clickedNav = function(wip){

			$.each($('#'+wip.id+' .gallery_arrow_slide'), function(i, link){
				$(link).hover( function(){
					$(link).stop(true,true).animate({ backgroundColor : devvine.arrowHoverColor }, 300);
				}, function(){
					$(link).stop(true,true).animate({ backgroundColor : devvine.arrowColor }, 300);
				});
				
				$(link).bind('click', function(e){
					e.preventDefault();
					var nextDirection = pposition[wip.id]+1,
						prevDirection = pposition[wip.id]-1
					
					if( moreOne ){
						if( $(link).hasClass('blog-gal-next') ){
							$.doit(wip, nextDirection);
						}
						
						if( $(link).hasClass('blog-gal-prev') ){
							$.doit(wip, prevDirection);
						}
					}
					
				});
			});
		
		
		};
		
		$.doit = function(wip, prev){
				
				if(typeof(prev) == "undefined")
					pposition[wip.id]++;
				else
					pposition[wip.id] = prev;
	
				if  (pposition[wip.id] == $(holder[wip.id]).length ) {
					pposition[wip.id] = 0;
				}	

				if (pposition[wip.id] == -1) {
					pposition[wip.id] = $(holder[wip.id]).length-1;
				}
				
				

				$('#'+wip.id).animate({ height : $(holder[wip.id][pposition[wip.id]]).outerHeight()+'px'}, optionwip[wip.id].animateSpeed );
	
				$('#'+wip.id).find('ul').css('height', $(holder[wip.id][pposition[wip.id]]).height()+'px');
					
				if( moreOne ) {
					$.positioningNav(wip);
				}
				
			
				$('.slideShow').stop(true,true).animate({opacity : 0}, optionwip[wip.id].animateSpeed*2, function(){
					$(this).css({ display : 'none'})
				}).removeClass('slideShow');

				$(holder[wip.id][pposition[wip.id]])
									.addClass('slideShow')
									.css({ display : 'block', opacity : 0})
									.stop(true,true)
									.animate({opacity : 1.00}, optionwip[wip.id].animateSpeed );
		};


		this.each (
			function(){ init(this); }
		);


	};
	
	// default values
	$.fn.blogGallery.defaults = {
		animateSpeed : 500
	};
	
	
	$(document).ready(function(){
		var gallery = $('.blog-object-gallery'),
			p_gallery = $('.portfolio-object-gallery');
		
		if( gallery.length ){
			gallery.each( function(){
				var t = $(this).attr('id');
				
				$('#'+t).blogGallery();
			});
		}
		
		if( p_gallery.length ){
			p_gallery.each( function(){
				var p = $(this).attr('id');
				
				$('#'+p).blogGallery();
			});
		}
		
		$("a[rel^='prettyPhoto']").prettyPhoto({theme: devvine.pp_theme, social_tools : false});
	});

	
})(jQuery);
