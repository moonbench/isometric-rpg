"ues strict";

const TexturedTile = (function(){
  function extend(tile, top_asset){
    tile.render_top = function(ctx){ ctx.fillStyle = "#754f2a"; Tile.draw_top_image(tile, top_asset, ctx); }
    return tile;
  }

  return {
    prepare: function(top_asset){
      return {
        create: function(z, depth = Tile.TILE_HEIGHT){
          return extend(Tile.create(z, depth), top_asset);
        }
      }
    }
  }
})();