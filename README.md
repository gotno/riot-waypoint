# riot-waypoint

a port of [brigade's react-waypoint](https://github.com/brigade/react-waypoint) to [riot](https://muut.com/riotjs/)

## what it is
-  waypoint is a happy little creature who can sit on a page.
-  waypoint takes up no space but it knows where it is.
-  waypoint can tell you when it's in the viewport, and when it leaves.
-  wayport can look for the viewport and tell you when it's close.
-  waypoint is patient and happy to wait while you do things.

## usage

waypoint can know four things, these are the defaults:

```
<waypoint
  onenter="{ function() { } }" <!-- waypoint is in or near the viewport -->
  onleave="{ function() { } }" <!-- waypoint has left or is near leaving -->
  isdisabled="{ function() { return false } }"  <!-- waypoint might take a nap -->
  threshold="{ 0.0 }" <!-- waypoint will fire onenter/onleave when it's this -->
                      <!-- percentage of a viewport height away from being visible -->
/> 
```

include it at the bottom of a list (for lazy loading and such):

```
<items>
  <item each={ items } data={ this } />
  <waypoint
    onenter="{ waypointOnEnter }"
    onleave="{ waypointOnLeave }"
    isdisabled="{ waypointIsDisabled }"
    threshold="{ 0.5 }" <!-- waypoint will fire onenter when it's half a -->
                        <!-- viewport height away from being visible -->
  /> 

  <script>
    var self = this;
    var items = [...];
    var isLoading = false;

    fetchNextItems() {
      self.isLoading = true;
      // ajaxStuff
      //   .success(data)
      //     self.items.concat(responseJSON);
      //   .always
      //     self.isLoading = false;
    }

    waypointOnEnter() {
      self.fetch();
    }

    waypointIsDisabled() {
      return self.isLoading;
    }
  </script>
</items> 
```
