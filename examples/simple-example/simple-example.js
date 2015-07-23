riot.tag('simple-example', '<div style="height: 1200px; background-color: red;"></div> <waypoint onenter="{ waypointOnEnter }" onleave="{ waypointOnLeave }" threshold="{ 0 }"></waypoint> <div style="height: 1200px; background-color: blue;"></div>', function(opts) {
    this.waypointOnEnter = function(e) {
      console.info('WAYPOINT IN');
    }.bind(this);
    this.waypointOnLeave = function(e) {
      console.info('WAYPOINT OUT');
    }.bind(this);
  
});
