const http = new coreHTTP;

// Block Variables
let theList = [];

// setup selectors
const editButton =  document.querySelector(".edit-btn");
const taskname =  document.querySelector("#name");
const taskStatus =  document.querySelector("#taskStatus");

// const delButton =  document.querySelector(".del-btn");


const segments = window.location.href.split('/');
const id = segments[segments.length - 1];
console.log(id)

// Listeners
if (editButton) {
  editButton.addEventListener("click", httpPost);
}
// delButton.addEventListener("click", httpDelete);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/* Helper Functions */
function ShowList() {
  let output = "<ul>";
  theList.forEach((item, index) => {
    const capitalizedItem = capitalizeFirstLetter(item);
    output += `<li>${capitalizedItem} <button class="del-item-btn small-button" data-index="${index}">Delete</button></li>`;
  });
  output += "</ul>";
  result.innerHTML = output;

  // Add event listeners for the delete buttons
  const deleteButtons = document.querySelectorAll(".del-item-btn");
  deleteButtons.forEach(button => {
    button.addEventListener("click", httpDelete);
  });
}

async function GetTask() {

    http.post('/findById',{id :id})
      .then( (response)=> {
        console.log(response);
        taskname.value = response.name;
        taskname.taskStatus = response.completed;
      })
      .catch((error) => {
        console.log(error)
      });
}

/* Listener Functions */
async function httpPost(e) {

  e.preventDefault();
  
  // Todo : Validation 
  console.log(taskname.value);
  console.log(taskStatus.value);
  // send to Mongo DB

  http.post('/update',{id:id,name:taskname.value,completed:taskStatus.value})
  .then( (response)=> {
    console.log(response);
    alert('Task editted succesfully');
    window.location = "/"
  })
  .catch((error) => {
    console.log(error)
  });

}

function httpDelete(e) {
  showLoading();
  e.preventDefault();
  index = e.target.getAttribute("data-index");

  // Confirmation for delete
  if (!confirm("Are you sure you want to delete this item?")) {
    return; // Exit if user cancels the delete action
  }

  if(index != -1){
      theList.splice(index,1)
  }else{
    alert('element not found')
  }
  WriteList();
  ShowList();
  input.value = ""
}

// Loading functions
function showLoading() {
  result.innerHTML = "Loading...";
}

async function main() {
  if (editButton) {
    editButton.disabled = true;
    editButton.addEventListener("click", httpPost);
  }

  await GetTask();


  editButton.disabled = false;
}

main();