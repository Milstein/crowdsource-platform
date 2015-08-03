(function(a){if(typeof(Wicket)==="undefined"){window.Wicket={}
}if(typeof(Wicket.Event)==="object"){return
}jQuery.extend(true,Wicket,{Browser:{isKHTML:function(){return(/Konqueror|KHTML/).test(window.navigator.userAgent)&&!/Apple/.test(window.navigator.userAgent)
},isSafari:function(){return !/Chrome/.test(window.navigator.userAgent)&&/KHTML/.test(window.navigator.userAgent)&&/Apple/.test(window.navigator.userAgent)
},isChrome:function(){return(/KHTML/).test(window.navigator.userAgent)&&/Apple/.test(window.navigator.userAgent)&&/Chrome/.test(window.navigator.userAgent)
},isOpera:function(){return !Wicket.Browser.isSafari()&&typeof(window.opera)!=="undefined"
},isIE:function(){return !Wicket.Browser.isSafari()&&typeof(document.all)!=="undefined"&&typeof(window.opera)==="undefined"
},isIEQuirks:function(){return Wicket.Browser.isIE()&&window.document.documentElement.clientHeight===0
},isIELessThan7:function(){var c=window.navigator.userAgent.indexOf("MSIE");
var b=parseFloat(window.navigator.userAgent.substring(c+5));
return Wicket.Browser.isIE()&&b<7
},isIE7:function(){var c=window.navigator.userAgent.indexOf("MSIE");
var b=parseFloat(window.navigator.userAgent.substring(c+5));
return Wicket.Browser.isIE()&&b>=7
},isIELessThan9:function(){var c=window.navigator.userAgent.indexOf("MSIE");
var b=parseFloat(window.navigator.userAgent.substring(c+5));
return Wicket.Browser.isIE()&&b<9
},isGecko:function(){return(/Gecko/).test(window.navigator.userAgent)&&!Wicket.Browser.isSafari()
}},Event:{idCounter:0,getId:function(c){var b=jQuery(c),d=b.prop("id");
if(typeof(d)==="string"&&d.length>0){return d
}else{d="wicket-generated-id-"+Wicket.Event.idCounter++;
b.prop("id",d);
return d
}},keyCode:function(b){return Wicket.Event.fix(b).keyCode
},stop:function(b,c){b=Wicket.Event.fix(b);
if(c){b.stopImmediatePropagation()
}else{b.stopPropagation()
}return b
},fix:function(b){var c=b||window.event;
return jQuery.event.fix(c)
},fire:function(b,c){c=(c==="mousewheel"&&Wicket.Browser.isGecko())?"DOMMouseScroll":c;
jQuery(b).trigger(c)
},add:function(b,d,c,e){if(d==="domready"){jQuery(c)
}else{jQuery(function(){d=(d==="mousewheel"&&Wicket.Browser.isGecko())?"DOMMouseScroll":d;
var f=b;
if(typeof(b)==="string"){f=document.getElementById(b)
}if(!f&&Wicket.Log){Wicket.Log.error('Cannot bind a listener for event "'+d+'" on element "'+b+'" because the element is not in the DOM')
}jQuery(f).on(d,e,c)
})
}return b
},remove:function(b,d,c){jQuery(b).off(d,c)
},subscribe:function(b,c){if(b){jQuery(document).on(b,c)
}},unsubscribe:function(b,c){if(b){if(c){jQuery(document).off(b,c)
}else{jQuery(document).off(b)
}}else{jQuery(document).off()
}},publish:function(c){if(c){var b=Array.prototype.slice.call(arguments).slice(1);
jQuery(document).triggerHandler(c,b);
jQuery(document).triggerHandler("*",b)
}},Topic:{DOM_NODE_REMOVING:"/dom/node/removing",DOM_NODE_ADDED:"/dom/node/added",AJAX_CALL_BEFORE:"/ajax/call/before",AJAX_CALL_PRECONDITION:"/ajax/call/precondition",AJAX_CALL_BEFORE_SEND:"/ajax/call/beforeSend",AJAX_CALL_SUCCESS:"/ajax/call/success",AJAX_CALL_COMPLETE:"/ajax/call/complete",AJAX_CALL_AFTER:"/ajax/call/after",AJAX_CALL_FAILURE:"/ajax/call/failure"}}})
})();