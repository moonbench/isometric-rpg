"ues strict";

const StoneTile = (function(){
  function extend(tile){
    tile.top_image_asset = asset_depot.add_image("stone_top", "assets/stone.png");
    tile.walkable = true;
    tile.top_color = "#4a5056";
    tile.left_color = "#2a3135";
    tile.right_color = "#3b474e";
    return tile;
  }

  return {
    create: function(x, y, z, depth = Tile.TILE_HEIGHT){
      return extend(Tile.create(x, y, z, depth));
    }
  }
})();
