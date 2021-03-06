var root = window.location.hostname == 'localhost' ? '' : 'http://joehogan23.github.io/';
var loadbar;

var currentHeight = window.innerHeight;

initialize();
console.log();


$(document).ready(function(){
//    if(isMobileDevice){
//          $('.project-badge').each(function(){
//               $(this).removeClass('col-sm-6 col-md-6 col-lg-4')
//               .addClass('col-xs-12');
//          });
//    }
    if(!loadbar){
	  loadbar = $('#load-bar').cprogress({
	       percent: 0, // starting position
	       img1: '/images/preloader-background.png', // background
	       img2: '/images/preloader-value.png', // foreground
	       speed: 300, // speed (timeout)
	       PIStep : 0.09, // every step foreground area is bigger about this val
	       limit: 100, // end value
	       loop : false, //if true, no matter if limit is set, progressbar will be running
	       showPercent : true, //show hide percent
	       onInit: function(){console.log('onInit');},
	       onProgress: function(p){console.log('onProgress',p);}, //p=current percent
	       onComplete: function(p){ onPreloaderComplete();}
	  });
     }
    
    $("#nav-container").fadeOut(100);
    $(".footer").fadeOut(100);

    bindMainNav();
    bindSocialNav();
    bindCollapseEvents();
    $('html, body').animate({ scrollTop:0  }, 1);
    $('body').css('overflow', 'hidden');
    
    $(window).on('beforeunload', function(){

    });
    
    $(".project-item-cover img").mouseenter(function(){
       $(this).stop().animate({height: ($(this)).data("height-end"), marginLeft: ($(this)).data("margin-end"), borderColor: 'white'},300);
       
   }).mouseleave(function(){
       $(this).stop().animate({height: '100%', marginLeft: ($(this)).data("margin-start"), borderColor: '#2a3e87'},300);
  })
  
  $(".project-item-cover").mouseenter(function(){
      $(this).stop().animate({borderColor: '#eac67a'},300);
      
  }).mouseleave(function(){
      $(this).stop().animate({borderColor: '#2a3e87'},300);
  })
 
   $(".project-item-cover").click(function(){
       if(!scaledObject){
           scaledObject = true;
           $(".project-page-container").toggle("scale");
       }
       $('html, body').animate({
           scrollTop: $(".project-page-container").offset().top - (innerHeight /4)}, 500);     
   });
});

window.onload = function(){    
    if(window.location.pathname == "Sierejko-Resume.pdf"){
        console.log(window.location.pathname);
    }
    
    loadbar.options({speed: parseInt($('.preloader-wrapper').data("target-speed"))});
    
    if($('#overlay')[0]){
        $('html, body').animate({ scrollTop:0  }, 1);
    
        bindWindowEvents(0);
    
        setTimeout(function(){
            onLoadUrlScroll();
        },500);
    }

//    setTimeout(function(){
//        $('.preloader-wrapper').css('opacity','0');
//    }, 2000);//    setTimeout(function(){
//        $('.preloader-wrapper').css('opacity','0');
//    }, 2000);
}

function onPreloaderComplete(){

    if($('.background')[0]){
        $('html, body').animate({ scrollTop:0  }, 1);
        bindWindowEvents(1400);
    }

    $('.preloader-wrapper').fadeOut(1200);
       
    setTimeout(function(){

        $('#nav-container').fadeIn(600);
        $('.footer').fadeIn(600);

    }, 1400);
    
    setTimeout(function(){
        $('body').css('overflow', 'auto');
    }, 1250);
}

