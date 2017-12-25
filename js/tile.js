"use strict";

const Tile = (function(){
  const WIDTH = 128;

  function draw_top_filled_polygon(tile, ctx){
    ctx.beginPath();
    ctx.moveTo(0, -WIDTH/4);
    ctx.lineTo(WIDTH/2, 0);
    ctx.lineTo(0, WIDTH/4);
    ctx.lineTo(-WIDTH/2, 0);
    ctx.lineTo(0, -WIDTH/4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function draw_left_filled_polygon(tile, ctx){
    ctx.beginPath();
    ctx.moveTo(-WIDTH/2, 0);
    ctx.lineTo(0, WIDTH/4);
    ctx.lineTo(0, WIDTH/4+tile.depth);
    ctx.lineTo(-WIDTH/2, tile.depth);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  function draw_right_filled_polygon(tile, ctx){
    ctx.beginPath();
    ctx.moveTo(WIDTH/2, 0);
    ctx.lineTo(0, WIDTH/4);
    ctx.lineTo(0, WIDTH/4+tile.depth);
    ctx.lineTo(WIDTH/2, tile.depth);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  function draw_top_image(tile, asset, ctx){
    ctx.drawImage(asset, -WIDTH/2, -WIDTH/4, WIDTH, WIDTH/2);
  }

  function render_entities(tile, ctx){
    tile.entities.forEach(function(entity){
      entity.render(ctx);
    });
  }

  function render_highlight(tile, ctx){
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.moveTo(0, -WIDTH/4);
    ctx.lineTo(WIDTH/2, 0);
    ctx.lineTo(0, WIDTH/4);
    ctx.lineTo(-WIDTH/2, 0);
    ctx.lineTo(0, -WIDTH/4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function render_lowlight(tile, ctx){
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.strokeStyle = "#567bb3";
    ctx.beginPath();
    ctx.moveTo(0, -WIDTH/4);
    ctx.lineTo(WIDTH/2, 0);
    ctx.lineTo(0, WIDTH/4);
    ctx.lineTo(-WIDTH/2, 0);
    ctx.lineTo(0, -WIDTH/4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function render(tile, ctx){
    ctx.strokeStyle = "#000000";

    if(tile.depth>0)
      tile.render_sides(ctx);

    tile.render_top(ctx);

    if(tile.highlight)
      tile.render_highlight(ctx);
    if(tile.lowlight)
      tile.render_lowlight(ctx);

    tile.render_entities(ctx);
  }

  function add_entity(tile, entity){
    tile.entities.push(entity);
  }

  return {
    create: function(z, depth = WIDTH/2){
      const tile = {
        z,
        depth,
        entities: [],
        highlight: false,
        lowlight: false,
      };

      tile.render_left_side = function(ctx){ ctx.fillStyle = "#888888"; draw_left_filled_polygon(tile, ctx); }
      tile.render_right_side = function(ctx){ ctx.fillStyle = "#cccccc"; draw_right_filled_polygon(tile, ctx); }
      tile.render_sides = function(ctx){ tile.render_left_side(ctx); tile.render_right_side(ctx); }
      tile.render_top = function(ctx){ ctx.fillStyle = "#FF00FF"; draw_top_filled_polygon(tile, ctx); }
      tile.render_entities = function(ctx){ render_entities(tile, ctx); }
      tile.render_highlight = function(ctx){ render_highlight(tile, ctx); }
      tile.render_lowlight = function(ctx){ render_lowlight(tile, ctx); }
      tile.render = function(ctx){ render(tile, ctx); }
      tile.add_entity = function(entity){ add_entity(tile, entity); }

      return tile;
    },
    WIDTH,
    draw_left_filled_polygon,
    draw_right_filled_polygon,
    draw_top_filled_polygon,
    draw_top_image,
  }
})();
