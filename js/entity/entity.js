"use strict";

const Entity = (function(){
  const ROTATION = {
    E: 0,
    SE: 1,
    S: 2,
    SW: 3,
    W: 4,
    NW: 5,
    N: 6,
    NE: 7,
  }

  function render_shell(entity, ctx){
    ctx.strokeStyle = "#d17a26";

    ctx.fillStyle = "rgba(32, 32, 32, 0.4)";
    ctx.beginPath();
    ctx.moveTo(0, entity.width/2/2-entity.z);
    ctx.lineTo(-entity.width/2, 0-entity.z);
    ctx.lineTo(-entity.width/2, -entity.height/2-entity.z);
    ctx.lineTo(0, entity.width/2/2-entity.height/2-entity.z);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(16, 16, 16, 0.32)";
    ctx.beginPath();
    ctx.moveTo(0, entity.width/2/2-entity.z);
    ctx.lineTo(entity.width/2, 0-entity.z);
    ctx.lineTo(entity.width/2, -entity.height/2-entity.z);
    ctx.lineTo(0, entity.width/2/2-entity.height/2-entity.z);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.beginPath();
    ctx.moveTo(0, entity.width/2/2-entity.height/2-entity.z);
    ctx.lineTo(-entity.width/2, -entity.height/2-entity.z);
    ctx.lineTo(0, -entity.width/2/2-entity.height/2-entity.z);    
    ctx.lineTo(entity.width/2, -entity.height/2-entity.z);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function render_shadow(entity, ctx){
    ctx.fillStyle = "rgba(10, 10, 10, 0.72)";
    const size = entity.width/(Math.max(1,entity.z/10));
    ctx.beginPath();
    ctx.moveTo(0, size/2/2);
    ctx.lineTo(-size/2, 0);
    ctx.lineTo(0, -size/2/2);    
    ctx.lineTo(size/2, 0);
    ctx.closePath();
    ctx.fill();
  }

  function pre_render(entity, ctx){
    if(entity.shadow || entity.z > 0)
      render_shadow(entity, ctx);
  }

  function render(entity, ctx){
  }

  function post_render(entity, ctx){
    if(entity.debug_level<1) return;
    entity.render_shell(ctx);

    if(entity.debug_level<2) return;
    ctx.textAlign="center"; 
    ctx.strokeText("["+entity.value+"]", 0, -entity.height/2-entity.z);
  }

  return {
    create: function(value, x, y, z, rotation, width, height){
      const entity = {
        value,
        x,
        y,
        z,
        rotation,
        width,
        height,
        shadow: false,
        parent_tile: null,
        debug_level: 1,
      };

      entity.pre_render = function(ctx){ pre_render(entity, ctx); }
      entity.post_render = function(ctx){ post_render(entity, ctx); }
      entity.render_shell = function(ctx){ render_shell(entity, ctx); }
      entity.render = function(ctx){ render(entity, ctx); }
      entity.update = function(dt){ }

      return entity;
    }
  }  
})();