function bindWindowEvents(initDelay)
{
    $.fn.isAboveViewportBottom = function() {
        var elementTop = $(this).offset().top;
        var viewportBottom = $(window).scrollTop() + $(window).height();
        return elementTop <= viewportBottom;
    };
    
    $.fn.isBelowViewportTop = function() {
        var elementBottom = $(this).offset().top + $(this).height;
        var viewportTop = $(window).scrollTop();
        return elementBottom > viewportTop;
    };
    
    $.fn.isVisible = function() {
        return $(this).isAboveViewportBottom() && $(this).isBelowViewportTop();
    };
    
        //General Visibility setter. Sets elements that are visible within window. Used for initializing page only
    function onSetElementsVisible(){
         $('.fade').each(function(){
             if($(this).isVisible){
                $(this).addClass('in');
                $(this).css('padding-top', '0');
            }
         });
    };
    
    function onSetElementsVisibleFromBottom(){
        $('.fade').each(function(){
            if($(this).isAboveViewportBottom()){
            $(this).addClass('in');
                $(this).css('padding-top', '0');
            }
        });
    };
    
    //Keeps the footer at the bottom of window. Relative to how tall the main container is
    function onContainerResize(){
        
        var top = $("#container").position().top;
        var height = $("#container").height();
        var bottom = $(window).height() - 40 - top - height;
        //NOTE-TO-SELF: Original added value : 113
        if(bottom > $('#footer').height() + 93)
            $('#footer').css('position', 'absolute');  //Keep footer at bottom of page when container is above footer
        else
            $('#footer').css('position', 'relative');   //When container expands past the footer, push the footer down
    }
    
    setInterval(onContainerResize, 50);
    
    setTimeout(function(){
       onSetElementsVisibleFromBottom();

               }, initDelay);
    setTimeout(function(){
            $(window).resize(function(){
        onSetElementsVisibleFromBottom();
    });
    
    $(window).scroll(function(){        
        onSetElementsVisibleFromBottom();
    });
        onSetElementsVisibleFromBottom();
    
    
    }, initDelay + 1200);
    
    //If mobile device, always make navigation method sidebar
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        $("#button-menu").children(".nav-item").each(function(){
              $(this).css("pointer-events","none");
               $(this).css("opacity", "0");
           });
           
        $("#hamburger-button").css('opacity', '100%');
        $("#hamburger-button").css('pointer-events', 'all');
        return; //Don't allow responsive window functionality if mobile device
    }
    
    
    $(window).resize(function(){
        onWindowResize($(window).width());
    });
    
    function onWindowResize(width){
        if(width >= 968){
           $("#button-menu").children(".nav-item").each(function(){
               $(this).css("pointer-events","all");
               $(this).stop(true).fadeTo(200, 1);
           });
        $("#hamburger-button").stop(true).fadeTo(200, 0);
            $("#hamburger-button").css("pointer-events","none");
           
            console.log("Window size is nav bar mode");
           closeNav();
           return;
       }    
                $("#hamburger-button").stop(true).fadeTo(200, 1);
            $("#hamburger-button").css("pointer-events","all");
        
        $("#button-menu").children(".nav-item").each(function(){
              $(this).css("pointer-events","none");
               $(this).stop(true).fadeTo(200, 0);
           });
           

        $("#name").css("padding-left", "4%");
        console.log("Window size is side bar mode");
    }
    
   onWindowResize($(window).width());
}

function bindMainNav()
{
    $(".nav-item, .sidebar-item").click(function(){
        
        onPressedNavItem(this);
    });

    function onPressedNavItem(nav){
        var targetElement = ($(nav)).data("target-element");
        
        //Doesn't have a target-element
        if(targetElement == undefined)
            return;
        
        var el = $(targetElement);

        if(el.length)
        {
            onScrollToElement(el)
            return;
        }
        $(".preloader-wrapper").fadeIn(200);
        window.location.href = root + "index.html" + targetElement;
    }
}
//
//function onOpenWebPage(el){
//    $($((el)).data("target-webpage")){
//        
//    }
//}

