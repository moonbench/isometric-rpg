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

  function limit(value, min, max){
    return Math.max(min, Math.min(max, value));
  }

  function tile_for(x, y, tile_width, max_row, max_col){
    return [
      limit(Math.round((y)/tile_width), 0, max_row),
      limit(Math.round((x)/tile_width), 0, max_col)
    ];
  }

  return {
    cartesian_to_iso,
    iso_to_cartesian,
    normalize_angle,
    limit,
    tile_for,
  }  
})();
