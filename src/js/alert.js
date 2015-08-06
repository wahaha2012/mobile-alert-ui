function() {
    var tpl = '<div class="inner-auam">\
                    <div class="title-auam hide-auam">{{title}}</div>\
                    <div class="info-auam">{{content}}</div>\
                    <div class="buttons-auam">\
                        <div class="btn-alert-auam btn-cancel-auam J_btn_cancel">{{cancelBtn}}</div>\
                        <div class="btn-alert-auam btn-confirm-auam J_btn_confirm">{{confirmBtn}}</div>\
                    </div>\
                </div>',
        mapKeys = ['addClass','title','content','cancelBtn','confirmBtn'],
        BODY = document.body;

    var defaultConfig = {
        showOverlay: true,
        autoShow: true,
        cancelBtn:'Cancel',
        confirmBtn:'OK',
        stayTime: 2
    };

    var utils = {
        extend: function(to, from){
            to = to || {};
            from = from || {};

            for(var key in from){
                to[key] = from[key];
            }

            return to;
        },

        removeClass: function(element, className){
            if(!element || !className){
                return;
            }

            var classNameStr = element.getAttribute('class'),
                classNames = classNameStr.match(/\b[\w\-\_]+\b/g),
                classResult = [];

            classNames.forEach(function(item, index){
                if(item!==className){
                    classResult.push(item);
                }
            });

            element.setAttribute('class', classResult.join(" "));
        },

        addClass: function(element, className){
            if(!element || !className){
                return;
            }

            var classNameStr = element.getAttribute('class'),
                classNames = classNameStr.match(/\b[\w\-\_]+\b/g),
                isExist;

            classNames.forEach(function(item, index){
                if(item===className){
                    isExist = true;
                }
            });

            if(!isExist){
                classNames.push(className);
            }

            element.setAttribute('class', classNames.join(" "));
        },

        removeElement: function(element){
            if(!element){
                return;
            }

            element.parentNode.removeChild(element);
        },

        css: function(element, cssData){
            if(!element || typeof cssData!=='object'){
                return;
            }

            var styles = element.getAttribute('style') || '',
                styleArray = styles.split(';'),
                styleResult = [];

            styleArray.forEach(function(item, index){
                var itemArr = item.split(":");

                if(cssData[itemArr[0]]){
                    itemArr[1] = cssData[itemArr[0]];
                    delete cssData[itemArr[0]];
                }

                styleResult.push(itemArr.join(":"));
            });

            for(var key in cssData){
                styleResult.push(key+':'+cssData[key]);
            }

            element.setAttribute('style', styleResult.join(";"));
        },

        on: function(element, eventName, handler){
            if(!element || !eventName || !handler){
                return;
            }

            element.addEventListener(eventName, handler);
        }
    };

    //!!Todo extend/dom/eventListener
    
    /**
     * alert component
     * @param {[Object]} config alert component config
     * config : {
     *     //text infomations
     *     title: 'Notice', //dialogue title, default [Null]
     *     content: 'Hello World', //dialogue info, default [Null]
     *     confirmBtn: 'OK', //confirm button text, default ['OK']
     *     cancelBtn: 'Cancel', //cancel button text, default ['cancel']
     *
     *     //switch options
     *     showOverlay: true, //whether show dialogue overlay, default [true]
     *     autoShow: true, //whether auto show dialogue, default [true]
     *     stayTime: 2, //dialogue stay time, default [2](seconds)
     *     
     *     //event handlers
     *     onConfirm: function(){}, //confirm button event handler
     *     onCancel: function(){}, //cancel button event handler
     *     onShow: function(){}, //dialogue show event handler
     *     onClose: function(){} //dialogue close event handler
     * }
     */
    var Alert = function(config){
        this.config = utils.extend({}, defaultConfig);
        this.config = utils.extend(this.config, config||{});

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

            this.dialogue = document.createElement('div');
            this.dialogue.setAttribute('class', 'modal-ui-alert-auam');
            utils.addClass(this.dialogue, self.config['addClass']);
            this.dialogue.innerHTML = tplTmp;

            if(this.config.showOverlay){
                this.overlay = document.createElement('div');
                this.overlay.setAttribute('class', 'modal-ui-alert-overlay-auam');
            }
        },

        bindEvents: function(){
            var self = this;
            utils.on(this.dialogue.querySelector('.btn-confirm-auam'), 'click', function(e){
                if(e && e.preventDefault){
                    e.preventDefault();
                }

                if(self.config.onConfirm){
                    self.config.onConfirm(self);
                }
                self.close();
            });

            utils.on(this.dialogue.querySelector('.btn-cancel-auam'), 'click', function(e){
                if(e && e.preventDefault){
                    e.preventDefault();
                }

                if(self.config.onCancel){
                    self.config.onCancel(self);
                }
                self.close();
            });
        },

        open: function(){
            var self = this;
            if(this.config.showOverlay){
                BODY.appendChild(this.overlay);
            }

            BODY.appendChild(this.dialogue);

            if(this.config.title){
                utils.removeClass(this.dialogue.querySelector(".title-auam"), "hide-auam");
            }

            if(!this.config.confirmBtn){
                utils.removeElement(this.dialogue.querySelector('.btn-confirm-auam'));
            }

            if(!this.config.cancelBtn){
                utils.removeElement(this.dialogue.querySelector('.btn-cancel-auam'));
            }

            utils.css(this.dialogue, {
                top: (document.documentElement.clientHeight - this.dialogue.offsetHeight)/2 + 'px'
            });

            this.bindEvents();

            if(this.config.onShow){
                this.config.onShow(this);
            }

            if(!this.config.confirmBtn && !this.config.cancelBtn){
                setTimeout(function(){
                    self.close();
                }, this.config.stayTime * 1000);
            }
        },

        close: function(){
            utils.removeElement(this.dialogue);

            if(this.overlay){
                utils.removeElement(this.overlay);
            }

            if(this.config.onClose){
                this.config.onClose(this);
            }
        }
    };

    //{{{style}}}

    return Alert;
}