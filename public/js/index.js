const _base_url = 'http://localhost:5000/api/v1'

const navigate = (link) => {
    window.location.href = link
}

const storelocalId = (id) => {
    localStorage.setItem("project-id", id)
    navigate('/show-project')
}
const deletelocalId = (id) => {
    localStorage.removeItem("project-id")
}

const logOut = () => {
    localStorage.clear()
    window.location.href = '/login'
    return
}

const hideErrorToast = () => {
    const errorToast = document.getElementById('errorToast');
    errorToast.style.display = 'none';
};

const checkIsLogin = () => {
    let token = localStorage.getItem('user-token')
    if (!token) {
        logOut()
    }
    return
}


function showAlert(message, type) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";
    x.innerHTML = message;
    x.style.backgroundColor = type == 'success' ? '#65ff0c' : '#fd4512'

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}


const forms = document.querySelector(".forms"),
    pwShowHide = document.querySelectorAll(".eye-icon"),
    links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");

        pwFields.forEach(password => {
            if (password.type === "password") {
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })

    })
})

links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault(); //preventing form submit
        forms.classList.toggle("show-signup");
    })
})
