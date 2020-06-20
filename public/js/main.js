window.onload = function() {

    setStickyNav = () => {

        var navbar = document.querySelector(".navbar");
        var fixed_position = navbar.offsetTop;

        window.addEventListener("scroll", e => {
            if(window.scrollY > fixed_position) { 
                navbar.classList.add("sticky");
                document.querySelector(".container").style = `margin-top: ${navbar.offsetHeight}px`;
            } else {
                navbar.classList.remove("sticky");
                document.querySelector(".container").style = "margin-top: 0px";
            }
        })
    };

    listenForComposeErrors = () => {
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

    setStickyNav()

    if(window.location.href.indexOf("compose") > -1) {
        listenForComposeErrors();
    }
}
