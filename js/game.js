"use strict";

const Game = (function(){

  function set_scene(scene){
    game.engine.world = World.create();
    world.set_ground(scene.ground);
  }

  return {
    create: function(canvas_id, fps_meter_id = null){
      const game = {
        engine: Engine.create(document.getElementById(canvas_id)),
      };

      if(fps_meter_id)
        game.engine.fps_meter = Meter.create(game.engine, fps_meter_id);

      game.run = function(){ game.engine.run(); }
      
      return game;
    }
  }
})();
