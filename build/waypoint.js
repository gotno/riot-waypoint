riot.tag('waypoint', '<span style="font-size: 0;"></span>', function(opts) {
    var self = riot.observable(this),
      root = self.root,
      parent = self.parent;

    self.opts.onenter = function() { };
    self.opts.onleave = function() { };
    self.opts.threshold = 0;

    self.on('mount', function() {
      self.scrollableParent = self._findScrollableParent();

      self.scrollableParent.addEventListener('scroll', self._handleScroll);
      window.addEventListener('resize', self._handleScroll);

      self._handleScroll();
    });

    self.on('updated', function() {

      if (self.isMounted) {
        self._handleScroll();
      }
    });

    self.on('unmount', function() {
      if (self.scrollableParent) {




        self.scrollableParent.removeEventListener('scroll', self._handleScroll);
        window.removeEventListener('resize', self._handleScroll);
      }
    });

    this._findScrollableParent = function() {
      var node = root;

      while (node.parentNode) {
        node = node.parentNode;

        if (node === document) {

          continue;
        }

        var style = window.getComputedStyle(node);
        var overflowY = style.getPropertyValue('overflow-y') ||
          style.getPropertyValue('overflow');

        if (overflowY === 'auto' || overflowY === 'scroll') {
          return node;
        }
      }


      return window;
    }.bind(this);

    this._handleScroll = function(e) {
      var isVisible = self._isVisible();

      if (self._wasVisible === isVisible) {

        return;
      }

      if (isVisible) {
        self.opts.onenter.call(self, e);
      } else {
        self.opts.onleave.call(self, e);
      }

      self._wasVisible = isVisible;
    }.bind(this);

    this._distanceToTopOfScrollableParent = function(node) {
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
    }.bind(this);

    this._isVisible = function() {
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
    }.bind(this);
  
});
