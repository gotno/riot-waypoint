riot.tag('infinite-scroll', '<div id="loading" if="{ isLoading }"> <span>loading&hellip;</span> </div> <img each="{ images }" riot-src="{ this.src }">    <div></div> <waypoint onenter="{ fetchImages }" isdisabled="{ waypointIsDisabled }" threshold="{ 0.2 }"></waypoint>', function(opts) {
    var self = this;
    self.isLoading = false;
    self.images = [];

    this.fetchImages = function(e) {
      self.isLoading = true;
      self.update();

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
    }.bind(this);

    this.waypointIsDisabled = function() {
      return self.isLoading;
    }.bind(this);
  
});
