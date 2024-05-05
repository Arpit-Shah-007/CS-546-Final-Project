const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};


const isValidStevensEmail = (email) => {
    return !/^[a-zA-Z][a-zA-Z0-9]*@stevens\.edu$/.test(email.trim().toLowerCase());
};



const isValidPassword = (password) => {
    return !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])\S{8,}$/.test(password.trim())
}

const clearErrorMessages = () => {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
};



const discardProject = () => {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("branch").value = "";
    document.getElementById("upload-feature").value = "";
    document.getElementById("project_video").src = "";
    clearErrorMessages();
};


const setPreviewVideo = (e) => {
    const file = e.target.files[0]
    console.log("file changed", file)
    document.getElementById('project_video').setAttribute('src', URL.createObjectURL(file))
}

const validateProjectFields = () => {
    let isValid = true;
    const fields = [
        { id: 'title', errorId: 'titleError', message: 'Title is required' },
        { id: 'description', errorId: 'descriptionError', message: 'Description is required' },
        { id: 'branch', errorId: 'branchError', message: 'Branch is required' },
        { id: 'subject', errorId: 'subjectError', message: 'Subject is required' },
        { id: 'upload-feature', errorId: 'videoError', message: 'Project video is required' }
    ];

    fields.forEach(field => {
        let value
        if (field.id != 'upload-feature') {
            value = document.getElementById(field.id).value.trim();
        } else {
            value = document.getElementById(field.id)
        }

        const errorElement = document.getElementById(field.errorId);
        if (!value || (field.id == 'upload-feature' && typeof value != 'object')) {
            errorElement.textContent = field.message;
            isValid = false;
        } else {
            errorElement.textContent = '';
        }
    });

    return isValid;
};