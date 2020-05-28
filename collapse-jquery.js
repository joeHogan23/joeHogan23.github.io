setTimeout(function(){
    jQuery('.collapse-button').trigger('click');}, 0);

setTimeout(function(){
    jQuery('.collapse-button-inner').trigger('click');}, 700);

setTimeout(function(){
    jQuery('.collapse-button-inner').trigger('click');}, 1200);

setTimeout(function(){
    jQuery('.collapse-button').trigger('click');}, 2000);

$(document).ready(function(){

    $(".collapse-button, .collapse-button-inner").click(function(){
                console.log("Works");
        var ddImage = $(this).find('img');
        var ariaState = $(this).attr("aria-expanded"); 
        
        if(ariaState == "true"){
            ddImage.css({'transform': 'rotate(90deg)'});
        }else
            ddImage.css({'transform': 'rotate(0deg)'});
    });
    
});