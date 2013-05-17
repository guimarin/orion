Template.cardContainer.events({

    'click #backToList': function () {
    	Session.set( "selectedProject", null );
    },
});

Template.card.events({
    'click #delete-card': function() {
      Cards.remove( { _id: this._id } );  
    },
    'click #own-card': function() {
      Meteor.call( "ownCard", this._id, Meteor.userId(), function( error, result ) {
	        if ( ! error ) {
	          console.log( "no error while updating card" );
	        } else {
	          console.log( error.reason );
	        }
      });
    },
    'click #upVote': function() {
       Meteor.call( "upVote", this._id, Meteor.userId(), function( error, result ) {
	        if ( ! error ) {
	          console.log( "no error while updating card" );
	        } else {
	          console.log( error.reason );
	        }
      });   	
    },
    'click #downVote': function() {
       Meteor.call( "downVote", this._id, Meteor.userId(), function( error, result ) {
	        if ( ! error ) {
	          console.log( "no error while updating card" );
	        } else {
	          console.log( error.reason );
	        }
      });   	
    },
/*    'click .flipTheBox': function( event, template ) {
    	 	
            $(event.currentTarget).closest(".passbook").toggleClass('rotate-3d');  
            $(event.currentTarget).closest(".front").toggleClass('hide-front');  
            event.preventDefault();  
        
    },*/
});

/*Template.card.upVoteCount = function () {

	var aCard = Cards.findOne( { _id:this._id } );

	return aCard && aCard.upVotes ? aCard.upVotes.length : 0;

};

Template.card.downVoteCount = function () {

	var aCard = Cards.findOne( { _id:this._id } );

	return aCard && aCard.downVotes ? aCard.downVotes.length : 0;

};*/

/*Template.cards.events({
    'click #addCardButton': function( e, template ) {
        var values = grabInputs( template );
        console.log(values);
    },
});
*/

Template.addCardModal.events( {

    'click #addCardButton': function( e, template ) {
        var values = grabInputs( template );
        console.log(values);

        var projectId = Session.get( "selectedProject" );

        var creator = Meteor.userId();
        console.log( creator );

		Meteor.call( "addCard", values, projectId, creator, function( error, result ) {

				        if ( ! error ) {
				          console.log( "no error while creating card" );
				          $('#addCardModal').modal('hide')
				        } else {
				          console.log( error.reason );
				          $(template.find( ".error" )).html( error.reason ).removeClass("hide");
				        }
			      });

		clearInputs( template );
				
		    },
});

Template.cardContainer.projectName = function () {
	var projectId = Session.get( "selectedProject" );

	return Projects.findOne( { _id: projectId } ) ? Projects.findOne( { _id: projectId } ).projectName : '';
};



Template.cardComments.comments = function () {
	return Comments.find( { card: this._id }, {sort: { timestamp: -1 } } );
};

Template.cardComments.events( {
	'keypress #comment': function (event, template ) {

	    if ( event.type == "keypress" && event.which !== 13 ) {
	      return;
	    }

        var values = grabInputs( template );
        if ( values.comment == '' )
        	return;

        console.log(values);

	    var cardId = this._id;
        var creator = Meteor.userId();

		Meteor.call( "addComment", values, cardId, creator, function( error, result ) {

				        if ( ! error ) {
				          console.log( "no error while creating card" );

				        } else {
				          console.log( error.reason );
				          $(template.find( ".error" )).html( error.reason ).removeClass("hide");
				        }
			      });

		clearInputs( template );
		//event.currentTarget.value = '';

	},

});


Template.cardTags.events( {
	'keypress #addTag': function ( event, template ) {

	    if ( event.type == "keypress" && event.which !== 13 ) {
	      return;
	    }

        var values = grabInputs( template );

	    if ( values.addTag == '' )
	    	return;

        console.log(values);

	    var cardId = this._id;
        var creator = Meteor.userId();
        
		Meteor.call( "addTag", values, cardId, creator, function( error, result ) {

				        if ( ! error ) {
				          console.log( "no error while adding tag" );

				        } else {
				          console.log( error.reason );
				          $(template.find( ".error" )).html( error.reason ).removeClass("hide");
				        }
			      });

		clearInputs( template );


	},
});

Template.cardTags.tagArray = function () {

 	console.log(Cards.findOne( { _id: this.id_} ));

};



/* sorting UI */
Template.sortingUI.events( {
	'click #newestFirstRadio': function ( event, template ) {
		setTimeout(function () {Session.set( "sortOrder", "newestFirst" );}, 500);
	},
	'click #oldestFirstRadio': function ( event, template ) {
		setTimeout(function () {Session.set( "sortOrder", "oldestFirst" );}, 500);
	},
	'click #mostPopularRadio': function ( event, template ) {
		setTimeout(function () {Session.set( "sortOrder", "mostPopular" );}, 500);
	},
	'click #leastPopularRadio': function ( event, template ) {
		setTimeout(function () {Session.set( "sortOrder", "leastPopular" );}, 500);
	},
});


Template.searchUI.events( {
	'click #searchBoxButton, keypress #searchBox' : function ( event, template ) {


	    if ( event.type == "keypress" && event.which !== 13 ) {
	      return;
	    }

        var values = grabInputs( template );

        if ( values.searchBox == '' ) {
        	$(".card").show('fast');
        	return;
        }


        $(".card").show();
        $($(".card").not( $(".card:contains("+values.searchBox+")"))).hide('slow');
        clearInputs( template );


      /*  $( ".card" ).each(function() {
	        if ( this.html().contains("") ) {
	        	console.log( "found" );
	        } else {
	        	console.log( "not found");
	        };
	    });*/
	},
});

/* Show the cards in a given project */
Template.cards.cards = function () {

	var projectId = Session.get( "selectedProject" );
	var sortOrder = Session.get( "sortOrder" );
    var selectedUser = Session.get( "selectedUser" );

    var filter = {};

    if ( selectedUser ) {
    	filter.owner = selectedUser;
    } else {
    	filter.project = projectId;
    }

	switch(sortOrder)
	{
	case "newestFirst":
	  return Cards.find( filter, {sort: { timestamp: -1 } } );
	  break;
	case "oldestFirst":
	  return Cards.find( filter, {sort: { timestamp: 1 } } );
	  break;
	case "mostPopular":
	  return Cards.find( filter, {sort: { netVoteCount: -1 } } );
	  break;
	case "leastPopular":
	  return Cards.find( filter, {sort: { netVoteCount: 1 } } );
	  break; 
	default:
	  return Cards.find( filter, {sort: { netVoteCount: -1 } } );

	}

	//return Cards.find( { project: projectId }, {sort: { netVoteCount: -1 } } );
    //return Cards.find( { project: projectId }, {sort: { timestamp: -1 } } );
};