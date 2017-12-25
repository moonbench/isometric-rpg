"use strict";

const Util = (function(){

  function cartesian_to_iso(x, y){
    return [
      (y-x)/2,
      (x+y)/2
    ];
  }
  function iso_to_cartesian(x, y){
    return [
      (2 * y - x),
      (2 * y + x)
    ];
  }

  function normalize_angle(angle){
    angle = angle % (Math.PI * 2);
    return angle >= 0 ? angle : angle += Math.PI*2;
  }

  return {
    cartesian_to_iso,
    iso_to_cartesian,
    normalize_angle,
  }  
})();
