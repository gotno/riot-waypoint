<simple-example>
  <div style="height: 1200px; background-color: red;"></div>
  <waypoint onenter={ waypointOnEnter } onleave={ waypointOnLeave } threshold={ 0 } />
  <div style="height: 1200px; background-color: blue;"></div>

  <script>
    waypointOnEnter(e) {
      console.info('WAYPOINT IN');
    }
    waypointOnLeave(e) {
      console.info('WAYPOINT OUT');
    }
  </script>
</simple-example>
