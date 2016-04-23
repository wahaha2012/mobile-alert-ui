/*!
 * Mobile Alert UI
 * Author: wxwdesign@gmail.com
 * Licensed under the MIT License.
 * https://github.com/wahaha2012/mobile-alert-ui
 */
!function(t,e){e="function"==typeof e?e:function(){},"function"==typeof define?define.amd?define([],e):define.cmd&&define(function(t,a,i){i.exports=e()}):"object"==typeof exports?module.exports=e():"object"==typeof DP&&"function"==typeof DP.define?DP.define([],e):t.AlertUI=t.AlertUI||e()}(this,function(){var t='<div class="inner-auam">                    <div class="title-auam hide-auam">{{title}}</div>                    <div class="info-auam">{{content}}</div>                    <div class="buttons-auam">                        <div class="btn-alert-auam btn-cancel-auam J_btn_cancel">{{cancelBtn}}</div>                        <div class="btn-alert-auam btn-confirm-auam J_btn_confirm">{{confirmBtn}}</div>                    </div>                </div>',e=["addClass","title","content","cancelBtn","confirmBtn"],a=document.body,i={showOverlay:!0,autoShow:!0,cancelBtn:"Cancel",confirmBtn:"OK",stayTime:2,toast:!1},o={extend:function(t,e){t=t||{},e=e||{};for(var a in e)t[a]=e[a];return t},removeClass:function(t,e){if(t&&e){var a=t.getAttribute("class"),i=a.match(/\b[\w\-\_]+\b/g),o=[];i.forEach(function(t,a){t!==e&&o.push(t)}),t.setAttribute("class",o.join(" "))}},addClass:function(t,e){if(t&&e){var a,i=t.getAttribute("class"),o=i.match(/\b[\w\-\_]+\b/g);o.forEach(function(t,i){t===e&&(a=!0)}),a||o.push(e),t.setAttribute("class",o.join(" "))}},removeElement:function(t){t&&t.parentNode.removeChild(t)},css:function(t,e){if(t&&"object"==typeof e){var a=t.getAttribute("style")||"",i=a.split(";"),o=[];i.forEach(function(t,a){var i=t.split(":");e[i[0]]&&(i[1]=e[i[0]],delete e[i[0]]),o.push(i.join(":"))});for(var n in e)o.push(n+":"+e[n]);t.setAttribute("style",o.join(";"))}},on:function(t,e,a){t&&e&&a&&t.addEventListener(e,a)}},n=function(t){this.config=o.extend({},i),this.config=o.extend(this.config,t||{}),this.init(),this.config.autoShow&&this.open()};return n.prototype={constructor:n,init:function(){var a=this,i=t;e.forEach(function(t){i=i.replace(new RegExp("{{"+t+"}}","g"),a.config[t]||"")}),this.dialogue=document.createElement("div"),this.dialogue.setAttribute("class","modal-ui-alert-auam"),o.addClass(this.dialogue,a.config.addClass),this.dialogue.innerHTML=i,this.config.showOverlay&&(this.overlay=document.createElement("div"),this.overlay.setAttribute("class","modal-ui-alert-overlay-auam"))},bindEvents:function(){var t=this;o.on(this.dialogue.querySelector(".btn-confirm-auam"),"click",function(e){e&&e.preventDefault&&e.preventDefault(),t.config.onConfirm&&t.config.onConfirm(t),t.close()}),o.on(this.dialogue.querySelector(".btn-cancel-auam"),"click",function(e){e&&e.preventDefault&&e.preventDefault(),t.config.onCancel&&t.config.onCancel(t),t.close()})},open:function(){var t=this;this.config.showOverlay&&a.appendChild(this.overlay),a.appendChild(this.dialogue),this.config.title&&o.removeClass(this.dialogue.querySelector(".title-auam"),"hide-auam"),this.config.confirmBtn||o.removeElement(this.dialogue.querySelector(".btn-confirm-auam")),this.config.cancelBtn||o.removeElement(this.dialogue.querySelector(".btn-cancel-auam")),this.config.toast&&(o.addClass(this.overlay,"modal-ui-toast-overlay-auam"),o.addClass(this.dialogue,"modal-ui-toast-auam")),o.css(this.dialogue,{top:(document.documentElement.clientHeight-this.dialogue.offsetHeight)/2+"px"}),this.bindEvents(),this.config.onShow&&this.config.onShow(this),(!this.config.confirmBtn&&!this.config.cancelBtn||this.config.toast)&&setTimeout(function(){t.close()},1e3*this.config.stayTime)},close:function(){o.removeElement(this.dialogue),this.overlay&&o.removeElement(this.overlay),this.config.onClose&&this.config.onClose(this)}},function(){var t='.modal-ui-alert-auam .hide-auam,.modal-ui-alert-auam.hide-auam,.modal-ui-alert-overlay-auam.hide-auam{display:none}.modal-ui-alert-overlay-auam{position:fixed;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,.5)}.modal-ui-alert-auam{position:fixed;left:45%;top:22%;width:82%;font-size:15px;color:#111}.modal-ui-alert-auam .inner-auam{margin-left:-45%;width:100%;background-color:#fff;border-radius:4px;-webkit-border-radius:4px;box-shadow:0 0 3px #999;-webkit-box-shadow:0 0 3px #999}.modal-ui-alert-auam .buttons-auam{display:box;display:-webkit-box;overflow:hidden}.modal-ui-alert-auam .buttons-auam .btn-cancel-auam,.modal-ui-alert-auam .buttons-auam .btn-confirm-auam{display:block;box-flex:1;-webkit-box-flex:1;border-top:#aaa 1px solid;border-left:#aaa 1px solid;margin-left:-1px;text-align:center;height:46px;line-height:46px;font-size:16px;font-weight:700;text-decoration:none;color:#3c76e0}@media (-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2){.modal-ui-alert-auam .buttons-auam .btn-alert-auam{position:relative;border-top:none;border-left:none}.modal-ui-alert-auam .btn-alert-auam::after{content:" ";display:block;position:absolute;left:0;top:0;width:200%;height:200%;border-top:#aaa 1px solid;border-left:#aaa 1px solid;-webkit-transform:scale(.5) translate(-50%,-50%);transform:scale(.5) translate(-50%,-50%)}}.modal-ui-alert-auam .title-auam{padding:0;margin:0;font-size:16px;text-indent:1em;height:46px;line-height:46px;border-bottom:#aaa 1px solid}@media (-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2){.modal-ui-alert-auam .title-auam{position:relative;border-bottom:none}.modal-ui-alert-auam .title-auam::after{content:" ";display:block;position:absolute;left:0;bottom:0;width:200%;height:0;border-bottom:1px solid #aaa;-webkit-transform:scale(.5) translate(-50%,-50%);transform:scale(.5) translate(-50%,-50%)}}.modal-ui-alert-auam .info-auam{padding:29px 10px;line-height:1.5;text-align:center}.modal-ui-toast-overlay-auam{background-color:transparent}.modal-ui-toast-auam{color:#fefefe}.modal-ui-toast-auam .inner-auam{background:0 0;-webkit-box-shadow:none;text-align:center}.modal-ui-toast-auam .info-auam{background-color:rgba(0,0,0,.6);padding:6px 11px;display:inline-block;border-radius:4px}.modal-ui-toast-auam .buttons-auam{display:none}',e=document.createElement("style"),a=document.getElementsByTagName("head")[0];e.setAttribute("type","text/css"),e.innerHTML=t,a.appendChild(e)}(),n});