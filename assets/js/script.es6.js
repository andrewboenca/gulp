var Song = Backbone.Model.extend();

var Songs = Backbone.Collection.extend({model: Song});

var SongView = Backbone.View.extend({
  tagName: "li",
  render: function() {
    this.$el.html(this.model.get("title"));

    return this;
  }
});

var SongsView = Backbone.View.extend({
  render: function() {
    var self = this;
    this.model.each(function(song){
      var songView = new SongView({ model: song });
      self.$el.append(songView.render().$el);
    });
  }
});

var songs = new Songs([
  new Song({ title: "Bluen in Green" }),
  new Song({ title: "So What" }),
  new Song({ title: "All Blues" })
]);

var songsView = new SongView({ el: "#songs", model: songs });
songsView.render();



function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m) + 5;
    s = checkTime(s);
    document.getElementById('stuff').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
}
