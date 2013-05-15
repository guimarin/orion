Template.projects.projectList = function () {

	return Projects.find({});	
};

Template.project.events({
    'click .project-box': function( e, template ) {
        Session.set( 'selectedProject', this._id );
    },
});