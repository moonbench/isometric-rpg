"use strict";

const TableGirl = (function(){

  function extend(entity){
    entity.image = asset_depot.add_image("table girl", "assets/desk_gal_s.png");
    return entity;
  }

  return {
    create: function(value, x, y, z, rotation, width, height){
      return extend(SpriteEntity.create(value, x, y, z, rotation, width, height));
    }
  }  
})();
