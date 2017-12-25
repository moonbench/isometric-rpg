"ues strict";

const WaterTile = (function(){
  function extend(tile){
    tile.top_image_asset = asset_depot.add_image("water_top", "assets/water.gif");
    tile.top_color = "#184d7a";
    tile.left_color = "#171c38";
    tile.right_color = "#242b54";
    return tile;
  }

  return {
    create: function(x, y, z, depth = Tile.TILE_HEIGHT){
      return extend(Tile.create(x, y, z, depth));
    }
  }
})();
