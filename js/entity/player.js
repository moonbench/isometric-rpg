"use strict";

const player_images = {
  "idle":  [
    asset_depot.add_image("player1_e", "assets/person1_e.png"),
    asset_depot.add_image("player1_s", "assets/person1_s.png"),
    asset_depot.add_image("player1_w", "assets/person1_w.png"),
    asset_depot.add_image("player1_n", "assets/person1_n.png"),
  ]
};

const PlayerEntity = (function(){

  function walk(entity, dt){    
    entity.is_dirty = true;

    const vector = Vector.create(entity.rotation*(Math.PI/2), 128*2.5);
    entity.x = vector.x_after(entity.x, dt);    
    entity.y = vector.y_after(entity.y, dt);
  }

  function update(entity, dt){
    entity.is_dirty = false;

    const cursor_map_coords = game.engine.viewport.canvas_coords_to_map(
      game.engine.cursor.x,
      game.engine.cursor.y
    );
    let angle = Util.normalize_angle(Math.atan2(cursor_map_coords[0]-entity.y, cursor_map_coords[1]-entity.x));
    angle = Math.floor((angle+Math.PI/4)/(Math.PI/2));
    entity.rotation = angle;

    if(entity.walking)
      walk(entity, dt);

    entity.image = player_images["idle"][angle%4];
  }

  function extend(entity, asset){

    entity.moveable = true;

    entity.update = function(dt){ update(entity, dt); }
    entity.handle_mouse_button = function(event, pressed){ entity.walking = pressed; }

    entity.render_after_tiles = true;
    return entity;
  }

  return {
    create: function(value, x, y, z, r, width, height){
      return extend(SpriteEntity.create(value, x, y, z, r, width, height));
    },
    extend
  }  
})();
