"ues strict";

const GrassTile = (function(){

  function extend(tile){
    tile.top_image_asset = asset_depot.add_image("grass_top", "assets/grass.png");
    tile.walkable = true;
    tile.top_color = "#228113";
    tile.left_color = "#20390b";
    tile.right_color = "#244e1a";
    return tile;
  }

  return {
    create: function(x, y, z, depth = Tile.TILE_HEIGHT){
      return extend(Tile.create(x, y, z, depth));
    }
  }
})();
