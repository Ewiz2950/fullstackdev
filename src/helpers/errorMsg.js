function errorMsg (errors, param) {
    var messages = "";
    errors.forEach(error => {
        if (error.param == param) {
            messages += `<li class="list-unstyled text-danger">${error.msg}</li>`;
        }
    })
    if (messages != "") {
        console.log(messages);
        return `<ul class="errors px-0"> ${messages} </ul>`
    }
}