"use strict";

const Vector = (function(){

  function add_vector( vector, new_vector ){
    const x1 = vector.x_after(0, 1), y1 = vector.y_after(0, 1);
    const x2 = new_vector.x_after(x1, 1), y2 = new_vector.y_after(y1, 1);
    vector.magnitude = Math.sqrt( Math.pow(y2, 2) + Math.pow(x2, 2));
    vector.angle = Math.atan2( y2, x2 );
    return vector;
  }
  function add( vector, angle, magnitude ){
    add_vector( vector, Vector.create(angle, magnitude));
    return vector;
  }

  return {
    create: function( angle, magnitude ){
      const vector = {
        angle,
        magnitude,
      };

      vector.x_after = function(x, dt){ return x + (vector.magnitude * dt * Math.cos(vector.angle)) };
      vector.y_after = function(x, dt){ return x + (vector.magnitude * dt * Math.sin(vector.angle)) };
      vector.add = function(angle, magnitude){ add(vector, angle, magnitude) };
      vector.add_vector = function(new_vector){ add_vector(vector, new_vector) };

      return vector;
    }
  }
})();
