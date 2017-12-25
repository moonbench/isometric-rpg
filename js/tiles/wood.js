"ues strict";

const WoodTile = (function(){
  function extend(tile){
    tile.top_image_asset = asset_depot.add_image("wood_top", "assets/wood.png");
    tile.walkable = true;
    tile.top_color = "#9c7f43";
    tile.left_color = "#4e3c2b";
    tile.right_color = "#594025";
    return tile;
  }

  return {
    create: function(x, y, z, depth = Tile.TILE_HEIGHT){
      return extend(Tile.create(x, y, z, depth));
    }
  }
})();
