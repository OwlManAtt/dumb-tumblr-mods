// ==UserScript==
// @name        Tumblr - Change default blog
// @namespace   yshi
// @include     https://www.tumblr.com/*
// @version     1.0.1
// @description Changes the default blog to one of your secondary blogs when posting/reblogging stuff. 
// @grant       none
// ==/UserScript==

// Found on <https://github.com/OwlManAtt/dumb-tumblr-mods>.

// Change this to the data-option-value for the blog you'd like to default to.
var defaultBlogDataOptionValue = 'yshijustice';

/* ========== !! Don't play with it after this point if you don't know how to computer !! ========== */
var $ = unsafeWindow.jQuery;

var changeDefault = (function(){
    secondaryBlog = $('div[data-option-value=' + defaultBlogDataOptionValue + ']');
    currentChannelId = document.getElementById('channel_id');
    
    if(currentChannelId === null)
    {
       return;        
    }
    
    if(secondaryBlog.length > 0 && currentChannelId.value.toLowerCase() !== defaultBlogDataOptionValue.toLowerCase()){
      secondaryBlog.click();
    }
});

// Lifted from <http://stackoverflow.com/questions/3219758/detect-changes-in-the-dom/14570614#14570614>
var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;
    
    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                    // Disable for the duration of the callback so we can mutate the page without self-notifying
                    obs.disconnect();
                    callback();
                    obs.observe( obj, { childList:true, subtree:true });
            });
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true });
        }
        else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            // obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    }
})();

// Observe a specific DOM element:
observeDOM(document.body, changeDefault);
