import $ from 'jquery';

import {
    deleteTask,
    indexTasks,
    postTask,
    toggleTaskStatus,
} from "./requests.js";

indexTasks(function (response) {
    var htmlString = response.tasks.map(function (task) {
        var taskHtml = `<div class='col-12 mb-3 p-2 border rounded task' data-id='${task.id}'>
                            <p>${task.content}</p>
                            <div class='form-check form-switch'>
                                <input class='form-check-input statusCheckbox' type='checkbox' data-id='${task.id}' ${task.completed ? 'checked' : ''}>
                                <label class='form-check-label'>Mark Complete</label>
                            </div>
                            <button class='btn btn-danger deleteButton' data-id='${task.id}'>Delete</button>
                        </div>`;
        return taskHtml;
    });

    $("#tasks").html(htmlString);

    // Add change event for status checkboxes
    $(".statusCheckbox").change(function () {
        var taskId = $(this).data("id");
        var isChecked = $(this).prop("checked");
        toggleTaskStatus(taskId, isChecked);
    });

    // Add click event for delete buttons
    $(".deleteButton").click(function () {
        var taskId = $(this).data("id");
        deleteTask(taskId);
    });
});

function handleFormSubmission(event) {
    event.preventDefault();

    var newTaskContent = $('#newTaskInput').val();

    if (newTaskContent.trim() !== '') {
        postTask(newTaskContent);
    }

    $('#newTaskInput').val('');
}

$(document).ready(function () {
    var addTaskFormHtml = `<form id='addTaskForm' class='mb-3'>
                                <div class='input-group'>
                                    <input type='text' id='newTaskInput' class='form-control' placeholder='Enter a new task' required>
                                    <button type='submit' class='btn btn-primary'>Add Task</button>
                                </div>
                            </form>`;
    $("#addTaskSection").html(addTaskFormHtml);

    $('#addTaskForm').submit(handleFormSubmission);
});
