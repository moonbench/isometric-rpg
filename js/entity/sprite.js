"use strict";

const SpriteEntity = (function(){

  function render_image(entity, asset, ctx){
    let x = -entity.width/2;
    let y = -entity.width/2/2-entity.height/2-entity.z;
    let width = entity.width;
    let height = (entity.width/2/2-entity.z) - (-entity.width/2/2-entity.height/2-entity.z);
    ctx.drawImage(asset, x, y, width, height);


    if(entity.debug_level<2) return;
    ctx.strokeStyle = "#990000";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);
  }

  function render(entity, ctx){
    entity.render_image(ctx);
  }

  function extend(entity, asset){
    entity.image = asset;
    entity.debug_level = 0;

    entity.render_image = function(ctx){ render_image(entity, entity.image, ctx); }

    entity.render = function(ctx){ render(entity, ctx); }

    return entity;
  }

  return {
    create: function(value, x, y, z, r, width, height, asset){
      return extend(Entity.create(value, x, y, z, r, width, height), asset);
    },
    extend
  }  
})();
