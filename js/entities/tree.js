"use strict";

const TreeEntity = (function(){

  function extend(entity){
    entity.image = asset_depot.add_image("tree", "assets/tree.png");
    return entity;
  }

  return {
    create: function(value, x, y, z, rotation, width, height){
      return extend(SpriteEntity.create(value, x, y, z, rotation, width, height));
    }
  }  
})();
