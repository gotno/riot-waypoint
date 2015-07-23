<waypoint>
  <span style="font-size: 0;"></span>

  <script>
    var self = riot.observable(this),
      root = self.root,
      parent = self.parent;

    // defaults
    self.opts.onenter = function() { };
    self.opts.onleave = function() { };
    self.opts.isdisabled = function() { return false };
    self.opts.threshold = 0.0;

    self.on('mount', function() {
      self.scrollableParent = self._findScrollableParent();

      self.scrollableParent.addEventListener('scroll', self._handleScroll);
      window.addEventListener('resize', self._handleScroll);

      self._handleScroll();
    });

    self.on('updated', function() {
      // we check self.isMounted because the 'updated' event is
      // called before the 'mount' event.
      if (self.isMounted && !self.opts.isdisabled.call(self)) {
        self._handleScroll();
      }
    });

    self.on('unmount', function() {
      if (self.scrollableParent) {
        // At the time of unmounting, the scrollable parent might no longer exist.
        // Guarding against this prevents the following error:
        //
        //   Cannot read property 'removeEventListener' of undefined
        self.scrollableParent.removeEventListener('scroll', self._handleScroll);
        window.removeEventListener('resize', self._handleScroll);
      }
    });

    _findScrollableParent() {
      var node = root;

      while (node.parentNode) {
        node = node.parentNode;

        if (node === document) {
          // This particular node does not have a computed style.
          continue;
        }

        var style = window.getComputedStyle(node);
        var overflowY = style.getPropertyValue('overflow-y') ||
          style.getPropertyValue('overflow');

        if (overflowY === 'auto' || overflowY === 'scroll') {
          return node;
        }
      }

      // A scrollable parent element was not found, which means that we need to do
      // stuff on window.
      return window;
    }

    _handleScroll(e) {
      var isVisible = self._isVisible();

      if (self._wasVisible === isVisible) {
        // No change since last trigger
        return;
      }

      if (isVisible) {
        self.opts.onenter.call(self, e);
      } else {
        self.opts.onleave.call(self, e);
      }

      self._wasVisible = isVisible;
    }

    _distanceToTopOfScrollableParent(node) {
      if (self.scrollableParent !== window && !node.offsetParent) {
        throw new Error(
          'The scrollable parent of Waypoint needs to have positioning to ' +
          'properly determine position of Waypoint (e.g. `position: relative;`)'
        );
      }

      if (node.offsetParent === self.scrollableParent || !node.offsetParent) {
        return node.offsetTop;
      } else {
        return node.offsetTop + self._distanceToTopOfScrollableParent(node.offsetParent);
      }
    }

    _isVisible() {
      var waypointTop = self._distanceToTopOfScrollableParent(root),
        contextHeight,
        contextScrollTop;
      
      if (self.scrollableParent === window) {
        contextHeight = window.innerHeight;
        contextScrollTop = window.pageYOffset;
      } else {
        contextHeight = self.scrollableParent.offsetHeight;
        contextScrollTop = self.scrollableParent.scrollTop;
      }

      var thresholdPx = contextHeight * self.opts.threshold;

      var isAboveBottom = contextScrollTop + contextHeight >= waypointTop - thresholdPx;
      var isBelowTop    = contextScrollTop <= waypointTop + thresholdPx;

      return isAboveBottom && isBelowTop;
    }
  </script>
</waypoint>
