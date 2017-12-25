"use strict";

const WallEntity = (function(){

  function extend(entity){
    entity.image = asset_depot.add_image("wall", "assets/wall.png");
    return entity;
  }

  return {
    create: function(value, x, y, z, rotation, width, height){
      return extend(SpriteEntity.create(value, x, y, z, rotation, width, height));
    }
  }  
})();
