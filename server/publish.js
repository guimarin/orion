Meteor.publish("cards", function () {
    return Cards.find({});
});

Meteor.publish("projects", function () {
    return Projects.find({});
});

Meteor.publish("comments", function () {
    return Comments.find({});
});

Meteor.publish("directory", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});

Meteor.publish('userPresence', function() {
  // Setup some filter to find the users your logged in user
  // cares about. It's unlikely that you want to publish the 
  // presences of _all_ the users in the system.
  var filter = {}; 

  // ProTip: unless you need it, don't send lastSeen down as it'll make your 
  // templates constantly re-render (and use bandwidth)
  return Meteor.presences.find(filter, {fields: { 'state': 1, 'userId': 1 } });
});

Meteor.publish("votes", function () {

  return Votes.find({});
});