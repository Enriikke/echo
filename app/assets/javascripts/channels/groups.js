App.tests = App.cable.subscriptions.create('GroupsChannel', {
  received: function(data) {
    return $('#sessions-' + data.id).append(this.renderTest(data));
  },
  renderTest: function(data) {
    return "<p>NEW <b>SESSION</b></p>";
  }
});
