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

  function render_sides(entity, ctx){
    ctx.fillStyle = "#222222";
    ctx.beginPath();
    ctx.moveTo(0, entity.width/2/2-entity.z);
    ctx.lineTo(-entity.width/2, 0-entity.z);
    ctx.lineTo(-entity.width/2, -entity.height/2-entity.z);
    ctx.lineTo(0, entity.width/2/2-entity.height/2-entity.z);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#444444";
    ctx.beginPath();
    ctx.moveTo(0, entity.width/2/2-entity.z);
    ctx.lineTo(entity.width/2, 0-entity.z);
    ctx.lineTo(entity.width/2, -entity.height/2-entity.z);
    ctx.lineTo(0, entity.width/2/2-entity.height/2-entity.z);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#000000";
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

    render_sides(entity, ctx);

    //ctx.textAlign="center"; 
    //ctx.strokeText("["+entity.value+"]", 0, -entity.height/2-entity.z);

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
      };

      entity.render_on = function(tile){ set_render_on(entity, tile); }
      entity.render = function(ctx){ render(entity, ctx); }
      entity.update = function(dt){ }

      return entity;
    }
  }  
})();