function bindSocialNav()
{    
    $(".contact-button").mouseenter(function(){
        $(this).stop().animate({opacity: 1}, 300);
        $($((this)).data("target-image")).stop().animate({opacity: .8, left: 30}, 300);
        setOverlayColor(($(this)).data("overlay-color"), 300);

    }).mouseleave(function(){
        $(this).stop().animate({opacity: .5}, 300);
        $($((this)).data("target-image")).stop().animate({opacity: 0, left: 0}, 300);
        setOverlayColor('transparent', 300);
    });
    
    function setOverlayColor(color, speed){
        $("#overlay").stop().animate({backgroundColor: color}, speed);
    }
}

function bindCollapseEvents(){
    
    $(".collapse-button, .collapse-button-inner").click(function(){
        var ddImage = $(this).find('img');
        var ariaState = $(this).attr("aria-expanded"); 
        
        if(ariaState == "true"){
            ddImage.css({'transform': 'rotate(90deg)'});
        }else
            ddImage.css({'transform': 'rotate(0deg)'});
    });
}

function onLoadWindow(){
    
}

function isMobileDevice()
{
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent));
}

function onScrollToElement(el)
{
    $('html, body').animate({ scrollTop: el.offset().top - 60 }, 1000);
}

function onLoadUrlScroll(){
    var url = window.location.href;

    if(url.includes('#')){
        var id = url.substring(url.lastIndexOf('#'));

        if(id.length > 1)
            onScrollToElement($(id));
    }
}

function initialize(){
    setTimeout(function(){  closeNav()}, 100);
    setTimeout(function(){  jQuery('.collapse-button').trigger('click');}, 0);
    setTimeout(function(){  jQuery('.collapse-button-inner').trigger('click');}, 700);
    setTimeout(function(){  jQuery('.collapse-button-inner').trigger('click');}, 1200);
    setTimeout(function(){  jQuery('.collapse-button').trigger('click');}, 2000);
}

function openNav() {
  document.getElementById("sidebar-menu").style.left = "60%";
  document.getElementById("container").style.right = "40%";
  document.getElementById("footer").style.right = "20%";
}

function closeNav() {
  document.getElementById("sidebar-menu").style.left = "100%";
  document.getElementById("container").style.right= "0%";
  document.getElementById("footer").style.right= "0%";
}

function openResume(){
    window.open("Sierejko-Resume.pdf", 'blank');
}

