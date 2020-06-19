window.onload = function() {

    const submitForm = document.querySelector("form");
    
    const noTitleError = document.querySelector(".noTitleError");
    const noContentError = document.querySelector(".noContentError");

    submitForm.addEventListener("submit", e => {
        
        noContentError.style.display = "none";
        noTitleError.style.display = "none";

        if(submitForm["title"].value.replace(" ", "") == "") {
            e.preventDefault();
            noTitleError.style.display = "block";
        }
        if(submitForm["content"].value.replace(" ", "") == "") {
            e.preventDefault();
            noContentError.style.display = "block";
        } 
    })
}