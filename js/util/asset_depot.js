"use strict";

const AssetDepot = (function(){

  function add_image(depot, key, src){
    depot.images[key] = document.createElement("img");
    depot.images[key].src = src;
    return depot.images[key];
  }

  function add_audio(depot, key, src){
    depot.audio[key] = document.createElement("audio");
    depot.audio[key].src = src;
    depot.audio[key].volume = 0.25;
    return depot.audio[key];
  }

  return {
    create: function(){
      var depot = {
        images: {},
        audio: {},
      };

      depot.add_image = function(key, src){ return add_image(depot, key, src) };
      depot.add_audio = function(key, src){ return add_audio(depot, key, src) };

      return depot;
    }
  }
})();
