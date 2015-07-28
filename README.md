# riot-waypoint

a port of [brigade's react-waypoint](https://github.com/brigade/react-waypoint) to [riot](https://muut.com/riotjs/)

## what it is
-  waypoint is a happy little creature who can sit on a page.
-  waypoint takes up no space but it knows where it is.
-  waypoint can tell you when it's in the viewport, and when it leaves.
-  waypoint can look for the viewport and tell you when it's close.
-  waypoint is patient and happy to wait while you do things.

## usage

waypoint can know four things, these are the defaults:

```javascript
self.opts.onenter = function() { };
self.opts.onleave = function() { };
self.opts.isdisabled = function() { return false };
self.opts.threshold = 0.0;
```

and this is what they mean:

```
onenter:    waypoint is in or near the viewport
onleave:    waypoint has left the viewport
isdisabled: waypoint might take a nap
threshold:  waypoint will fire onenter/onleave when it's this percentage
            of a viewport height away from being visible (1.0 = 100%)
```

please note:

1. waypoint `.call()`'s the parent methods, passing itself as `this`, as well as the `event` object in the case of `onenter` and `onleave`.
2. `isdisabled` is necessary at this point because of a bug that lets riot continue to update child components even when they are being conditionally rendered. see https://github.com/riot/riot/issues/1020

## example

include it at the bottom of a list (for lazy loading and such):

```html
<items>
  <item each={ items } data={ this } />
  <waypoint
    onenter="{ waypointOnEnter }"
    onleave="{ waypointOnLeave }"
    isdisabled="{ waypointIsDisabled }"
    threshold="{ 0.5 }"
  /> 

  <script>
    var self = this;
    var items = [...];
    var isLoading = false;

    fetchNextItems() {
      self.isLoading = true;
      // ajaxStuff
      //   .success(data)
      //     self.items.concat(data.responseJSON);
      //   .always
      //     self.isLoading = false;
      //     self.update();
    }

    waypointOnEnter() {
      self.fetchNextItems();
    }

    waypointIsDisabled() {
      return self.isLoading;
    }
  </script>
</items> 
```

check out the [examples](./examples) directory for more.

## thanks!

thanks to [trotzig](https://github.com/trotzig) and [lencioni](https://github.com/lencioni) for writing the original component,
and the [Brigade team](https://github.com/brigade/) for open sourcing it.

thanks also to [flarnie](https://github.com/flarnie) for writing the article that got me excited about this in the first place:
[To Infinity and Beyond with React Waypoint](https://medium.com/brigade-engineering/to-infinity-and-beyond-with-react-waypoint-cb5ba46a9150)

## license
[MIT](./LICENSE)
