(function($){

    $.fn.layerPopOpen = function(){
        return this.each(function(){
            var $this = $(this);
            $this.on('click', function(){
                var $el = $this.attr('href');
                var target = $($el);
                target.append("<div class=\"dim\"></div>");
                target.show();
                var close = target.find('.js_pop_close');
                close.on('click', function(){
                    target.hide();
                    target.find('.dim').remove();
                });
            });
        });
    },

    $.fn.passChange = function(){
        return this.each(function(){
            var $this = $(this);
            var count = 0;
            var disc = $this.parents().find('.password-disc-wrap');
            console.log(disc);
            $this.keydown(function(e){
                if(e.key === "Backspace" || e.key == "Delete") {
                    count--;
                    disc.find('span').last().remove();
                }
                else if(e.key == 0 || e.key == 1 || e.key == 2 || e.key == 3 || e.key == 4 || e.key == 5 || e.key == 6 || e.key == 7 || e.key == 8 || e.key == 9 ) {
                    count++;
                    disc.append("<span class='pass-disc'></span>"); 
                } else {} 
            });
        });
    },

    $.fn.searchDel = function(){
        return this.each(function(){
            let $this = $(this);
            let sBox = $this.find('')
        });
    }

    

})(jQuery);

document.addEventListener('DOMContentLoaded', function(e){
    $('.btn-open-layerPop').layerPopOpen();
    $('input[type="password"]').passChange();
    $('.search-box').searchDel();
});

