let nbRule = 1;
let modal = '';
let tabHeader = '';
let tab = '';
let tabFooter = '';

//Ajoute une nouvelle règle
$( "#addRule" ).click(function() {
	nbRule++;
	//Création du modal
	modal = '<div id="myModal'+nbRule+'" class="modal fade" role="dialog">'
		    +	'<div class="modal-dialog" role="document">'
		    +	'<div class="modal-content">'
			  +	'<div class="modal-header">'
  		  + '<h4 class="modal-title" id="title'+nbRule+'">Règle n° '+nbRule+'</h4>'
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

	//Ajout du modal
	$('#addLesson').append(modal);
	let id = "#ruleEditor" + nbRule;
	let name = "#myModal" + nbRule;
	$(id).ckeditor();
	$(name).modal('show');

	//Ajout des boutons
	tab = '<tr id="tabRule'+nbRule+'">'
		  + '<td id=tdTitle'+nbRule+'>Règle n° '+nbRule+'</td>'
		  + '<td><button type="button" class="btn btn-success" id="showRule'+nbRule+'" onclick="show(this.getAttribute(\'id\'));">Voir la règle</button></td>'
		  + '<td><button type="button" class="btn btn-danger" id="deleteRule'+nbRule+'" onclick="update(this.getAttribute(\'id\'));">Supprimer</button></td>'
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

		$('#container').append(tab);			
	} else {
		$('#addTab').append(tab);
	}
});

//Afficher un modal
function show(id) {
	let idModal = "#myModal" + id.substring(8);
	$(idModal).modal('show');
}

//Supprime un modal et met à jour les autres
function update(id) {
	let myId = parseInt(id.substring(10)); 

	$("#myModal"+myId).remove();
	$("#tabRule"+myId).remove();

	for(let i = (myId + 1); i <= nbRule; i++) {
		$("#myModal"+i).prop('id', "myModal"+(i-1));
		$("#title"+i).text("Règle n° "+(i-1));
		$("#title"+i).prop('id', 'title'+(i-1));
		$("#ruleEditor"+i).prop('name', 'rule'+(i-1));
		$("#ruleEditor"+i).prop('id', 'ruleEditor'+(i-1));

		$("#tabRule"+i).prop('id', 'tabRule'+(i-1));
		$("#tdTitle"+i).text("Règle n° "+(i-1));
		$("#tdTitle"+i).prop('id', 'tdTitle'+(i-1));
		$("#showRule"+i).prop('id', 'showRule'+(i-1));
		$("#deleteRule"+i).prop('id', 'deleteRule'+(i-1));
	}

	nbRule--;

	if(nbRule === 1){
		$("#addTab").remove()
	}
}

$("#addLesson").submit(function() {
	let numLesson = $("#numLesson").val();
	let boolean;

	$.ajaxSetup({async:false});
	$.post(
		"/admin/lesson/ajax", 
		{ num : numLesson },
		function(data) {
			if(data === "exist") {
				boolean = false;
			} else {
				boolean = true;
			}
		},
		"text" 
	);
	$.ajaxSetup({async:true});

	$('#modalExistLesson').modal('show');
	return boolean;
});

