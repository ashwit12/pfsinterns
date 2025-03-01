const inputBox = document.getElementById("input-box");
const pendingList = document.getElementById("pending-list");
const completedList = document.getElementById("completed-list");

function addTask() {
    if (inputBox.value === "") {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;
        li.appendChild(createEditButton()); // Add edit button
        li.appendChild(createDeleteButton()); // Add delete button
        li.addEventListener("click", toggleTaskStatus);

        pendingList.appendChild(li);
    }
    inputBox.value = "";
    saveData();
}

function createEditButton() {
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit ✏️";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent toggling when clicking edit button
        editTask(e.target.parentElement);
    });
    return editBtn;
}

function editTask(task) {
    if (task.parentElement === pendingList) { // Only allow editing for pending tasks
        let currentText = task.childNodes[0].textContent;
        let input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        input.classList.add("edit-input");

        task.innerHTML = ""; // Clear existing content
        task.appendChild(input);
        input.focus();

        input.addEventListener("blur", function () {
            task.textContent = input.value;
            task.appendChild(createEditButton());
            task.appendChild(createDeleteButton());
            task.addEventListener("click", toggleTaskStatus);
            saveData();
        });

        input.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                input.blur();
            }
        });
    }
}

function toggleTaskStatus(event) {
    let task = event.target;
    if (task.tagName === "LI") {
        if (task.parentElement === pendingList) {
            completedList.appendChild(task);
            task.classList.add("checked");
        } else {
            pendingList.appendChild(task);
            task.classList.remove("checked");
        }
        saveData();
    }
}

function createDeleteButton() {
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.classList.add("delete-btn");
    span.addEventListener("click", function (e) {
        e.stopPropagation();
        span.parentElement.remove();
        saveData();
    });
    return span;
}

function saveData() {
    localStorage.setItem("pendingTasks", pendingList.innerHTML);
    localStorage.setItem("completedTasks", completedList.innerHTML);
}

function showTasks() {
    pendingList.innerHTML = localStorage.getItem("pendingTasks") || "";
    completedList.innerHTML = localStorage.getItem("completedTasks") || "";

    document.querySelectorAll("#pending-list li").forEach(li => {
        li.addEventListener("click", toggleTaskStatus);
        li.appendChild(createEditButton());
        li.appendChild(createDeleteButton());
    });

    document.querySelectorAll("#completed-list li").forEach(li => {
        li.addEventListener("click", toggleTaskStatus);
        li.appendChild(createDeleteButton());
    });
}

showTasks();
