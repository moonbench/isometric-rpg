"use strict";

const World = (function(){

  function update(world, dt){
    world.ground.update(dt);
  }


  function render(world, ctx){
    world.ground.render(ctx);
  }


  function set_ground(world, ground){
    world.ground = ground;
    ground.world = world;
  }

  return {
    create: function(){
      const world = {
        engine: {},

        ground: null,
      };

      world.update = function(dt){ update(world, dt); }
      world.render = function(ctx){ render(world, ctx); }

      world.set_ground = function(ground){ set_ground(world, ground); }

      return world;
    }
  }
})();
