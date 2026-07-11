console.log("SCRIPT LOADED");
const uploadForm = document.getElementById("uploadForm");
const documentInput = document.getElementById("documentInput");
const uploadButton = document.getElementById("uploadButton");

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

    console.log("Selected file:", uploadedFile);

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

});


uploadButton.addEventListener("click", async (event)=>{
    event.preventDefault();

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
        console.log("Uploading document...");
        const response = await fetch("http://localhost:5000/upload", {

            method: "POST",

            body: formData

        });

        console.log(response);

        updateStatus("Processing document...");
        console.log("Document processing...");

        if (!response.ok) {

            throw new Error("Failed to process document.");

        }

        documentInput.disabled = false;
        removeFile.disabled = false; 

        console.log("Document processed successfully.");

const result = await response.json();

updateStatus("Document ready.");
console.log("Document ready for questions.");

questionSection.classList.remove("hidden");

}

    catch (error) {

        processingSection.classList.add("hidden");

        showError(error.message);

        documentInput.disabled = false;
        removeFile.disabled = false;

    }

})

askButton.addEventListener("click", async (event) => {
    console.log("Ask button clicked");

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

    // return;

   }

    try {
        console.log("Sending question:", question);

        const response = await fetch("http://localhost:5000/ask", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                question

            })

        });

        console.log("Response status:", response.status);

    
        if (!response.ok) {

            throw new Error("Unable to generate answer.");

        }

        documentInput.disabled = false;
        removeFile.disabled = false;

        console.log("Response received:", response);
        const data = await response.json();
        console.log("Data received:", data);

        console.log("Answer received:", data.answer);

        answerBox.value = data.answer;

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