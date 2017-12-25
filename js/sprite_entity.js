"use strict";

const SpriteEntity = (function(){

  function render_sides(entity, ctx){
    ctx.fillStyle = "rgba(32, 32, 32, 0.3)";
    ctx.beginPath();
    ctx.moveTo(0, entity.width/2/2-entity.z);
    ctx.lineTo(-entity.width/2, 0-entity.z);
    ctx.lineTo(-entity.width/2, -entity.height/2-entity.z);
    ctx.lineTo(0, entity.width/2/2-entity.height/2-entity.z);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(64, 64, 64, 0.3)";
    ctx.beginPath();
    ctx.moveTo(0, entity.width/2/2-entity.z);
    ctx.lineTo(entity.width/2, 0-entity.z);
    ctx.lineTo(entity.width/2, -entity.height/2-entity.z);
    ctx.lineTo(0, entity.width/2/2-entity.height/2-entity.z);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.beginPath();
    ctx.moveTo(0, entity.width/2/2-entity.height/2-entity.z);
    ctx.lineTo(-entity.width/2, -entity.height/2-entity.z);
    ctx.lineTo(0, -entity.width/2/2-entity.height/2-entity.z);    
    ctx.lineTo(entity.width/2, -entity.height/2-entity.z);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function render_image(entity, ctx){
    let x = -entity.width/2;
    let y = -entity.width/2/2-entity.height/2-entity.z;
    let width = entity.width;
    let height = (entity.width/2/2-entity.z) - (-entity.width/2/2-entity.height/2-entity.z);
    ctx.drawImage(entity.image, x, y, width, height);
  }

  function render_shadow(entity, ctx){
    ctx.fillStyle = "rgba(10, 10, 10, 0.72)";
    ctx.beginPath();
    ctx.moveTo(0, entity.width/2/2);
    ctx.lineTo(-entity.width/2, 0);
    ctx.lineTo(0, -entity.width/2/2);    
    ctx.lineTo(entity.width/2, 0);
    ctx.closePath();
    ctx.fill();
  }

  function render(entity, ctx){
    ctx.strokeStyle = "#d17a26";

    if(entity.shadow || entity.z > 0)
      render_shadow(entity, ctx);

    render_image(entity, ctx);

    render_sides(entity, ctx);

    //ctx.textAlign="center"; 
    //ctx.strokeText("["+entity.value+"]", 0, -entity.height/2-entity.z);

  }

  function extend(entity, asset){
    entity.image = asset;
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
