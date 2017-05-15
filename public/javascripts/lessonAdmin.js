let nbRule = 1;
let modal = '';
let tabHeader = '';
let tab = '';
let tabFooter = '';

$( "#addRule" ).click(function() {
	nbRule++;
	modal = '<div id="myModal'+nbRule+'" class="modal fade" role="dialog">'
		    +	'<div class="modal-dialog" role="document">'
		    +	'<div class="modal-content">'
			  +	'<div class="modal-header">'
  		  + '<h4 class="modal-title">Règle n° '+nbRule+'</h4>'
			  +	'</div>'
			  + '<div class="modal-body">'
  		  + '<textarea id="ruleEditor'+nbRule+'" class="ckeditor" name="rule'+nbRule+'"></textarea>' 
			  + '</div>'
			  + '<div class="modal-footer">'
 			  + '<button type="button" class="btn btn-success" data-dismiss="modal">Valider</button>'
			  + '</div>'
			  + '</div>'
		    + '</div>'
	      + '</div>';

	//Add modal
	$('#addLesson').append(modal);
	let id = "#ruleEditor" + nbRule;
	let name = "#myModal" + nbRule;
	$(id).ckeditor();
	$(name).modal('show');

	//Add name and buttons
	let rule = nbRule;
		
	tab = '<tr id="tabRule'+nbRule+'">'
		  + '<td>Règle n° '+nbRule+'</td>'
		  + '<td><button type="button" class="btn btn-success" id="showRule'+nbRule+'">Voir la règle</button></td>'
		  + '<td><button type="button" class="btn btn-danger" id="deleteRule'+nbRule+'">Supprimer</button></td>'
	    + '</tr>';

	if(nbRule === 2) {
		tabHeader = '<br><table id="addTab" class="table table-striped">'
			   	    + '<thead>'
			        + '<tr>'
			        + '<th>Nom</th>'
			        + '<th>Règle</th>'
			        + '<th>Action</th>'
			        + '</tr>'
			        + '</thead>';

    tabFooter = '</table>';

    tab = tabHeader + tab + tabFooter;	

	$('#container').append(tab).on('click', '#showRule'+nbRule, function(){
		  $(name).modal('show'); 
		}).on('click', '#deleteRule'+nbRule, function(){
			update(rule);
		});				
	} else {
		$('#addTab').append(tab).on('click', '#showRule'+nbRule, function(){
		  $(name).modal('show'); 
		}).on('click', '#deleteRule'+nbRule, function(){
			update(rule);
		});
	}
});

function update(rule) {
  let idModal = "#myModal" + rule;
  let idTabRule = "#tabRule" + rule;
  let num;
	$(idModal).remove();
  $(idTabRule).remove();
  nbRule--;

  if(nbRule === 1){
    $("#addTab").remove()
  }


}