(function ( $ ) {
 	if (!$.ns) {
 		$.ns = {};
 	};

 	$.ns.cprogress = function ( el, options) {
 		var base = this;
	  // Access to jQuery and DOM 
	  base.$el = $(el);
	  base.el = el;
	  base.$el.data( "ns.cprogress" , base );

	  base.options = $.extend({}, $.ns.cprogress.defaultOptions, options);


	  base.methods = {
	  	init: function () {
			//Images
			base.img1 = new Image();
			base.img1.src = base.options.img1;
			base.img2 = new Image();
			base.img2.src = base.options.img2;

			base.width = base.img1.width;
			base.height = base.img1.height;

			//main cprogress div
			base.$progress = $('<div />').addClass('jCProgress');
			mt = parseInt(base.$progress.css('marginTop').replace("ems",""));
			ml = parseInt(base.$progress.css('marginLeft').replace("ems",""));
			base.$progress.css('marginLeft',(base.$el.width()-base.width)/2+ml).css('marginTop',(base.$el.height()-base.height)/2+mt).css('opacity','0.0');

			//percent div
            
            base.$percentDiv = $('<div/>').addClass('percent-container');
			base.$percent = base.$percentDiv.addClass('percent');
			//hide?
			
			//canvas area
			base.$ctx = $('<canvas />');
			base.$ctx.attr('width',base.width);
			base.$ctx.attr('height',base.height);

			//append to target
			base.$el.prepend(base.$progress);
			base.$progress.append(base.$percent);
			base.$progress.append(base.$ctx);

			//effect
			base.$progress.animate({
				opacity: 1.0
			}, 500, function() {
			});

			//Canvas
			base.ctx = base.$ctx[0].getContext('2d');
			//Pie color/alpha
			base.ctx.fillStyle = "rgba(0,0,0,0.0)";

			//others
			base.options.percent=base.options.percent%100;
			base.i=(base.options.percent*(Math.PI*2))/100;
			base.j=0;
			base.stop = 0;
	
			//call draw method
			base.options.onInit();
			base.methods.draw();
			
		},
		reloadImages : function(){

			//Images
			base.img1 = new Image();
			base.img1.src = base.options.img1;
			base.img2 = new Image();
			base.img2.src = base.options.img2;

			base.width = base.img1.width;
			base.height = base.img1.height;

			base.$progress.css('marginLeft',(base.$el.width()-base.width)/2+ml).css('marginTop',(base.$el.height()-base.height)/2+mt);

			base.$ctx.attr('width',base.width);
			base.$ctx.attr('height',base.height);

			base.ctx = base.$ctx[0].getContext('2d');
			base.ctx.fillStyle = "rgba(0,0,0,0.0)";


		},
		coreDraw : function(){

			
			base.ctx.clearRect(0,0,base.width,base.height);
			base.ctx.save();
			base.ctx.drawImage(base.img1,0,0);
			base.ctx.beginPath();
			base.ctx.lineWidth = 5;
			base.ctx.arc(base.width/2,base.height/2,base.height/2,base.i-Math.PI/2,base.j-Math.PI/2,true);
			base.ctx.lineTo(base.width/2,base.height/2);
			base.ctx.closePath();
			base.ctx.fill();
			base.ctx.clip();
			base.ctx.drawImage(base.img2,0,0);
			base.ctx.restore();
			
		}
		,
		draw : function () {
			if(base){

				if(base.width==0 || base.height==0){
					base.methods.reloadImages();
				}

				if(base.options.showPercent==false){
					base.$percent.hide();
				}
				else{
					base.$percent.show();
				}

				if(base.stop!=1 && (base.options.percent-1)<=base.options.limit){



					if(base.options.loop==true){
						base.options.limit=121;
					}
					if(base.options.percent>=100 && base.options.percent<=base.options.limit){
						base.i=0;
						base.options.limit=base.options.limit-100;
					}

					base.methods.coreDraw();

					base.i=base.i+base.options.PIStep;
					base.options.percent = base.i*100/(Math.PI*2);

					if(base.options.percent<=base.options.limit){
						setTimeout(base.methods.draw,base.options.speed);
						base.$percent.html(base.options.percent.toFixed(0));

						base.options.onProgress(base.options.percent.toFixed(0));
					}else{
						base.$percent.html(base.options.limit);
						base.methods.coreDraw();
						base.options.onProgress(base.options.limit);
						base.options.onComplete(base.options.limit);
					}

					base.options.percent++;
				}
			}

		},
		destroy: function(){
			base.$progress.animate({
				opacity: 0.0
			}, 500, function() {
				base.$progress.remove();
				base.stop = 1;
				base = null;
			});
		}
	};

	base.public_methods = {
		start : function(){
			base.stop = 0;
			base.methods.draw();

		},
		stop : function(){
			base.stop = 1;
		},
		reset : function(){
			base.options.percent =0;
			base.i=0;
			base.methods.draw();
		},
		destroy : function(){
			base.methods.destroy();
		},
		options: function(options){
			base.options = $.extend({}, base.options, options);
			if(options.img1 || options.img2 || options.img3){
				base.methods.reloadImages();
				base.methods.coreDraw();
			}
			base.methods.draw();
			return base.options;
		}
	};

	base.methods.init();


};

$.ns.cprogress.defaultOptions = {
	percent :0,
	  //Variables
	  img1: 'v1.png',
	  img2: 'v2.png',
	  speed: 50,
	  limit : 48,
	  loop : false,
	  showPercent : true,
	  PIStep : 0.05,
	  //Funs
	  onInit : function(){},
	  onProgress : function(percent){},
	  onComplete : function(){}
	};

	$.fn.cprogress = function( options) {
		var cprogress = (new $.ns.cprogress(this, options));
		return cprogress.public_methods;
	};

})( jQuery );
