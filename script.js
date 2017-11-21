/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(function() {
      initializeApp();
});

/**
 * Define all global variables here.  
 */

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

/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */

/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
      addClickHandlersToElements();
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){
      $('.addButton').click(handleAddClicked);
      $('.cancelButton').click(handleCancelClick);
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
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

/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){
      clearAddStudentFormInputs();
      console.log('cancel button clicked!');
}

/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
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

/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){
      $('#studentName').val('');
      $('#studentCourse').val('');
      $('#studentGrade').val('');
}

/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(studentObj){
      var $name = $('<td>').text(studentObj.name);
      var $course = $('<td>').text(studentObj.course);
      var $grade = $('<td>').text(studentObj.grade);
      var $button = $('<button>').text('Delete').addClass('btn btn-danger');
      $button = $('<td>').append($button);
      var $row = $('<tr>').append($name, $course, $grade, $button).addClass('studentRows');
      $('tbody').append($row);
      console.log('renderStudentOnDom has been called!');
}

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(students){
      $('.studentRows').remove();
      for (var i=0; i<students.length; i++) {
            renderStudentOnDom(students[i]);
      }
      calculateGradeAverage();
      renderGradeAverage();
      console.log('updateStudentList function has been called!');
}

/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(){
      console.log('calculateGradeAverage has been called');
}

/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(){
      console.log('renderGradeAverage has been called');
}





