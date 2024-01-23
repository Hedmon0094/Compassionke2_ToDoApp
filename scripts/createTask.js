const firebaseConfig = {
  apiKey: "AIzaSyBIAwvw1tLIuEVudTdBycNPZoJ8CT7tO0s",
  authDomain: "compassion-todo-app-7197d.firebaseapp.com",
  databaseURL: "https://compassion-todo-app-7197d-default-rtdb.firebaseio.com",
  projectId: "compassion-todo-app-7197d",
  storageBucket: "compassion-todo-app-7197d.appspot.com",
  messagingSenderId: "610981354257",
  appId: "1:610981354257:web:7568e6944d96cc7ab8cab0",
  measurementId: "G-HY33Z6L6QJ",
};

//   Initialize Firebase

firebase.initializeApp(firebaseConfig);

// Listening to load event on window
// Reading the number of tasks stored in the database
var totalItems;
var maxCode;
var code;
// window.addEventListener("load", function () {
//   console.log("Complete Window LOADED");
//   firebase
//     .database()
//     .ref("TotalTasks")
//     .on("value", function (snapshot) {
//       totalItems = snapshot.val().totalItems;
//       maxCode = snapshot.val().maxCode;
//       console.log("The total Items are : " + totalItems);
//       if (totalItems > 0 && document.getElementById("info") != null) {
//         document.getElementById("info").remove();
//       }
//       if (totalItems === 0) {
//         firebase.database().ref("TotalTasks").update({
//           maxCode: 0,
//         });
//       }
//     });
// });

// function invoked by add btn
function storeTask(event) {
  event.preventDefault();

  // Get data entered by the USER
  var task = document.getElementById("task").value;
  var desc = document.getElementById("desc").value;
  document.getElementById("task").value = "";
  document.getElementById("desc").value = "";
  console.log({ task, desc });

  code = totalItems;
  if (totalItems < maxCode) {
    code = maxCode + 1;
  }
  // Store data in firebase
  firebase
    .database()
    .ref("TaskList/" + code)
    .set({
      task: task,
      desc: desc,
      status: "pending",
    });

  // Update number of tasks in database
  firebase
    .database()
    .ref("TotalTasks")
    .update({
      totalItems: totalItems + 1,
      maxCode: maxCode + 1,
    });

  if (document.getElementById("info") !== null) {
    document.getElementById("info").remove();
  }

  // Show the data in the body in form of card
  document.getElementById("tasks-header").insertAdjacentHTML(
    "afterend",
    `<div class="Task-item" id="${code}">
    <div class="data" id="${task}">
        <button id="done" class="done" onclick = "changeStatus('${code}')"><i class="far fa-check-circle"></i></button>
        <h2 class="Task">${task}</h2>
        <p class="desc">${desc}</p>
        <small id = "status"></small>
    </div>
    <hr>
    <div class="buttons">
        <button class="button edit" id="editbtn" onclick = "editData('${code}')"><i class="fas fa-edit"></i> EDIT TASK</button>
        <button class="button delete" id="deletebtn" onclick = "deleteData('${code}')">
        <i class="fas fa-trash-alt"></i>DELETE TASK</button>
    </div>
    
    </div>`
  );
}

// Reading the data from the database
var data;
firebase
  .database()
  .ref("TaskList")
  .on("value", function (snapshot) {
    data = snapshot.val();
    console.log("This is data speaking from open");
    console.log(data);
  });
