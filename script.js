$(document).ready(function() {
      initializeApp()
});

var ajax_result;
var calculatedGradeAvg = null;
var student_array = [];

function initializeApp() {
      addClickHandlersToElements();
}

function addClickHandlersToElements() {
      $('.addButton').click(handleAddClicked);
      $('.cancelButton').click(handleCancelClick);
      $('.dataButton').click(handleDataClicked);
}

function handleAddClicked() {
      //NAME
      if ($('#studentName').val() === '') {
            $('.name-input').addClass('has-error');
      } else {
            $('.name-input').removeClass('has-error');
      } 
      //GRADE
      if ($('#studentCourse').val() === '' ) {
            $('.course-input').addClass('has-error');
      } else {
            $('.course-input').removeClass('has-error');
      }
      //COURSE
      if ($('#studentGrade').val() === '') {
            $('.grade-input').addClass('has-error');
      } else {
            $('.grade-input').removeClass('has-error');
      }
      //if all the info looks good... addStudent()
      if ( $('#studentName').val() !== '' && $('#studentCourse').val() !== '' && $('#studentGrade').val() !== '' ) {
            addStudent();
      }
}

function handleCancelClick() {
      clearAddStudentFormInputs();
      $('.name-input').removeClass('has-error');
      $('.course-input').removeClass('has-error');
      $('.grade-input').removeClass('has-error');
}

function handleDataClicked() {
      $.ajax({
            data: {
                  api_key: 'Q9L2vjKmCy'
            },
            method: 'POST',
            dataType: 'json',
            url: 'http://s-apis.learningfuze.com/sgt/get',
            success: function(result) {
                  ajax_result = result;

                  for (var i=0; i<ajax_result.data.length; i++) {
                        var ajax_student = {
                              'id': ajax_result.data[i].id,
                              'name': ajax_result.data[i].name,
                              'course': ajax_result.data[i].course,
                              'grade': ajax_result.data[i].grade
                        }
                        student_array.push(ajax_student);
                  }
                  updateStudentList(student_array);
            }
      })
}

//adds student to the student_array, then calls updateStudentList which will call renderStudentOnDom
function addStudent() {
      var name = $('#studentName').val();
      var course = $('#studentCourse').val();
      var grade = parseInt($('#studentGrade').val());
      var student = {
            'name': name,
            'course': course,
            'grade': grade
      }
      student_array.push(student);
      addStudentToServer(student);
      clearAddStudentFormInputs();
      updateStudentList(student_array);
}

function addStudentToServer(studentForServer) {
      $.ajax({
            data: {
                  api_key: 'Q9L2vjKmCy',
                  name: studentForServer.name,
                  course: studentForServer.course,
                  grade: studentForServer.grade
            },
            method: 'POST',
            dataType: 'json',
            url: 'http://s-apis.learningfuze.com/sgt/create',
            success: function(result) {
                  ajax_result = result;
            }
      })
}

function removeStudent(studentIndexToDelete){
      student_array.splice(studentIndexToDelete, 1);
      removeStudentFromServer(studentIndexToDelete);
      calculateGradeAverage();
      renderGradeAverage();
}

function removeStudentFromServer(studentIndexToDelete) {
      $.ajax({
            data: {
                  api_key: 'Q9L2vjKmCy',
                  student_id: ajax_result.data[studentIndexToDelete].id
            },
            method: 'POST',
            dataType: 'json',
            url: 'http://s-apis.learningfuze.com/sgt/delete',
            success: function(result) {
                  console.log('student removed from server');
            }
      })
}

function clearAddStudentFormInputs() {
      $('#studentName').val('');
      $('#studentCourse').val('');
      $('#studentGrade').val('');
}

function renderStudentOnDom(studentObj) {
      var $name   = $('<td>').text(studentObj.name);
      var $course = $('<td>').text(studentObj.course);
      var $grade  = $('<td>').text(studentObj.grade);

      var $button = $('<button>', {
            'class': 'btn btn-danger deleteStudent',
            text: 'Delete'
      });
      var $dataButton = $('<td>').append($button);

      (function() {
            $($button).on('click', function() {
                  var studentIndex = student_array.indexOf(studentObj);
                  $(this).parents('tr').remove();
                  removeStudent(studentIndex);
            })
      })();

      var $row = $('<tr>').append($name, $course, $grade, $dataButton).addClass('studentRows');
      $('tbody').append($row);
}

function updateStudentList(students) {
      $('.studentRows').remove();
      for (var i=0; i<students.length; i++) {
            renderStudentOnDom(students[i]);
      }
      calculateGradeAverage();
      renderGradeAverage();
}

function calculateGradeAverage() {
      var sum = 0;
      //sum of all the grades divided by the count
      for (var i=0; i<student_array.length; i++) {
            sum += student_array[i].grade;
      }
      calculatedGradeAvg = Math.floor(sum/student_array.length);
}

function renderGradeAverage() {
      if (student_array.length === 0) {
            $('.avgGrade').text('N/A');
      } else if(isNaN(calculatedGradeAvg)) {
            $('.avgGrade').text('Error');
      } else {
            $('.avgGrade').text(calculatedGradeAvg);
      }
}





