riot.tag('infinite-scroll', '<div id="loading" if="{ isLoading }"> <span>loading...</span> </div> <div id="page-wrapper"> <img each="{ images }" riot-src="{ this.src }"> </div> <waypoint if="{ !isLoading }" onenter="{ fetchImages }" threshold="{ 0 }"></waypoint>', function(opts) {
    var self = this;
    self.isLoading = false;

    self.images = [
      { src: 'http://lorempixel.com/640/480/animals/' },
      { src: 'http://lorempixel.com/640/480/nature/' },
      { src: 'http://lorempixel.com/640/480/fashion/' },
      { src: 'http://lorempixel.com/640/480/abstract/' },
      { src: 'http://lorempixel.com/640/480/cats/' }
    ];

    this.fetchImages = function(e) {
      self.isLoading = true;

      this.update();
      window.setTimeout(function() {
        self.images = self.images.concat(self.images.slice(0, 5));
        self.isLoading = false;
        self.update();
      }, 1200);
    }.bind(this);
  
});
