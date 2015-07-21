<example-parent>
  <waypoint onenter={ waypointOnEnter } onleave={ waypointOnLeave } threshold={ 0 } />

  <script>
    waypointOnEnter(e) {
      console.info('WAYPOINT IN');
    }
    waypointOnLeave(e) {
      console.info('WAYPOINT OUT');
    }
  </script>
</example-parent>
