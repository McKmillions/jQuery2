$(document).ready(function(){
  var listo = [];

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

  var Task = function(task){
    this.task = task,
    this.id = 'new';
  }

  $('#newTaskForm').hide();

  var addTask = function(task){
    if(task){
      task = new Task(task);
      listo.push(task);

      $('#newItemInput').val('');
      $('#newList').append('<a href="#" class="" id="item"><li>' + task.task + '</li></a>');
    }
    $('#newTaskForm, #newListItem').fadeToggle('medium', 'linear');
  }
  var reloadTasks = function(){
    console.log(listo);
    for (var i = 0; i < listo.length; i++) {
      if (listo[i].id === 'new') {
        $('#newList').append('<a href="#" class="" id="item"><li>' + listo[i].task + '</li></a>');
      } else if (listo[i].id === 'working') {
        $('#currentList').append('<a href="#" class="" id="item"><li>' + listo[i].task + '</li></a>');
      } else if (listo[i].id === 'archived') {
        $('#archivedList').append('<a href="#" class="" id="item"><li>' + listo[i].task + '</li></a>');
      }
    }
  }
  $('#reloadHeader').on('click', function(e){
    e.preventDefault();
    reloadTasks();
  })
  $('#saveNewItem').on('click', function(e){
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  });

  $('#newListItem').on('click', function(){
    $('#newTaskForm, #newListItem').fadeToggle('medium', 'linear');
  });

  $('#cancel').on('click', function(){
    $('#newTaskForm, #newListItem').fadeToggle('medium', 'linear');
  });

  $('#newList').on('click', '#item', function(e){
    e.preventDefault;
    var task = this;
    advanceTask(this);
    task.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
    console.log(listo);
  });

  $('#currentList').on('click', '#inProgress', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(this);
    task.id = 'archived';
    $('#archivedList').append(this.outerHTML);
    console.log(listo);
  });

  $('#archivedList').on('click', '#archived', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(this);
    console.log(listo);
  });
});