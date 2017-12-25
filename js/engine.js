"use strict";

const Engine = (function(){

  function current_time_in_ms(){
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  }

  function set_fps(engine, fps){
    engine.fps = fps;
    engine.step = 1/engine.fps;
    engine.slowstep = engine.slow * engine.step;
  }

  function set_canvas(engine, canvas){
    engine.canvas = canvas;
    engine.ctx = engine.canvas.getContext("2d");
    engine.viewport = Viewport.create(engine.canvas);
  }

  function set_world(engine, world){
    engine.world = world;
    world.engine = engine;
  }


  function update(engine, dt){
    if(engine.world) engine.world.update(dt);
    if(engine.update_function) engine.update_function(dt);
  }
  function render(engine){
    if(engine.viewport) engine.viewport.clear(engine.ctx);

    engine.ctx.save();
    engine.ctx.scale(engine.scale, engine.scale);
    if(engine.world) engine.world.render(engine.ctx);
    engine.ctx.restore();

    if(engine.cursor) engine.cursor.render(engine.ctx);


    if(engine.viewport) engine.viewport.draw_border(engine.ctx);
  }

  function draw_frame(engine){
    engine.now = current_time_in_ms();

    engine.remainder += Math.min(1, (engine.now - engine.last)/1000);
    if(engine.remainder >= engine.slowstep){
      if(engine.fps_meter) engine.fps_meter.tickStart();
      while(engine.remainder >= engine.slowstep){
        engine.remainder -= engine.slowstep;
        update(engine, engine.step);
      }
      render(engine, engine.remainder/engine.slow);
      if(engine.fps_meter) engine.fps_meter.tick();
    }
    engine.last = engine.now;
    requestAnimationFrame(function(){
      draw_frame(engine);
    });
  }

  function set_cursor(engine, cursor){
    engine.cursor = cursor;
  }

  function bind_mouse(engine){
    engine.canvas.addEventListener("mousemove", function(event){
      if(engine.cursor) engine.cursor.handle_mouse_move(event);
      if(engine.handle_mouse_move) engine.handle_mouse_move(event)
    });
    engine.canvas.addEventListener("mousedown", function(event){
      if(engine.handle_mouse_button) engine.handle_mouse_button(event, true)
    });
    engine.canvas.addEventListener("mouseup", function(event){
      if(engine.handle_mouse_button) engine.handle_mouse_button(event, false)
    });
  }

  function set_scale(engine, scale){
    engine.scale = scale;
    engine.viewport.scale = scale;
  }

  return {
    create: function(canvas){
      const engine = {
        canvas,

        fps: 30,
        slow: 1,
        now: null,
        remainder: 0,
        last: current_time_in_ms(),

        scale: 2,
      };

      bind_mouse(engine);

      engine.set_canvas = function(canvas){ set_canvas(engine, canvas); }
      engine.set_canvas(engine.canvas);

      engine.set_fps = function(fps){ set_fps(engine, fps); }
      engine.set_fps(engine.fps);

      engine.set_cursor = function(cursor){ set_cursor(engine, cursor); }
      engine.set_cursor(Cursor.create(0, 0, engine.canvas));

      engine.set_scale = function(scale){ set_scale(engine, scale); }
      engine.set_scale(engine.scale);

      engine.set_world = function(world){ set_world(engine, world); }

      engine.run = function(){
        requestAnimationFrame( function(){
          draw_frame(engine);
        });
      }


      return engine;
    }
  }  
})();
