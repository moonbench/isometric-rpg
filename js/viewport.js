"use strict";

const Viewport = (function(){
  function clear(viewport, ctx){    
    ctx.clearRect(0, 0, viewport.width, viewport.height); 
    //tx.clearRect(viewport.left_offset, viewport.top_offset, viewport.width, viewport.height); 
  }
  function render_border(viewport, ctx, dt){
    ctx.strokeStyle = "#3f4653";
    ctx.lineWidth = 15;
    ctx.strokeRect( viewport.left_offset, viewport.top_offset, viewport.width, viewport.height );
    ctx.lineWidth = 1;
  }

  return {
    create: function(canvas){
      const viewport = {
        width: canvas.width,
        height: canvas.height,
        top_offset: 0,
        left_offset: 0,
        x_world_offset: 0,
        y_world_offset: 0,
        scale: 1,
      };

      viewport.clear = function(ctx){ clear(viewport, ctx); }
      viewport.draw_border = function(ctx){ render_border(viewport, ctx); }

      viewport.center_on = function(x_offset, y_offset){
        viewport.x_world_offset = y_offset;
        viewport.y_world_offset = x_offset;
      }

      viewport.map_coords_to_canvas = function(x, y){
        const coords = Util.cartesian_to_iso(x-viewport.x_world_offset, y-viewport.y_world_offset);
        return [
          coords[0] + (viewport.left_offset + viewport.width/2)/viewport.scale,
          (coords[1]/2) + (viewport.top_offset + viewport.height/2)/viewport.scale,
        ];
      }

      viewport.canvas_coords_to_map = function (x, y){
        x = ((x/2 - viewport.left_offset)*2 + viewport.left_offset - viewport.width/2)/viewport.scale;
        y = ((y/2 - viewport.top_offset)*2 + viewport.top_offset - viewport.height/2)/viewport.scale;
        const coords = Util.iso_to_cartesian(x, y);
        coords[0] = (coords[0]+viewport.x_world_offset);
        coords[1] = (coords[1]+viewport.y_world_offset);
        return coords;
      }

      viewport.visible_map_limits = function(){
        const bottom_right_iso_coords = viewport.canvas_coords_to_map(
          viewport.width+viewport.left_offset,
          viewport.height+viewport.top_offset
        );
        const bottom_right_tile = [
          Math.ceil(bottom_right_iso_coords[0]/Tile.WIDTH),
          Math.floor(bottom_right_iso_coords[1]/Tile.WIDTH)
        ];

        const bottom_left_iso_coords = viewport.canvas_coords_to_map(
          viewport.left_offset,
          viewport.height+viewport.top_offset
        );
        const bottom_left_tile = [
          Math.floor(bottom_left_iso_coords[0]/Tile.WIDTH),
          Math.floor(bottom_left_iso_coords[1]/Tile.WIDTH)
        ];

        const top_left_iso_coords = viewport.canvas_coords_to_map(
          viewport.left_offset,
          viewport.top_offset
        );
        const top_left_tile = [
          Math.ceil(top_left_iso_coords[0]/Tile.WIDTH),
          Math.ceil(top_left_iso_coords[1]/Tile.WIDTH)
        ];

        const top_right_iso_coords = viewport.canvas_coords_to_map(
          viewport.width+viewport.left_offset,
          viewport.top_offset
        );
        const top_right_tile = [
          Math.ceil(top_right_iso_coords[0]/Tile.WIDTH),
          Math.ceil(top_right_iso_coords[1]/Tile.WIDTH)
        ];

        return [top_left_tile, top_right_tile, bottom_left_tile, bottom_right_tile];
  
      }

      return viewport;
    }
  }  
})();
