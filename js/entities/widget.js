"use strict";

const Widget = (function(){

  function update(entity, dt){
    entity.float_offset += dt*2;
    entity.float_offset = entity.float_offset % (2*Math.PI);
    entity.z = entity.original_z + Math.sin(entity.float_offset)*2;
  }


  function extend(entity){
    entity.image = asset_depot.add_image("widget", "assets/widget_s.png");

    entity.float_offset = 0;
    entity.original_z = entity.z;

    entity.update = function(dt){ update(entity, dt); }

    return entity;
  }

  return {
    create: function(value, x, y, z, rotation, width, height){
      return extend(SpriteEntity.create(value, x, y, z, rotation, width, height));
    }
  }  
})();
