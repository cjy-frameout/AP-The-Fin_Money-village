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
    }

})(jQuery);

document.addEventListener('DOMContentLoaded', function(e){
    $('.btn-open-layerPop').layerPopOpen();
});