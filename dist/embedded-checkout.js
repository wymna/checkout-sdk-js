module.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=183)}({0:function(t,e){t.exports=require("tslib")},118:function(t,e){t.exports=require("iframe-resizer")},119:function(t,e){t.exports=require("iframe-resizer/js/iframeResizer.contentWindow")},138:function(t,e,n){"use strict";var r=n(3),o=n(8),i=n(77),s=n(52),a=function(){function t(t,e){this._targetWindow=e,this._targetOrigin="*"===t?"*":Object(i.a)(t).origin}return t.prototype.post=function(t,e){var n=this;if(window!==this._targetWindow){if(!this._targetWindow)throw new Error("Unable to post message because target window is not set.");var i=e&&Object(r.fromEvent)(window,"message").pipe(Object(o.filter)((function(t){return t.origin===n._targetOrigin&&Object(s.a)(t.data,t.data.type)&&-1!==[e.successType,e.errorType].indexOf(t.data.type)})),Object(o.map)((function(t){if(e.errorType===t.data.type)throw t.data;return t.data})),Object(o.take)(1)).toPromise();return this._targetWindow.postMessage(t,this._targetOrigin),i}},t.prototype.setTarget=function(t){this._targetWindow=t},t}();e.a=a},139:function(t,e,n){"use strict";var r=n(0),o=n(77),i=n(87),s=n(52),a=function(){function t(t){this._sourceOrigin=Object(o.a)(t).origin,this._isListening=!1,this._listeners={}}return t.prototype.listen=function(){this._isListening||(this._isListening=!0,window.addEventListener("message",this._handleMessage))},t.prototype.stopListen=function(){this._isListening&&(this._isListening=!1,window.removeEventListener("message",this._handleMessage))},t.prototype.addListener=function(t,e){var n=this._listeners[t];n||(this._listeners[t]=n=[]),-1===n.indexOf(e)&&n.push(e)},t.prototype.removeListener=function(t,e){var n=this._listeners[t];if(n){var r=n.indexOf(e);r>=0&&n.splice(r,1)}},t.prototype.trigger=function(t){var e=this._listeners[t.type];e&&e.forEach((function(e){return e(t)}))},t.prototype._handleMessage=function(t){t.origin===this._sourceOrigin&&Object(s.a)(t.data,t.data.type)&&this.trigger(t.data)},Object(r.__decorate)([i.a],t.prototype,"_handleMessage",null),t}();e.a=a},141:function(t,e,n){"use strict";var r,o=n(40),i=n(139),s=n(138),a=n(178),c=n(77),u=n(0),d=n(87),p=n(21),l=function(t){function e(e){var n=t.call(this,e,{message:e.body.title})||this;return n.name="InvalidLoginTokenError",n.type="invalid_login_token",n}return Object(u.__extends)(e,t),e}(n(30).a),h=n(24);!function(t){t.MissingContainer="missing_container",t.MissingContent="missing_content",t.UnknownError="unknown_error"}(r||(r={}));var f=function(t){function e(e,n){void 0===n&&(n=r.UnknownError);var o=t.call(this,e||"Unable to embed the checkout form.")||this;return o.subtype=n,o.name="NotEmbeddableError",o.type="not_embeddable",o}return Object(u.__extends)(e,t),e}(h.a),m=n(95),y=function(){function t(t,e,n,r,o,i,s,a){var c=this;this._iframeCreator=t,this._messageListener=e,this._messagePoster=n,this._loadingIndicator=r,this._requestSender=o,this._storage=i,this._location=s,this._options=a,this._isAttached=!1,this._options.onComplete&&this._messageListener.addListener(p.a.CheckoutComplete,this._options.onComplete),this._options.onError&&this._messageListener.addListener(p.a.CheckoutError,this._options.onError),this._options.onLoad&&this._messageListener.addListener(p.a.CheckoutLoaded,this._options.onLoad),this._options.onFrameLoad&&this._messageListener.addListener(p.a.FrameLoaded,this._options.onFrameLoad),this._options.onSignOut&&this._messageListener.addListener(p.a.SignedOut,this._options.onSignOut),this._messageListener.addListener(p.a.FrameLoaded,(function(){return c._configureStyles()}))}return t.prototype.attach=function(){var t=this;return this._isAttached?Promise.resolve(this):(this._isAttached=!0,this._messageListener.listen(),this._loadingIndicator.show(this._options.containerId),this._allowCookie().then((function(){return t._attemptLogin()})).then((function(e){return t._iframeCreator.createFrame(e,t._options.containerId)})).then((function(e){t._iframe=e,t._configureStyles(),t._loadingIndicator.hide()})).catch((function(e){return t._isAttached=!1,t._retryAllowCookie(e).catch((function(){throw t._messageListener.trigger({type:p.a.FrameError,payload:e}),t._loadingIndicator.hide(),e}))})).then((function(){return t})))},t.prototype.detach=function(){this._isAttached&&(this._isAttached=!1,this._messageListener.stopListen(),this._iframe&&this._iframe.parentNode&&(this._iframe.parentNode.removeChild(this._iframe),this._iframe.iFrameResizer.close()))},t.prototype._configureStyles=function(){this._iframe&&this._iframe.contentWindow&&this._options.styles&&(this._messagePoster.setTarget(this._iframe.contentWindow),this._messagePoster.post({type:m.a.StyleConfigured,payload:this._options.styles}))},t.prototype._attemptLogin=function(){return/^\/login\/token/.test(Object(c.a)(this._options.url).pathname)?this._requestSender.post(this._options.url).then((function(t){return t.body.redirectUrl})).catch((function(t){return Promise.reject(new l(t))})):Promise.resolve(this._options.url)},t.prototype._allowCookie=function(){if(this._storage.getItem("isCookieAllowed"))return Promise.resolve();this._storage.setItem("isCookieAllowed",!0),this._storage.setItem("lastAllowCookieAttempt",Date.now());var t=Object(c.a)(this._options.url).origin+"/embedded-checkout/allow-cookie?returnUrl="+encodeURIComponent(this._location.href);return document.body.style.visibility="hidden",this._location.replace(t),new Promise((function(){}))},t.prototype._retryAllowCookie=function(t){var e=Number(this._storage.getItem("lastAllowCookieAttempt"));return(!e||Date.now()-e>6e5)&&t instanceof f&&t.subtype===r.MissingContent?(this._storage.removeItem("lastAllowCookieAttempt"),this._storage.removeItem("isCookieAllowed"),this._allowCookie()):Promise.reject()},t=Object(u.__decorate)([d.a],t)}(),_={size:70,color:"#d9d9d9",backgroundColor:"#ffffff"},g="embedded-checkout-loading-indicator-rotation",b=function(){function t(t){this._styles=Object(u.__assign)(Object(u.__assign)({},_),t&&t.styles),this._defineAnimation(),this._container=this._buildContainer(),this._indicator=this._buildIndicator(),this._container.appendChild(this._indicator)}return t.prototype.show=function(t){if(t){var e=document.getElementById(t);if(!e)throw new Error("Unable to attach the loading indicator because the parent ID is not valid.");e.appendChild(this._container)}this._container.style.visibility="visible",this._container.style.opacity="1"},t.prototype.hide=function(){var t=this,e=function(){t._container.style.visibility="hidden",t._container.removeEventListener("transitionend",e)};this._container.addEventListener("transitionend",e),this._container.style.opacity="0"},t.prototype._buildContainer=function(){var t=document.createElement("div");return t.style.display="block",t.style.bottom="0",t.style.left="0",t.style.height="100%",t.style.width="100%",t.style.position="absolute",t.style.right="0",t.style.top="0",t.style.transition="all 250ms ease-out",t.style.opacity="0",t},t.prototype._buildIndicator=function(){var t=document.createElement("div");return t.style.display="block",t.style.width=this._styles.size+"px",t.style.height=this._styles.size+"px",t.style.borderRadius=this._styles.size+"px",t.style.border="solid 1px",t.style.borderColor=this._styles.backgroundColor+" "+this._styles.backgroundColor+" "+this._styles.color+" "+this._styles.color,t.style.margin="0 auto",t.style.position="absolute",t.style.left="0",t.style.right="0",t.style.top="50%",t.style.transform="translateY(-50%) rotate(0deg)",t.style.transformStyle="preserve-3d",t.style.animation=g+" 500ms infinite cubic-bezier(0.69, 0.31, 0.56, 0.83)",t},t.prototype._defineAnimation=function(){if(!document.getElementById(g)){var t=document.createElement("style");t.id=g,document.head.appendChild(t),t.sheet instanceof CSSStyleSheet&&t.sheet.insertRule("\n                @keyframes "+g+" {\n                    0% { transform: translateY(-50%) rotate(0deg); }\n                    100% { transform: translateY(-50%) rotate(360deg); }\n                }\n            ",0)}},t}(),v=n(52),w=n(181),O=function(){function t(t){this._options=t}return t.prototype.createFrame=function(t,e){var n=document.getElementById(e),o=(this._options||{}).timeout,i=void 0===o?6e4:o;if(!n)throw new f("Unable to embed the iframe because the container element could not be found.",r.MissingContainer);var s=document.createElement("iframe");return s.src=t,s.style.border="none",s.style.display="none",s.style.width="100%",s.allowPaymentRequest=!0,n.appendChild(s),this._toResizableFrame(s,i).catch((function(t){throw n.removeChild(s),t}))},t.prototype._toResizableFrame=function(t,e){return new Promise((function(n,o){var i=window.setTimeout((function(){o(new f("Unable to embed the iframe because the content could not be loaded."))}),e),s=function(e){if(e.origin===Object(c.a)(t.src).origin&&(Object(v.a)(e.data,p.a.FrameError)&&(a(),o(new f(e.data.payload.message,r.MissingContent))),Object(v.a)(e.data,p.a.FrameLoaded))){t.style.display="";var i=e.data.payload&&e.data.payload.contentId,s=Object(w.a)({scrolling:!1,sizeWidth:!1,heightCalculationMethod:i?"taggedElement":"lowestElement"},t);a(),n(s[s.length-1])}},a=function(){window.removeEventListener("message",s),window.clearTimeout(i)};window.addEventListener("message",s)}))},t}();n.d(e,"a",(function(){return C}));var E="BigCommerce.EmbeddedCheckout";function C(t){var e=Object(c.a)(t.url).origin;return new y(new O,new i.a(e),new s.a(e),new b({styles:t.styles&&t.styles.loadingIndicator}),Object(o.createRequestSender)(),new a.a(E),window.location,t).attach()}},142:function(t,e,n){"use strict";var r=n(181),o=n(139),i=n(138),s=n(21);function a(t){if(t.payload&&t.payload.contentId){var e=document.getElementById(t.payload.contentId);e&&!e.hasAttribute("data-iframe-height")&&e.setAttribute("data-iframe-height","")}}var c=n(0);function u(t){return"string"==typeof t.message&&"string"==typeof t.type&&("string"==typeof t.subtype||!t.subtype)&&t instanceof Error}var d=n(87),p=n(95),l=function(){function t(t,e,n,r){void 0===r&&(r={}),this._messageListener=t,this._messagePoster=e,this._untargetedMessagePoster=n,this._messageHandlers=r,this._messageListener.listen()}return t.prototype.postComplete=function(){var t={type:s.a.CheckoutComplete};this._postMessage(t)},t.prototype.postError=function(t){var e={type:s.a.CheckoutError,payload:this._transformError(t)};this._postMessage(e)},t.prototype.postFrameError=function(t){var e={type:s.a.FrameError,payload:this._transformError(t)};this._postMessage(e,{untargeted:!0})},t.prototype.postFrameLoaded=function(t){var e={type:s.a.FrameLoaded,payload:t};this._postMessage(e)},t.prototype.postLoaded=function(){var t={type:s.a.CheckoutLoaded};this._postMessage(t)},t.prototype.postSignedOut=function(){var t={type:s.a.SignedOut};this._postMessage(t)},t.prototype.receiveStyles=function(t){this._messageListener.addListener(p.a.StyleConfigured,(function(e){var n=e.payload;t(n)}))},t.prototype._postMessage=function(t,e){if(this._notifyMessageHandlers(t),e&&e.untargeted)return this._untargetedMessagePoster.post(t);this._messagePoster.post(t)},t.prototype._notifyMessageHandlers=function(t){var e=this;Object.keys(this._messageHandlers).forEach((function(n){if(t.type===n){var r=e._messageHandlers[n];r&&r.call(null,t)}}))},t.prototype._transformError=function(t){return{message:t.message,type:u(t)?t.type:void 0,subtype:u(t)?t.subtype:void 0}},t=Object(c.__decorate)([d.a],t)}(),h=function(){function t(){}return t.prototype.postComplete=function(){},t.prototype.postError=function(){},t.prototype.postFrameError=function(){},t.prototype.postFrameLoaded=function(){},t.prototype.postLoaded=function(){},t.prototype.postSignedOut=function(){},t.prototype.receiveStyles=function(){},t=Object(c.__decorate)([d.a],t)}();function f(t){var e;Object(r.b)();var n=t.parentWindow||window.parent;return window===n?new h:new l(new o.a(t.parentOrigin),new i.a(t.parentOrigin,n),new i.a("*",n),((e={})[s.a.FrameLoaded]=a,e))}n.d(e,"a",(function(){return f}))},178:function(t,e,n){"use strict";var r=n(62),o=n.n(r),i=function(){function t(t){this._namespace=t}return t.prototype.getItem=function(t){var e=o.a.getItem(this.withNamespace(t));if(null===e)return null;try{return JSON.parse(e)}catch(e){return this.removeItem(this.withNamespace(t)),null}},t.prototype.getItemOnce=function(t){var e=this.getItem(t);return this.removeItem(t),e},t.prototype.setItem=function(t,e){return o.a.setItem(this.withNamespace(t),JSON.stringify(e))},t.prototype.removeItem=function(t){return o.a.removeItem(this.withNamespace(t))},t.prototype.withNamespace=function(t){return this._namespace+"."+t},t}();e.a=i},181:function(t,e,n){"use strict";function r(t,e){return(0,n(118).iframeResizer)(t,e)}function o(){n(119)}n.d(e,"a",(function(){return r})),n.d(e,"b",(function(){return o}))},183:function(t,e,n){"use strict";n.r(e);var r=n(141);n.d(e,"embedCheckout",(function(){return r.a}));var o=n(142);n.d(e,"createEmbeddedCheckoutMessenger",(function(){return o.a}))},21:function(t,e,n){"use strict";var r;n.d(e,"a",(function(){return r})),function(t){t.CheckoutComplete="CHECKOUT_COMPLETE",t.CheckoutError="CHECKOUT_ERROR",t.CheckoutLoaded="CHECKOUT_LOADED",t.FrameError="FRAME_ERROR",t.FrameLoaded="FRAME_LOADED",t.SignedOut="SIGNED_OUT"}(r||(r={}))},24:function(t,e,n){"use strict";var r=n(0);var o=function(t){function e(e){var n,r,o=this.constructor,i=t.call(this,e||"An unexpected error has occurred.")||this;return i.name="StandardError",i.type="standard",n=i,r=o.prototype,Object.setPrototypeOf?Object.setPrototypeOf(n,r):n.__proto__=r,"function"==typeof Error.captureStackTrace?Error.captureStackTrace(i,o):i.stack=new Error(i.message).stack,i}return Object(r.__extends)(e,t),e}(Error);e.a=o},3:function(t,e){t.exports=require("rxjs")},30:function(t,e,n){"use strict";var r=n(0),o=n(24),i={body:{},headers:{},status:0},s=function(t){function e(e,n){var r=void 0===n?{}:n,o=r.message,s=r.errors,a=this,c=e||i,u=c.body,d=c.headers,p=c.status;return(a=t.call(this,o||"An unexpected error has occurred.")||this).name="RequestError",a.type="request",a.body=u,a.headers=d,a.status=p,a.errors=s||[],a}return Object(r.__extends)(e,t),e}(o.a);e.a=s},40:function(t,e){t.exports=require("@bigcommerce/request-sender")},52:function(t,e,n){"use strict";function r(t,e){return t.type===e}n.d(e,"a",(function(){return r}))},53:function(t,e,n){"use strict";var r=n(0),o=function(t){function e(e){var n=t.call(this,e||"Invalid arguments have been provided.")||this;return n.name="InvalidArgumentError",n.type="invalid_argument",n}return Object(r.__extends)(e,t),e}(n(24).a);e.a=o},62:function(t,e){t.exports=require("local-storage-fallback")},77:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var r=n(53);function o(t){if(!/^(https?:)?\/\//.test(t))throw new r.a("The provided URL must be absolute.");var e=document.createElement("a");e.href=t;var n=e.port&&-1!==t.indexOf(e.hostname+":"+e.port)?e.port:"";return{hash:e.hash,hostname:e.hostname,href:e.href,origin:e.protocol+"//"+e.hostname+(n?":"+n:""),pathname:e.pathname,port:n,protocol:e.protocol,search:e.search}}},8:function(t,e){t.exports=require("rxjs/operators")},87:function(t,e,n){"use strict";var r=n(0);function o(t,e,n){if("function"!=typeof n.value)return n;var o=n.value;return{get:function(){var t=o.bind(this);return Object.defineProperty(this,e,Object(r.__assign)(Object(r.__assign)({},n),{value:t})),t},set:function(t){o=t}}}e.a=function(t,e,n){return e&&n?o(t,e,n):function(t){var e=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(r.__extends)(e,t),e}(t);return Object.getOwnPropertyNames(t.prototype).forEach((function(n){var r=Object.getOwnPropertyDescriptor(t.prototype,n);r&&"constructor"!==n&&Object.defineProperty(e.prototype,n,o(t.prototype,n,r))})),e}(t)}},95:function(t,e,n){"use strict";var r;n.d(e,"a",(function(){return r})),function(t){t.StyleConfigured="STYLE_CONFIGURED"}(r||(r={}))}});
//# sourceMappingURL=embedded-checkout.js.map