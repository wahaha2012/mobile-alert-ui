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
    //     // css style
    var css = '.modal-ui-alert .hide,.modal-ui-alert-overlay.hide{display:none}.modal-ui-alert-overlay{position:fixed;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,.5)}.modal-ui-alert{position:fixed;left:45%;top:22%;width:82%;font-size:15px;color:#111}.modal-ui-alert .inner{margin-left:-45%;width:100%;background-color:#fff;border-radius:4px;-webkit-border-radius:4px;box-shadow:0 0 3px #999;-webkit-box-shadow:0 0 3px #999}.modal-ui-alert .buttons{display:box;display:-webkit-box;overflow:hidden}.modal-ui-alert .buttons .btn-cancel,.modal-ui-alert .buttons .btn-confirm{display:block;box-flex:1;-webkit-box-flex:1;border-top:#aaa 1px solid;border-left:#aaa 1px solid;margin-left:-1px;text-align:center;height:46px;line-height:46px;font-size:16px;font-weight:700;text-decoration:none;color:#3c76e0}@media (-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2){.modal-ui-alert .buttons .btn-alert{position:relative;border-top:none;border-left:none}.modal-ui-alert .btn-alert::after{content:" ";display:block;position:absolute;left:0;top:0;width:200%;height:200%;border-top:#aaa 1px solid;border-left:#aaa 1px solid;-webkit-transform:scale(.5) translate(-50%,-50%);transform:scale(.5) translate(-50%,-50%)}}.modal-ui-alert h3{padding:0;margin:0;font-size:14px;text-indent:.5em;height:40px;line-height:40px;border-bottom:#aaa 1px solid}@media (-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2){.modal-ui-alert .title{position:relative;border-bottom:none}.modal-ui-alert .title::after{content:" ";display:block;position:absolute;left:0;bottom:0;width:200%;height:0;border-bottom:1px solid #aaa;-webkit-transform:scale(.5) translate(-50%,-50%);transform:scale(.5) translate(-50%,-50%)}}.modal-ui-alert .info{padding:29px 10px;line-height:1.5;text-align:center}';

    var link = document.createElement('style');
    var head = document.getElementsByTagName("head")[0];
    link.setAttribute('type','text/css');
    link.innerHTML = css;

    head.appendChild(link);
    
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

    //!!Todo extend/dom/eventListener
    
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