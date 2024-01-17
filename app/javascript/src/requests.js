import $ from 'jquery';

$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

export var indexTasks = function (successCB, errorCB) {
  var request = {
    type: 'GET',
    url: 'api/tasks?api_key=1',
    success: successCB,
    error: errorCB
  }

  $.ajax(request);
};

export var postTask = function (content) {
  var request = {
    type: 'POST',
    url: 'api/tasks?api_key=1',
    data: {
      task: {
        content: content
      }
    },
    success: function(){
        location.reload();
    },
    error: function(error){
        console.error('Error adding task: ', error)
    }
  }

  $.ajax(request);
};

export var deleteTask = function (dataId) {
    var request = {
        type: 'DELETE',
        url: `api/tasks/${dataId}?api_key=1`,
        success: function(){
            location.reload();
        },
        error: function(error){
            console.error('Error deleting task')
        }
    };
    $.ajax(request);
};

export function toggleTaskStatus(taskId, isChecked) {
    var newStatus = isChecked ? 'Complete' : 'Active';

    $.ajax({
        type: 'PUT',
        url: 'api/tasks/' + taskId + '/' + (newStatus === 'Complete' ? 'mark_complete' : 'mark_active') + '?api_key=1',
        success: function() {

            indexTasks()
        },
        error: function(error) {
            console.error('Error updating task status:', error);
        }
    });
}
