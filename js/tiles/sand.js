"ues strict";

const sand_image = asset_depot.add_image("sand_top", "assets/sand.png");

const SandTile = (function(){
  function extend(tile){
    tile.top_image_asset = sand_image;
    tile.walkable = true;
    tile.top_color = "#634101";
    tile.left_color = "#5a3914";
    tile.right_color = "#814417";
    return tile;
  }

  return {
    create: function(x, y, z, depth = Tile.TILE_HEIGHT){
      return extend(Tile.create(x, y, z, depth));
    }
  }
})();
