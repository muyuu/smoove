(function(w, $){
  $(function(){
    smoove({
        offset: ()=>{
            console.log("run offset option's callback");
            return 50;
        }
    });
  });
})(window, jQuery);
