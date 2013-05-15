

Template.drawers.rendered = function () {

	var snapper = new Snap({
	  element: document.getElementById('content')
	});

	var addEvent = function addEvent(element, eventName, func) {
		if (element.addEventListener) {
	    	return element.addEventListener(eventName, func, false);
	    } else if (element.attachEvent) {
	        return element.attachEvent("on" + eventName, func);
	    }
	};

	addEvent(document.getElementById('open-left'), 'click', function(){
		snapper.open('left');
	});

};


Template.createProjectModal.events({
    'click #createProjectButton': function( e, template ) {
        var values = grabInputs( template );
        console.log(values);

		Meteor.call( "createProject", values, function( error, result ) {

		        if ( ! error ) {
		          console.log( "no error while creating project" );
		          $('#createProjectModal').modal('hide')
		        } else {
		          console.log( error.reason );
		          $(template.find( ".error" )).html( error.reason ).removeClass("hide");
		        }
	      });


		clearInputs( template );


    },
});


Template.content.projectSelected = function () {

	if ( Session.get( "selectedProject" ) ) {
		return true;
	} else {
		return false;
	}

};

Template.whoIsOnline.onlineUsers = function () {
	return Meteor.presences.find({});
};

