<infinite-scroll>
  <div id="loading" if={ isLoading }> 
    <span>loading&hellip;</span>
  </div>

  <div id="page-wrapper">
    <img each={ images } src={ this.src } />
  </div>

  <waypoint
    onenter={ fetchImages }
    isdisabled={ waypointIsDisabled }
    threshold={ 0 }
  />

  <script>
    var self = this;
    self.isLoading = false;
    self.images = [];

    var fetchCount = 0;
    fetchImages(e) {
      console.log('fetch', ++fetchCount);
      self.isLoading = true;
      self.update();

      // and then do ajax stuff or whatever
      window.setTimeout(function() {
        self.images = self.images.concat([
          { src: 'http://lorempixel.com/640/480/animals/' },
          { src: 'http://lorempixel.com/640/480/nature/' },
          { src: 'http://lorempixel.com/640/480/fashion/' },
          { src: 'http://lorempixel.com/640/480/abstract/' },
          { src: 'http://lorempixel.com/640/480/cats/' }
        ]);

        self.isLoading = false;
        self.update();
      }, 1200);
    }

    waypointIsDisabled() {
      return self.isLoading;
    }
  </script>
</infinite-scroll>
