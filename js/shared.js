var root = "http://joehogan23.github.io/";
setTimeout(function(){closeNav()}, 100);

$(document).ready(function(){
    
    
    bindMainNav();
    bindSocialNav();
    bindWindowEvents();
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
    "use strict";
    setTimeout(function(){
        onLoadUrlScroll();
    });
}

function bindWindowEvents()
{
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        $("#button-menu").children(".nav-item").each(function(){
              $(this).css("pointer-events","none");
               $(this).css("opacity", "0");
           });
           
        $("#hamburger-button").css('opacity', '100%');
        $("#hamburger-button").css('pointer-events', 'all');
        return;
    }
    
    $(window).resize(function(){
        checkWindowResize($(window).width());
    });
    
    function checkWindowResize(width){
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
    
   checkWindowResize($(window).width());
}

function bindMainNav()
{
    $(".nav-item, .sidebar-item").click(function(){

        var targetElement = ($(this)).data("target-element");
        
        //Doesn't have a target-element
        if(targetElement == undefined)
            return;
        
        var el = $(targetElement);

        if(el.length)
        {
            onScrollToElement(el)
            return;
        }
        
        window.location.href = root + "index.html" + targetElement; 
    });
}

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

function onLoadWindow(){
    
}

function onScrollToElement(el)
{
    $('html, body').animate({ scrollTop: el.offset().top - 50 }, 500);
}

function onLoadUrlScroll(){
    var url = window.location.href;

    if(url.includes('#')){
        var id = url.substring(url.lastIndexOf('#'));

        if(id.length > 1)
            onScrollToElement($(id));
    }
}


function openNav() {
  document.getElementById("sidebar-menu").style.left = "60%";
  document.getElementById("container").style.right = "40%";
}

function closeNav() {
  document.getElementById("sidebar-menu").style.left = "100%";
  document.getElementById("container").style.right= "0%";
}