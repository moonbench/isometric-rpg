"use strict";

const AudioEmitter = (function(){

  const Group = (function(){
    function add_sound(group, sound){
      group.sounds.push(sound);
      group.index_queue.push( group.sounds.length-1 );
    }

    function play_one(group){
      const index = group.index_queue.shift();
      if(index == undefined) return;

      group.sounds[index].onended = function(){ group.index_queue.push(index) };
      group.sounds[index].play();
    }

    function loop_one(group, checkback_function){
      const index = group.index_queue.shift();
      if(index == undefined) return;

      group.sounds[index].onended = function(){
        group.index_queue.push(index);
        if(checkback_function()) loop_one(group, checkback_function);
      }
      group.sounds[index].play();
    }

    return {
      create: function(){
        var group = {
          sounds: [],
          index_queue: [],
        };

        group.add_sound = function(sound){ add_sound(group, sound) };
        group.play_one = function(){ play_one(group) };
        group.loop_one = function(checkback_function){ loop_one(group, checkback_function) };

        return group;
      }
    }
  })();


  function add_sound_to_group(emitter, group_name, sound){
    emitter.groups[group_name] = emitter.groups[group_name] || Group.create();
    emitter.groups[group_name].add_sound(sound);
  }

  return {
    create: function(){
      var emitter = {
        groups: {},
      };

      emitter.add_to_group = function(group_name, sound){ add_sound_to_group(emitter, group_name, sound) };
      emitter.play = function(group_name){ emitter.groups[group_name].play_one() };
      emitter.loop = function(group_name, checkback_function){ emitter.groups[group_name].loop_one(checkback_function) };

      return emitter;
    }
  }
})();
