const http = new coreHTTP;

// Block Variables
let theList = [];

// setup selectors
const result = document.querySelector(".result");
const input =  document.querySelector("#listitem");
const addButton =  document.querySelector(".add-btn");
// const delButton =  document.querySelector(".del-btn");

// Listeners
if (addButton) {
  addButton.addEventListener("click", httpPost);
}
// delButton.addEventListener("click", httpDelete);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/* Helper Functions */
function ShowList() {
  let output = "<ul>";
  theList.forEach((item, index) => {
    output += `<li>${item.name}  ${item.completed} 
      <button class="del-item-btn small-button" data-index="${item._id}">Edit</button>
      <button class="del-item-btn small-button" data-index="${item._id}">Delete</button>
    </li>`;
  });
  output += "</ul>";
  result.innerHTML = output;

  // Add event listeners for the delete buttons
  const deleteButtons = document.querySelectorAll(".del-item-btn");
  deleteButtons.forEach(button => {
    button.addEventListener("click", httpDelete);
  });
}

async function GetList() {
    http.get('/api')
    .then( (response)=> {
      console.log(response);
      theList = response;
      ShowList();
    })
    .catch((error) => {
      console.log(error)
    });
}

async function WriteList() {
  http.post('/api',theList)
    .then( (response)=> {
      // console.log(response)
    })
    .catch((error) => {
      console.log(error)
    });
}

/* Listener Functions */
async function httpPost(e) {
  showLoading();
  e.preventDefault();
  
  // Validation for blank input
  if (!input.value.trim()) {
    alert("Input cannot be blank!");
    ShowList();
    return;
  }

  theList.push(input.value);
  WriteList();
  ShowList();
  input.value = "";
}

function httpDelete(e) {
  showLoading();
  e.preventDefault();
  index = e.target.getAttribute("data-index");

  // Confirmation for delete
  if (!confirm("Are you sure you want to delete this item?")) {
    ShowList();
    return; // Exit if user cancels the delete action
  }

  ShowList();

  console.log(index);

  http.delete('/api',{id :index})
  .then( (response)=> {
    alert('Task Deleted Sucessfully');
    GetList();
  })
  .catch((error) => {
    console.log(error)
  });

  ShowList();
}

// Loading functions
function showLoading() {
  result.innerHTML = "Loading...";
}

async function main() {
  if (addButton) {
  addButton.disabled = true;

    addButton.addEventListener("click", httpPost);
  }
  // delButton.disabled = true;
  showLoading();

  await GetList();

  addButton.disabled = false;
  // delButton.disabled = false;
}

main();