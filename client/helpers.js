Handlebars.registerHelper( "form-input", function( id, label, aClass ) {

    var element = "<div class='control-group'><label class='control-label' for='input"+label+"'>"+label+"</label>";
    element = element + "<div class='controls'><input type='text' id='"+id+"' class='"+aClass+"'></div>";

    return new Handlebars.SafeString( element );

});


Handlebars.registerHelper( "form-textarea", function( id, label, aClass ) {

    var element = "<div class='control-group'><label class='control-label' for='textarea"+label+"'>"+label+"</label>";
    element = element + "<div class='controls'><textarea rows=3 id='"+id+"' class='"+aClass+"'/></div>";

    return new Handlebars.SafeString( element );

});


Handlebars.registerHelper( "form-button", function( id, label, aClass ) {

    var element = "<button class='"+aClass+"' id='"+id+"'>"+label+"</button>";

    return new Handlebars.SafeString( element );

});

Handlebars.registerHelper( "form-select", function( id, label, aClass, options ) {

    var element = "<div class='control-group'><label class='control-label' for='"+id+"'>"+label+"</label>";
    element = element + "<select class='"+aClass+"' id='"+id+"'>";

    var content = options.split( "," );

    for (var opt in content) {
      element = element + "<option value='"+content[opt]+"'>" + content[opt] + "</option>";
    }

    element = element + "</select>"

    return new Handlebars.SafeString( element );

});




Handlebars.registerHelper( "emailByUserId", function( id ) {
  if ( typeof id === "string" )
    return Meteor.users.findOne( { _id: id } ).emails[0].address;
  else
    return "Unknown";
});

Handlebars.registerHelper( "myIdMatches", function( id ) {
  if ( typeof id === "string" )
    return Meteor.userId() === id;
  else
    return "Unknown";
});

Handlebars.registerHelper( "displayTags", function( tags ) {

  var element = '';

   for ( var tag in tags ) {
    element = element + "<span class='badge badge-important'>"+tags[tag]+"</span>";
   }

   return new Handlebars.SafeString( element );
});

Handlebars.registerHelper( 'timeStamper', function( timestamp ) {

  var d = new Date( timestamp );

  var date = d.toLocaleDateString();
  var time = d.toLocaleTimeString();

  return date + " " + time;

});


Handlebars.registerHelper( 'timeStamperBookmark', function( timestamp ) {

  var d = new Date( timestamp );

  var date = d.toLocaleDateString();
  var time = d.toLocaleTimeString();

  /*return date + " " + time;*/

  var dt = ['Jan','Feb','Mar','Apr','May'];

  var retVal = "<a rel='bookmark' href='#'><abbr>"+dt[d.getMonth()]+" "+d.getFullYear()+"</abbr>"+d.getDate()+"<sub>"+time+"</sub></a>";

  return new Handlebars.SafeString( retVal );

  /*<a rel="bookmark" href="/code/uth6_beautiful_css_dates">
    <abbr title="April">Apr</abbr> 10<sup>th</sup> <abbr>’09</abbr>
    <sub>1:05 pm</sub>
  </a>*/


});


Handlebars.registerHelper( "sortOrderCheck", function( order ) {

  var sortOrder = Session.get( "sortOrder" );

  if ( sortOrder == order )
    return "checked=''";
  else
    return '';

});

grabInputs = function( template ) {

      var inputs, index;
      var jsonObj = {}; //declare object

      // read in all input elements for the form
      inputs = template.findAll('input,select,textarea');
      for (index = 0; index < inputs.length; ++index) {

        // use each as a key/value pair
        var name = inputs[index].getAttribute('id');
        var value = inputs[index].value;

        jsonObj[name] = value;
      }

      return jsonObj;
}


clearInputs = function( template ) {

      var inputs, index;
      var jsonObj = {}; //declare object

      // read in all input elements for the form
      inputs = template.findAll('input,select,textarea');
      for (index = 0; index < inputs.length; ++index) {

        // use each as a key/value pair
        inputs[index].value = '';
      }
}

searchDOM = function( obj, query ) {
    
    if ( query == '' )
      return;
 
    if ( obj.content.search(new RegExp(query, "i")) !== -1 )
    { 
          return true;
    }
    else
    {
          return false;
    }
 
};

// make :contains be case insensitive
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
  return function( elem ) {
    return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
  };
});

