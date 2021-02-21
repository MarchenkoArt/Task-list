document.getElementById('taskForm').addEventListener('submit', addTask);

function addTask(elm) {
	var taskTitle = document.getElementById('taskTitle').value;
	var taskDesc = document.getElementById('taskDesc').value;
	var taskPriority = document.getElementById('taskPriority').value;
	var taskAssignedTo = document.getElementById('taskAssignedTo').value;
	var taskId = '_' + Math.random().toString(36).substr(2, 9);;
	var taskStatus = 'Открыта';

	var task = {

		title: taskTitle,
		id: taskId,
		status: taskStatus,
		description: taskDesc,
		priority: taskPriority,
		assignedTo: taskAssignedTo
	}

	if (localStorage.getItem('tasks') == null){
		var tasks = [];
		tasks.push(task);
		localStorage.setItem('tasks', JSON.stringify(tasks));
	} 

	else {
		var tasks = JSON.parse(localStorage.getItem('tasks'));
		tasks.push(task);
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	document.getElementById('taskForm').reset();

	showTask();

	elm.preventDefault();

	showNotification({ className: "alert alert-success", msg: "Вы успешно создали задачу!"});
}

function setTaskStatus (id) {
	var tasks = JSON.parse(localStorage.getItem('tasks'));

	for (var i = 0; i < tasks.length; i++) {
		if (tasks[i].id == id) {

			if ( tasks[i].status == 'Закрыта') {
				tasks[i].status = 'Открыта';
				showNotification({ className: "alert alert-warning", msg: "Задача \"" + tasks[i].title + "\" снова в работе!"});
			}
			else {
				tasks[i].status = 'Закрыта';
				showNotification({ className: "alert alert-warning", msg: "Задача \"" + tasks[i].title + "\" была закрыта!"});
			}
		}
	}

	localStorage.setItem('tasks', JSON.stringify(tasks));

	showTask();

}

function deliteTask(id) {
	var tasks = JSON.parse(localStorage.getItem('tasks'));

	for (var i = 0; i < tasks.length; i++) {
		if (tasks[i].id == id) {
			showNotification({ className: "alert alert-danger", msg: "Задача \"" + tasks[i].title + "\" была удалена!"});
			tasks.splice(i, 1);
		}
	}

	localStorage.setItem('tasks', JSON.stringify(tasks));

	showTask();
}

function showTask() {

	var tasks = JSON.parse(localStorage.getItem('tasks'));
	var tasksList = document.getElementById('tasksList');

	tasksList.innerHTML = '';

	if (tasks != null) {
		for (var i = 0; i < tasks.length; i++) {
			var title = tasks[i].title;
			var id = tasks[i].id;
			var status = tasks[i].status;
			var assignedTo = tasks[i].assignedTo;
			var priority = tasks[i].priority;
			var desc = tasks[i].description;
			var btnOpenClose = '';
			var bagePriority = '';

			console.log(assignedTo);

			if (status == 'Открыта') {
				btnOpenClose = '<a onclick="setTaskStatus(\''+ id +'\')" class="btn btn-warning" >Закрыть задачу</a> ';
			} else if (status == 'Закрыта') {
				btnOpenClose = '<a onclick="setTaskStatus(\''+ id +'\')" class="btn btn-primary">Открыть задачу</a> ';
			}

			if (priority == 'Неважно') {
				bagePriority = '<p><i class="fas fa-stopwatch"></i><span class="badge badge-pill badge-secondary">' +
				 priority + '</span></p>';
			} else if (priority == 'Важно') {
				bagePriority = '<p><i class="fas fa-stopwatch"></i><span class="badge badge-pill badge-warning">'
				 + priority + '</span></p>';
			} else if (priority == 'Срочно'){
				bagePriority = '<p><i class="fas fa-stopwatch"></i><span class="badge badge-pill badge-danger">'
				 + priority + '</span></p>';
			}
			

			tasksList.innerHTML += '<div class="jumbotron">'+
			'<h5>' + title + '</h5>' +
			'<p>ID: ' + id + '</p>' +
			'<p><span class="badge badge-dark">' + status + '</span></p>' +
			'<p><i class="fas fa-poll-h"></i> ' + desc + '</p>' +
			'<p><i class="fas fa-user"></i><span> ' + assignedTo + '</span></p>' +
			bagePriority +
			btnOpenClose+
			'<button type="button" onClick="deliteTask(\'' + id + '\')" class="btn btn-danger">Удалить</button>' +
			'</div>';
		}
	}
}


function showNotification({className, msg}) {
	var notification = document.createElement('div');
	notification.className = className;

	notification.style.top =  '10px';
    notification.style.left =  '10px';
    notification.style.position = 'fixed';

    notification.innerHTML = msg;
    document.body.append(notification);

    setTimeout(() => notification.remove(), 2500);
}