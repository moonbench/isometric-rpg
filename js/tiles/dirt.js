"ues strict";

const DirtTile = (function(){
  function extend(tile){
    tile.top_image_asset = asset_depot.add_image("dirt_top", "assets/dirt.png");
    //tile.walkable = true;
    tile.top_color = "#754f2a";
    tile.left_color = "#3b2415";
    tile.right_color = "#512d21";
    return tile;
  }

  return {
    create: function(x, y, z, depth = Tile.TILE_HEIGHT){
      return extend(Tile.create(x, y, z, depth));
    }
  }
})();
