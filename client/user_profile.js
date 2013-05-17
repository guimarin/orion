Template.content.showUserProfile = function () {
	return Session.get( "selectedUser" ) ? true : false;
};

Template.user_profile.userInfo = function () {
	
	var userId = Session.get( "selectedUser" );

	return Meteor.users.findOne( { _id:userId } );
};

Template.card.events({
	'click .isUserId': function ( event, template ) {
		var userId = $( event.currentTarget ).attr( 'userid' );
		console.log( userId );
		Session.set( "selectedUser", userId );
	},

});

Template.whoIsOnline.events({
	'click .isUserId': function ( event, template ) {
		var userId = $( event.currentTarget ).attr( 'userid' );
		console.log( userId );
		Session.set( "selectedUser", userId );
	},

});

Template.user_profile.events({
	'click #backFromProfile': function ( event, template ) {
		console.log( 'clicked' );
		Session.set( "selectedUser", false );
	},
});

Template.comment.events({
	'click .isUserId': function ( event, template ) {
		var userId = $( event.currentTarget ).attr( 'userid' );
		Session.set( "selectedUser", userId );
	},

});

