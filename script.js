$(document).ready(function() {
      initializeApp()
});

var calculatedGradeAvg = null;
var student_array = [
      {     name: 'John', 
            course: 'Magic', 
            grade: 90
      },
      {     name: 'Betty', 
            course: 'Carpentry', 
            grade: 90
      }
];

function initializeApp(){
      addClickHandlersToElements();
}

function addClickHandlersToElements(){
      $('.addButton').click(handleAddClicked);
      $('.cancelButton').click(handleCancelClick);
}

function handleAddClicked(){
      if ($('#studentName').val() === '' || $('#studentCourse').val() === '' || $('#studentGrade').val() === '') {
            // $('#studentName').addClass('has-error');
            // $('#studentCourse').addClass('has-error');
            // $('#studentGrade').addClass('has-error');
            console.log('Must enter in a valid name');
      } else {
            addStudent();
      }
}

function handleCancelClick(){
      clearAddStudentFormInputs();
      console.log('cancel button clicked!');
}

function addStudent(){
      var name = $('#studentName').val();
      var course = $('#studentCourse').val();
      var grade = parseInt($('#studentGrade').val());
      var student = {
            'name': name,
            'course': course,
            'grade': grade
      }
      student_array.push(student);
      clearAddStudentFormInputs();
      updateStudentList(student_array);
}

function removeStudent(studentIndexToDelete){
      //remove student row DOM elements

      //remove object from the global variable student_array
      delete student_array[studentIndexToDelete];
      console.log('index: ' + studentIndexToDelete);
      console.log(student_array);
}

function clearAddStudentFormInputs(){
      $('#studentName').val('');
      $('#studentCourse').val('');
      $('#studentGrade').val('');
}

function renderStudentOnDom(studentObj, i){
      var $name   = $('<td>').text(studentObj.name);
      var $course = $('<td>').text(studentObj.course);
      var $grade  = $('<td>').text(studentObj.grade);

      var $button = $('<button>', {
            'class': 'btn btn-danger deleteStudent',
            text: 'Delete',
            studentIndex: i
      });
      var $dataButton = $('<td>').append($button);

      (function() {
            $($button).on('click', function() {
                  var studentIndex = $(this).attr('studentIndex');
                  $(this).parents('tr').remove();
                  removeStudent(studentIndex);
            })
      })();

      var $row = $('<tr>').append($name, $course, $grade, $dataButton).addClass('studentRows');
      $('tbody').append($row);
      console.log('renderStudentOnDom has been called!');
}

function updateStudentList(students){
      $('.studentRows').remove();
      for (var i=0; i<students.length; i++) {
            renderStudentOnDom(students[i], i);
      }
      calculateGradeAverage();
      renderGradeAverage();
      console.log('updateStudentList function has been called!');
}

function calculateGradeAverage(){
      var sum = 0;
      //sum of all the grades divided by the count
      for (var i=0; i<student_array.length; i++) {
            sum += student_array[i].grade;
      }
      calculatedGradeAvg = Math.floor(sum/student_array.length);
      console.log(calculatedGradeAvg);
      console.log('calculateGradeAverage has been called');
}

function renderGradeAverage(){
      $('.avgGrade').text(calculatedGradeAvg);
      console.log('renderGradeAverage has been called');
}





