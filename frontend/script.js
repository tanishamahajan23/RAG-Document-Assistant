console.log("SCRIPT LOADED");
const uploadForm = document.getElementById("uploadForm");
const documentInput = document.getElementById("documentInput");

const selectedFile = document.getElementById("selectedFile");
const fileName = document.getElementById("fileName");
const removeFile = document.getElementById("removeFile");

const processingSection = document.getElementById("processingSection");
const processingStatus = document.getElementById("processingStatus");

const questionSection = document.getElementById("questionSection");
const questionForm = document.getElementById("questionForm");
const questionInput = document.getElementById("questionInput");
const askButton = document.getElementById("askButton");

const loadingSection = document.getElementById("loadingSection");

const answerSection = document.getElementById("answerSection");
const answerBox = document.getElementById("answerBox");

const errorSection = document.getElementById("errorSection");
const errorMessage = document.getElementById("errorMessage");

let uploadedFile = null;

function showError(message) {

    errorMessage.textContent = message;
    errorSection.classList.remove("hidden");

}

function hideError() {

    errorSection.classList.add("hidden");

}

function resetProgress() {

    updateStatus("Waiting for document...");

}
function updateStatus(message) {

    processingStatus.textContent = message;

}

function displaySelectedFile(file) {

    uploadedFile = file;

    fileName.textContent = file.name;

    selectedFile.classList.remove("hidden");

}

removeFile.addEventListener("click", () => {

    resetApplication();

});

documentInput.addEventListener("change", (event) => {

    hideError();

    const file = event.target.files[0];

    if (!file) {
        return;
    }

    displaySelectedFile(file);

    uploadDocument();

});

async function uploadDocument() {

    if (!uploadedFile) {

        return;

    }

    hideError();

    processingSection.classList.remove("hidden");

    updateStatus("Uploading document...");

    const formData = new FormData();

    formData.append("document", uploadedFile);

    try {

        documentInput.disabled = true;
        removeFile.disabled = true;
        const response = await fetch("http://localhost:3000/upload", {

            method: "POST",

            body: formData

        });

        updateStatus("Processing document...");

        if (!response.ok) {

            throw new Error("Failed to process document.");

        }

        documentInput.disabled = false;
        removeFile.disabled = false; 

        console.log("Before response.json");

const result = await response.json();

console.log("After response.json");

console.log(result);

updateStatus("Document ready.");

questionSection.classList.remove("hidden");

console.log("Question section shown");

    }

    catch (error) {

        processingSection.classList.add("hidden");

        showError(error.message);

        documentInput.disabled = false;
        removeFile.disabled = false;

    }

}

questionForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    hideError();

    answerSection.classList.add("hidden");

    loadingSection.classList.remove("hidden");

    askButton.disabled = true;

    const question = questionInput.value.trim();

    if (!question) {

    showError("Please enter a question.");

    loadingSection.classList.add("hidden");

    askButton.disabled = false;

    return;

   }

    try {

        const response = await fetch("http://localhost:3000/ask", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                question

            })

        });

        if (!response.ok) {

            throw new Error("Unable to generate answer.");

        }
        documentInput.disabled = false;
        removeFile.disabled = false;

        const data = await response.json();

        answerBox.textContent = data.answer;

        answerSection.classList.remove("hidden");

    }

    catch (error) {

        showError(error.message);
        documentInput.disabled = false;
        removeFile.disabled = false;

    }

    finally {

        loadingSection.classList.add("hidden");

        askButton.disabled = false;

    }

});

function resetApplication() {

    uploadedFile = null;

    documentInput.value = "";

    fileName.textContent = "";

    selectedFile.classList.add("hidden");

    processingSection.classList.add("hidden");

    questionSection.classList.add("hidden");

    answerSection.classList.add("hidden");

    loadingSection.classList.add("hidden");

    hideError();

    questionInput.value = "";

    answerBox.textContent = "";

    updateStatus("Waiting for document.");

}