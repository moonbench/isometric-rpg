"use strict";

const Tile = (function(){
  const WIDTH = 128;

  const DEFAULT = {
    TOP_COLOR: "#FF00FF",
    LEFT_COLOR: "#888888",
    RIGHT_COLOR: "#CCCCCC",
  };

  function update(tile, dt){
    tile.highlight = false;
    tile.lowlight = false;

    tile.child_entities = tile.child_entities.map(function(entity){
      entity.update(dt);
      return entity;
    }).filter(function(entity){
      return entity.moveable != true;
    });

    tile.rendered_entities = tile.rendered_entities.filter(function(set){
      return set.entity.moveable != true;
    });
  }

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
    tile.rendered_entities.forEach(function(render_map){
      const entity = render_map.entity;
      ctx.save();
      if(entity.x != tile.x || entity.y != tile.y){
        const coords = Util.cartesian_to_iso(entity.y-tile.y, entity.x-tile.x);
        ctx.translate(coords[0], coords[1]/2 - Math.max(0,render_map.z_offset/2));
      }
      entity.pre_render(ctx);
      entity.render(ctx);
      entity.post_render(ctx);

      ctx.restore();
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

  function render_not_walkable(tile, ctx){
    ctx.fillStyle = "rgba(99,0,0,0.5)";
    ctx.lineWidth = 1;
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

  function render_lowlight(tile, ctx){
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.lineWidth = 1;
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

    if(tile.highlight)// || tile.child_entities.length > 0)
      tile.render_highlight(ctx);
    if(tile.lowlight)// || tile.rendered_entities.length > 0)
      tile.render_lowlight(ctx);
    //if(!tile.walkable)
      //tile.render_not_walkable(ctx);

    tile.render_entities(ctx);
  }

  function add_entity_center(tile, entity){
    tile.child_entities.push(entity);
    if(entity.width >= WIDTH)
      tile.walkable = false;
  }
  function add_entity_render_point(tile, entity, z_offset){
    tile.rendered_entities.push({entity, z_offset});
    tile.rendered_entities = tile.rendered_entities.sort(function(a, b){
      if(a.entity.x < b.entity.x || a.entity.y < b.entity.y)
        return -1;
      return 1;
    });

    entity.parent_tile = tile;
  }

  function render_top(tile, ctx){
    ctx.fillStyle = tile.top_color ? tile.top_color : DEFAULT.TOP_COLOR;
    if(!tile.top_image_asset || tile.top_color)
      draw_top_filled_polygon(tile, ctx);
    if(tile.top_image_asset)
      draw_top_image(tile, tile.top_image_asset, ctx);      
  }
  function render_left(tile, ctx){
    ctx.fillStyle = tile.left_color ? tile.left_color : DEFAULT.LEFT_COLOR;
    if(!tile.left_image_asset || tile.left_color)
      draw_left_filled_polygon(tile, ctx);
    if(tile.left_image_asset)
      draw_left_image(tile, tile.left_image_asset, ctx);   
  }
  function render_right(tile, ctx){
    ctx.fillStyle = tile.right_color ? tile.right_color : DEFAULT.RIGHT_COLOR;
    if(!tile.right_image_asset || tile.right_color)
      draw_right_filled_polygon(tile, ctx);
    if(tile.right_image_asset)
      draw_right_image(tile, tile.right_image_asset, ctx);   
  }
  return {
    create: function(x, y, z, depth = WIDTH/2){
      const tile = {
        x,
        y,
        z,
        depth,
        child_entities: [],
        rendered_entities: [],
        highlight: false,
        lowlight: false,
        walkable: false,
      };

      tile.render_left_side = function(ctx){ render_left(tile, ctx); }
      tile.render_right_side = function(ctx){ render_right(tile, ctx); }
      tile.render_top = function(ctx){ render_top(tile, ctx); }
      tile.render_sides = function(ctx){ tile.render_left_side(ctx); tile.render_right_side(ctx); }

      tile.render_entities = function(ctx){ render_entities(tile, ctx); }
      tile.render_highlight = function(ctx){ render_highlight(tile, ctx); }
      tile.render_lowlight = function(ctx){ render_lowlight(tile, ctx); }
      tile.render_not_walkable = function(ctx){ render_not_walkable(tile, ctx); }
      tile.render = function(ctx){ render(tile, ctx); }

      tile.update = function(dt){ update(tile, dt); }

      tile.add_entity_center = function(entity){ add_entity_center(tile, entity); }      
      tile.add_entity_render_point = function(entity, z_offset){ add_entity_render_point(tile, entity, z_offset); }

      return tile;
    },
    WIDTH,
    draw_left_filled_polygon,
    draw_right_filled_polygon,
    draw_top_filled_polygon,
    draw_top_image,
  }
})();
