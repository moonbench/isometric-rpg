"use strict";

const Ground = (function(){

  function update(ground, dt){

    ground.map.forEach(function(row){
      row.forEach(function(tile){
        tile.update(dt);
      })
    })

    ground.entities.forEach(function(entity){
      place_entity_on_tiles(ground, entity);
    });
  }

  function render_tile(ground, row, col, ctx, highlight, lowlight){
    if(ground.map.length <= row || row < 0 || ground.map[row].length <= col || col < 0){
      console.log("No tile at " + row + ", " + col);
      console.log("\t" + highlight + " - " + lowlight);
      world.break();
      return;
    }
    const tile = ground.map[row][col];
    const coords = ground.world.engine.viewport.map_coords_to_canvas(row*Tile.WIDTH, col*Tile.WIDTH);    
    tile.lowlight = lowlight;
    tile.highlight = highlight;

    ctx.save();
    ctx.translate(coords[0], coords[1]-tile.z/2);
    tile.render(ctx);
    if(tile.lowlight){
      ctx.textAlign="center"; 
      ctx.strokeStyle = "#AA0000";
      ctx.strokeText(row + ", " + col, 0, 0);
    }
    ctx.restore();
  }

  function render_tiles(world, ctx){
    const limits = ground.world.engine.viewport.visible_map_limits();
    const min_row = Math.min(ground.map.length-1, Math.max(0, limits[1][0]-1));
    const max_row = Math.min(ground.map.length-1, Math.max(0, limits[2][0]+1));
    const min_col = Math.min(ground.map[0].length-1, Math.max(0, limits[0][1]-1));
    const max_col = Math.min(ground.map[0].length-1, Math.max(0, limits[3][1]+1));

    const cursor_map_coords = ground.world.engine.viewport.canvas_coords_to_map(
      ground.world.engine.cursor.x,
      ground.world.engine.cursor.y
    );
    const cursor_row = Math.round((cursor_map_coords[0])/Tile.WIDTH);
    const cursor_col = Math.round((cursor_map_coords[1])/Tile.WIDTH);

    render_top_half(ground, ctx, min_row, max_row, min_col, max_col, cursor_row, cursor_col);
    render_bottom_half(ground, ctx, min_row, max_row, min_col, max_col, cursor_row, cursor_col);
  }
  function render_top_half(ground, ctx, min_row, max_row, min_col, max_col, cursor_row, cursor_col){
    for(let starting_col = min_col; starting_col <= max_col; starting_col++){
      for(let row = min_row; row <= max_row && starting_col + (min_row-row) >= min_col; row++){
        const col = starting_col + (min_row-row);
        render_tile(ground, row, col, ctx, false, cursor_row == row && cursor_col == col);
      }
    }
  }
  function render_bottom_half(ground, ctx, min_row, max_row, min_col, max_col, cursor_row, cursor_col){
    for(let starting_row = min_row+1; starting_row <= max_row; starting_row++){
      for(let col = max_col; col >= min_col && starting_row + (max_col-col) <= max_row; col--){
        const row = starting_row + (max_col-col);
        render_tile(ground, row, col, ctx, false, cursor_row == row && cursor_col == col);
      }
    }
  }


  function render(ground, ctx){
    render_tiles(ground, ctx);
  }

  function tiles_from_array(tile_types, tile_array){
    return tile_array.map(function(row, y_coord){
      return row.map(function(cell, x_coord){
        if(tile_types[cell[0]])
          return tile_types[cell[0]].create(x_coord*Tile.WIDTH, y_coord*Tile.WIDTH, cell[1]);
        else if(tile_types[cell[0]] === null)
          return NullTile.create();
        else
          return Tile.create(x_coord*Tile.WIDTH, ycoord*Tile.WIDTH, cell[1]);
      })
    });
  }

  function set_tiles(ground, tile_array){
    ground.map = tiles_from_array(ground.tile_types, tile_array);
  }

  function place_entity_on_tiles(ground, entity){
    const center_coord = [    
      Math.min(ground.map.length-1, Math.max(0, Math.ceil((entity.y-Tile.WIDTH/2)/Tile.WIDTH))),
      Math.min(ground.map[0].length-1, Math.max(0, Math.ceil((entity.x-Tile.WIDTH/2)/Tile.WIDTH))),
    ];
    ground.map[center_coord[0]][center_coord[1]].add_entity_center(entity);

    const max_coord = [    
      Math.min(ground.map.length-1, Math.max(0, Math.ceil((entity.y+entity.width/2-Tile.WIDTH/2)/Tile.WIDTH))),
      Math.min(ground.map[0].length-1, Math.max(0, Math.ceil((entity.x+entity.width/2-Tile.WIDTH/2)/Tile.WIDTH))),
    ];
    const z_offset = ground.map[center_coord[0]][center_coord[1]].z - ground.map[max_coord[0]][max_coord[1]].z;
    ground.map[max_coord[0]][max_coord[1]].add_entity_render_point(entity, z_offset);
  }

  function add_entity(ground, entity){
    ground.entities.push(entity);
    place_entity_on_tiles(ground, entity);
  }

  return {
    create: function(){
      const ground = {
        tile_types: [],
        map: [],

        world: null,

        entities: [],
      };

      ground.update = function(dt){ update(ground, dt); }
      ground.render = function(ctx){ render(ground, ctx); }

      ground.set_tile_types = function(tile_type_map){ ground.tile_types = tile_type_map; }
      ground.set_tiles = function(tile_array){ set_tiles(ground, tile_array); }

      ground.add_entity = function(entity){ add_entity(ground, entity); }

      return ground;
    }
  }  
})();
