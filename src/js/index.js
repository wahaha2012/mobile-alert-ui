(function (root, factory) {
  if (typeof exports === "object" && exports) {
    factory(exports); // CommonJS
  } else {
    var module = {};
    factory(module);
    if (typeof define === "function" && define.amd) {
      define(module); // AMD
    } else {
      root.AlertUI = module; // <script>
    }
  }
}(this, function (exports) {
    // {{cssStyle}}
    var tpl = '<div class="modal-ui-alert {{addClass}}">\
                <div class="inner">\
                    <h3 class="title hide">{{title}}</h3>\
                    <div class="info">{{content}}</div>\
                    <div class="buttons">\
                        <a href="" class="btn-alert btn-cancel">{{cancelBtn}}</a>\
                        <a href="" class="btn-alert btn-confirm">{{confirmBtn}}</a>\
                    </div>\
                </div>\
            </div>',
        mapKeys = ['addClass','title','content','cancelBtn','confirmBtn'],
        BODY = document.body,
        WIN = window;

    var defaultConfig = {
        showOverlay: true,
        autoShow: true,
        cancelBtn:'取消',
        confirmBtn:'确定'
    };

    /**
     * alert component
     * @param {[Object]} config alert component config
     * config : {
     *     showOverlay:,
     *     autoShow:,
     *     confirmBtn:,
     *     cancelBtn:,
     *     
     *     onConfirm:,
     *     onCancel:,
     *     onShow:,
     *     onClose:
     * }
     */
    Alert = function(config){
        this.config = $.extend({}, defaultConfig, config||{});

        this.init();
        if(this.config.autoShow){
            this.open();
        }
    }

    Alert.prototype = {
        constructor: Alert,
        
        init: function(){
            var self = this,
                tplTmp = tpl;

            mapKeys.forEach(function(item){
                tplTmp = tplTmp.replace(new RegExp('{{'+item+'}}','g'), self.config[item]||'');
            });

            this.dialogue = $(tplTmp);

            if(this.config.showOverlay){
                this.overlay = $('<div class="modal-ui-alert-overlay"></div>');
            }
        },

        bindEvents: function(){
            var self = this;
            this.dialogue.find('.btn-confirm').on('click', function(e){
                e.preventDefault();

                if(self.config.onConfirm){
                    self.config.onConfirm(self);
                }
                self.close();
            });

            this.dialogue.find('.btn-cancel').on('click', function(e){
                e.preventDefault();

                if(self.config.onCancel){
                    self.config.onCancel(self);
                }
                self.close();
            });
        },

        open: function(){
            var self = this;
            if(this.config.showOverlay){
                this.overlay.appendTo(BODY);
            }

            this.dialogue.appendTo(BODY);

            if(this.config.title){
                this.dialogue.find("h3").removeClass("hide");
            }

            if(!this.config.confirmBtn){
                this.dialogue.find('.btn-confirm').remove();
            }

            if(!this.config.cancelBtn){
                this.dialogue.find('.btn-cancel').remove();
            }

            this.dialogue.css({
                top: (WIN.height() - this.dialogue.height())/2
            });

            this.bindEvents();

            if(this.config.onShow){
                this.config.onShow(this);
            }

            if(!this.config.confirmBtn && !this.config.cancelBtn){
                setTimeout(function(){
                    self.close();
                }, 2000);
            }
        },

        close: function(){
            this.dialogue.remove();

            if(this.overlay){
                this.overlay.remove();
            }

            if(this.config.onClose){
                this.config.onClose(this);
            }
        }
    };

    exports = Alert;
});