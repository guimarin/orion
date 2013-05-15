Projects = new Meteor.Collection("projects");
Cards = new Meteor.Collection("cards");
Comments = new Meteor.Collection("comments");
Votes = new Meteor.Collection("votes");


Meteor.methods({
  createProject: function ( obj ) {

  	if (! ( typeof obj.projectName === "string" && obj.projectName.length &&
          typeof obj.projectDescription === "string" && obj.projectDescription.length
           ) )
      throw new Meteor.Error( 413, "Required parameter missing" );

  	var timestamp = Date.now();

  	Projects.insert( { projectName: obj.projectName, timestamp: timestamp, projectDescription: obj.projectDescription } );

  },
  addCard: function ( obj, projectId, creator ) {

  	console.log( obj ); console.log( projectId ); console.log( creator );

  	if (! ( typeof obj.cardTitle === "string" && obj.cardTitle.length &&
          typeof obj.cardDescription === "string" && obj.cardDescription.length &&
          typeof obj.cardCategory === "string" && obj.cardCategory.length &&
          typeof projectId === "string" && projectId.length &&
          typeof creator === "string" && creator.length
           ) )
      throw new Meteor.Error( 413, "Required parameter missing" );

  	var timestamp = Date.now();


    var newCard = Cards.insert( { project: projectId, 
                    timestamp: timestamp, 
                    creatorId: creator, 
                    cardTitle: obj.cardTitle, 
                    cardDescription: obj.cardDescription,
                    cardCategory: obj.cardCategory,
                    netVoteCount: 0,
                     } );


    var project = Projects.findOne( {_id: projectId} );

    Cards.update( newCard, { $push: { 'tags': project.projectName } } );

  },
  ownCard: function ( cardId, ownerId ) {

    var aCard = Cards.findOne( {_id: cardId} );

    Cards.update( { _id: cardId }, { $set: { 'owner': ownerId } } );

  },
  addComment: function( obj, cardId, creator )
  {
   	if (! ( typeof obj.comment === "string" && obj.comment.length &&
          typeof cardId === "string" && cardId.length &&
          typeof creator === "string" && creator.length
           ) )
      throw new Meteor.Error( 413, "Required parameter missing" );

	var timestamp = Date.now();

    Comments.insert( { card: cardId, creatorId: creator, comment: obj.comment, timestamp: timestamp } );
  },
  addTag: function( obj, cardId, creator )
  {
    if (! ( typeof obj.addTag === "string" && obj.addTag.length ))
      throw new Meteor.Error( 413, "Tag is invalid" );

    Cards.update( { _id: cardId }, { $push: { 'tags': obj.addTag } } );
  },
  upVote: function( cardId, voter )
  {
    var myCard = Cards.findOne( { _id: cardId } );

    var upExists = _.find(myCard.upVotes, function( storedVoter ){ return storedVoter == voter; });
    var downExists = _.find(myCard.downVotes, function( storedVoter ){ return storedVoter == voter; });

    if ( ! upExists && ! downExists ) {
      Cards.update( { _id: cardId }, { $push: { 'upVotes': voter } } );
      var upVoteCount = myCard.upVotes ? myCard.upVotes.length + 1 : 1;
      var downVoteCount = myCard.downVotes ? myCard.downVotes.length : 0;
      var netVotes = upVoteCount - downVoteCount;

      Cards.update( { _id: cardId }, { $set: { 'upVoteCount': upVoteCount, 'netVoteCount': netVotes } } );
    }

  },
  downVote: function( cardId, voter )
  {
    var myCard = Cards.findOne( { _id: cardId } );

    var upExists = _.find(myCard.upVotes, function( storedVoter ){ return storedVoter == voter; });
    var downExists = _.find(myCard.downVotes, function( storedVoter ){ return storedVoter == voter; });

    if ( ! upExists && ! downExists ) {
      Cards.update( { _id: cardId }, { $push: { 'downVotes': voter } } );
      var downVoteCount = myCard.downVotes ? myCard.downVotes.length + 1 : 1;
      var upVoteCount = myCard.upVotes ? myCard.upVotes.length : 0;

      var netVotes = upVoteCount - downVoteCount;

      Cards.update( { _id: cardId }, { $set: { 'downVoteCount': downVoteCount, 'netVoteCount': netVotes } } );
    }
  }
});