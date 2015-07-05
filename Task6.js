// -----Model-----
var Model = function (obj) {
	obj = obj || {};
	this.name = obj.name || 'noName';
	this.age = obj.age || 20;
	this.year = obj.year || 3;
	this.examsTaken = obj.examsTaken || 0;
	this.takeExam = obj.takeExam || function () {
		console.log('function not found');
	};
	
	return this;
};

// -----Controller-----
var Controller = function (obj) {
	document.getElementById(obj.elementId).innerHTML = obj.render();
	
	obj.checkState = function () {
	
		setInterval(function () {
			if (obj.model.changed) {
				document.getElementById(obj.elementId).innerHTML = obj.render();
				obj.model.changed = false;
			};
		}, 100);
	};
	return obj;
};

// -----------------------

var student = new Model({
    name: 'Piotr',
    age: 22,
    year: 5,
    examsTaken: 2,
    takeExam: function () {
        this.examsTaken++;
        this.changed = true;
    }
});


var studentController = new Controller({
    model: student,
    elementId: 'student-container',
    render: function () {
        return '<span>' + this.model.name + ' </span><button id="student-exams-button">Increase exams taken</button>'
				+ '<br><span>Has taken </span>' + this.model.examsTaken + '<span> exams</span>';
    },
    clickHandlers: {
        'student-exams-button': 'updateExams'
    },
    updateExams: function () {
        this.model.takeExam();
    }
});

document.onclick = function () {
	for(var elem in studentController.clickHandlers) {
		if (elem == event.target.id) {
			var func = studentController.clickHandlers[elem];
			studentController[func]();
		};
	};
};
studentController.checkState();