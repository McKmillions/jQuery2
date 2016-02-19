$(document).ready(function(){

	var listo = [];

	//Will explain this later
  var advanceTask = function(lookTask) {
    var modified = lookTask.innerText.trim()
    var flag = false;
    console.log(modified);
    for (var i = 0; i < listo.length; i++) {
      if (listo[i].task === modified) {
        if (listo[i].id === 'new') {
          listo[i].id = 'working';
          flag = true;
        } else if (listo[i].id === 'working') {
          if(!flag){
            listo[i].id = 'archived';
            flag = true;
          }
        }else if (listo[i].id === 'archived') {
          if(!flag){
            listo.splice(i,1);
            flag = true;
          }
        }
      }
      break;
    }
    flag = false;
    task.remove();
  };


	//Task constructor
  var Task = function(task){
    this.task = task,
    this.id = 'new';
  }

	//Hides newTaskForm when the doc loads
	$('#newTaskForm').hide();

	//creates an object and pushes it to our array
	var addTask = function(task){
		//conditional to not allow blank tasks
		if(task){
			task = new Task(task);
			listo.push(task);

			//clears input form after we submit it
			$('#newItemInput').val('');

			//appends list item in the index.html
			$('#newList').append('<a href="#" class="" id="item"><li>' + task.task + '</li></a>');
		}

			//fade toggle so that New button will hide and show the input form at the same time
		$('#newTaskForm, #newListItem').fadeToggle('medium', 'linear');
	};

	//Jquery event that calls addTask when saveNewItem is clicked
	$('#saveNewItem').on('click', function(e){
		e.preventDefault();
		var task = $('#newItemInput').val().trim();
		addTask(task);
	});

	//Opens form
	$('#newListItem').on('click', function(){
		$('#newTaskForm, #newListItem').fadeToggle('medium', 'linear');
	});

	//closes form
	$('#cancel').on('click', function(){
		$('#newTaskForm, #newListItem').fadeToggle('medium', 'linear');
	});

	//allows us to change the status of an item from 'new' to 'inProgress'	
	// $(document).on('click', '#item', function(e) {
	// 	e.preventDefault();
	// });


	//setting var task to acces this later and changed it's id to inProgress
	// $(document).on('click', '#item', function(e) {
	// 	e.preventDefault();
	// 	var task = this;
	// 	advanceTask(task);
	// 	this.id = 'inProgress';
	// });

	//moving the list item by pulling the html around the item itself
  $('#newList').on('click', '#item', function(e){
    e.preventDefault;
    var task = this;
    advanceTask(this);
    task.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
    console.log(listo);
  });


	//moving items from inProgress to archived
  $('#currentList').on('click', '#inProgress', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(this);
    task.id = 'archived';
    $('#archivedList').append(this.outerHTML);
    console.log(listo);
  });


	//deleting items on the list. pass a task in to advanceTask without a new id. this is not a permenant delete it's called a soft delete
  $('#archivedList').on('click', '#archived', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(this);
    console.log(listo);
  });
});