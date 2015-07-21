riot.tag('simple-example', '<waypoint onenter="{ waypointOnEnter }" onleave="{ waypointOnLeave }" threshold="{ 0 }"></waypoint>', function(opts) {
    this.waypointOnEnter = function(e) {
      console.info('WAYPOINT IN');
    }.bind(this);
    this.waypointOnLeave = function(e) {
      console.info('WAYPOINT OUT');
    }.bind(this);
  
});
