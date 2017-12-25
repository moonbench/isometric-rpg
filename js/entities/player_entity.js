"use strict";

const player_images = {
  "idle":  [
    asset_depot.add_image("player_e", "assets/person_e.png"),
    asset_depot.add_image("player_se", "assets/person_se.png"),
    asset_depot.add_image("player_s", "assets/person_s.png"),
    asset_depot.add_image("player_sw", "assets/person_sw.png"),
    asset_depot.add_image("player_w", "assets/person_w.png"),
    asset_depot.add_image("player_nw", "assets/person_nw.png"),
    asset_depot.add_image("player_n", "assets/person_n.png"),
    asset_depot.add_image("player_ne", "assets/person_ne.png"),
  ]
};

const PlayerEntity = (function(){

  function walk(entity, dt){    
    entity.is_dirty = true;

    const sqrttwo = Math.pow(1,2);
    if(entity.rotation == 0 || entity.rotation == 1 || entity.rotation == 7)
      entity.x += Tile.WIDTH*2*dt;
    if(entity.rotation == 1 || entity.rotation == 2 || entity.rotation == 3)
      entity.y += Tile.WIDTH*2*dt;
    if(entity.rotation == 3 || entity.rotation == 4 || entity.rotation == 5)
      entity.x -= Tile.WIDTH*2*dt;
    if(entity.rotation == 5 || entity.rotation == 6 || entity.rotation == 7)
      entity.y -= Tile.WIDTH*2*dt;    
  }

  function update(entity, dt){
    entity.is_dirty = false;

    const cursor_map_coords = ground.world.engine.viewport.canvas_coords_to_map(
      ground.world.engine.cursor.x,
      ground.world.engine.cursor.y
    );
    let angle = Util.normalize_angle(Math.atan2(cursor_map_coords[0]-entity.y, cursor_map_coords[1]-entity.x));
    angle = Math.floor((angle+Math.PI/8)/(Math.PI/4))%8;
    entity.rotation = angle;

    if(entity.walking)
      walk(entity, dt);
  }

  function render_sides(entity, ctx){
    ctx.fillStyle = "rgba(32, 32, 32, 0.1)";
    ctx.beginPath();
    ctx.moveTo(0, entity.width/2/2-entity.z);
    ctx.lineTo(-entity.width/2, 0-entity.z);
    ctx.lineTo(-entity.width/2, -entity.height/2-entity.z);
    ctx.lineTo(0, entity.width/2/2-entity.height/2-entity.z);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(64, 64, 64, 0.1)";
    ctx.beginPath();
    ctx.moveTo(0, entity.width/2/2-entity.z);
    ctx.lineTo(entity.width/2, 0-entity.z);
    ctx.lineTo(entity.width/2, -entity.height/2-entity.z);
    ctx.lineTo(0, entity.width/2/2-entity.height/2-entity.z);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
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
    const asset = player_images["idle"][entity.rotation];
    let x = -entity.width/2;
    let y = -entity.width/2/2-entity.height/2-entity.z;
    let width = entity.width;
    let height = (entity.width/2/2-entity.z) - (-entity.width/2/2-entity.height/2-entity.z);
    ctx.drawImage(asset, x, y, width, height);
  }

  function render_shadow(entity, ctx){
    ctx.fillStyle = "#111111";
    ctx.beginPath();
    ctx.moveTo(0, entity.width/2/2);
    ctx.lineTo(-entity.width/2, 0);
    ctx.lineTo(0, -entity.width/2/2);    
    ctx.lineTo(entity.width/2, 0);
    ctx.closePath();
    ctx.fill();
  }

  function render_debug(entity, ctx){
  }

  function render(entity, ctx){
    ctx.strokeStyle = "#d17a26";

    if(entity.shadow || entity.z > 0)
      render_shadow(entity, ctx);

    render_image(entity, ctx);

    render_debug(entity, ctx);

    render_sides(entity, ctx);

    ctx.strokeStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.lineWidth = 1;
    ctx.strokeText("["+entity.value+"]", 0, -entity.height/2-entity.z);

  }

  function extend(entity, asset){
    entity.render = function(ctx){ render(entity, ctx); }
    entity.update = function(dt){ update(entity, dt); }

    entity.handle_mouse_button = function(event, pressed){ entity.walking = pressed; }

    entity.render_after_tiles = true;
    return entity;
  }

  return {
    create: function(value, x, y, z, r, width, height){
      return extend(Entity.create(value, x, y, z, r, width, height));
    },
    extend
  }  
})();
