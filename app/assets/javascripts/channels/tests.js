App.tests = App.cable.subscriptions.create('TestsChannel', {
  received: function(data) {
    return $('#tests').append(this.renderTest(data));
  },
  renderTest: function(data) {
    return "<p> <b>" + "YO" + ": </b>" + data.test + "</p>";
  }
});
