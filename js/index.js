// Add footer with copyright:
const today = new Date();
const thisYear = today.getFullYear();
const footer = document.createElement('footer');
const copyright = document.createElement('p');

copyright.innerHTML = '&copy; Marvin Diaz 2025';
footer.appendChild(copyright);
document.body.appendChild(footer);

// Add list of Skills:
const skills = ["HTML", "CSS", "JavaScript","SQL", "Excel", "Git", "Data Analytics"];
const skillsSection = document.getElementById('Skills');
const skillsList = skillsSection.querySelector('ul');

for (let i=0; i < skills.length; i++) {
    const skill = document.createElement('li');
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

// HANDLE MESSAGE FORM SUBMIT
// DOM Selection
const messageForm = document.forms["leave_message"];
const messageSection = document.getElementById("messages");
const messageList = messageSection.querySelector("ul");

// to prevent the default refreshing
messageForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;

    //DISPLAY MESSAGES IN LIST
    // Creating a new list item
    const newMessage = document.createElement("li");
    newMessage.innerHTML = `
        <a href="mailto:${usersEmail}">${usersName}</a>
        <span>: ${usersMessage}</span>
    `;

    // Creating the remove button
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.type = "button";
    removeButton.addEventListener("click", function () {
        const entry = removeButton.parentNode;
        messageList.removeChild(entry);
        toggleMessagesVisibility();
    });

    // Creating an edit button
    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.type = "button";
    editButton.addEventListener("click", function () {
        editMessage(newMessage, usersMessage);
    });

    newMessage.appendChild(removeButton);
    newMessage.appendChild(editButton);
    messageList.appendChild(newMessage);

    // To clear the form
    messageForm.reset();

    // To ensure the messages visibility
    toggleMessagesVisibility();
});

// Function to handle editing a message
function editMessage(messageItem, currentMessage) {
 
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = currentMessage;
    editInput.style.marginRight = "10px";

    // Creating a save button
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.type = "button";

    // Replacing the current message with the input field and save button
    const messageSpan = messageItem.querySelector("span");
    messageSpan.innerHTML = "";
    messageSpan.appendChild(editInput);
    messageSpan.appendChild(saveButton);

    saveButton.addEventListener("click", function () {
        const updatedMessage = editInput.value.trim();

        // Updating the message display
        if (updatedMessage) {
            messageSpan.innerHTML = `: ${updatedMessage}`;
        } else {
            messageSpan.innerHTML = `: (Message removed)`;
        }
    });
}

// Hiding the #message section
function toggleMessagesVisibility() {
    if (messageList.children.length === 0) {
        messageSection.style.display = "none";
    } else {
        messageSection.style.display = "block";
    }
}

toggleMessagesVisibility();

//DOM SELECTORS (Getting HTML elements)
const projectSection = document.getElementById("Projects");
const projectList = projectSection.querySelector("ul");

//Fetch (Getting Perojects from GitHub API)
fetch("https://api.github.com/users/marvindcode/repos")
    .then((res) => {
        return res.json();
    })
    .then((repositories) => {
        //Add repositories to DOM
        console.log("repositories: ", repositories);

        //Loop through repositories array and:
        for (let i=0; i < repositories.length; i++) {
            //Get specific project data out
            const project = repositories[i].name;
            //Create DOM elements
            const li = document.createElement("li");
            //Put the data from the Project into the DOM element (li)
            li.innerText = project;
            //Add DOM elements to page
            projectList.appendChild(li);
        }
    })

    .catch((error) => {
        //Add error message to DOM
        console.log(error);
        const errorMessage = document.createElement("p");
        errorMessage.innerText = error.message;
        errorMessage.classList.add("error");
        projectSection.appendChild(errorMessage);
    });
