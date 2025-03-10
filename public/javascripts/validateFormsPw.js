const pw = document.querySelector('#password');
const pw2 = document.querySelector('#password2');
const fb1 = document.querySelector('#pw-feedback-1');
const fb2 = document.querySelector('#pw-feedback-2');
let regex = /\d/;
const form = document.querySelector('.needs-validation');

pw.addEventListener('focusout', () => {
    console.log("FOCUSED OUT");
    if(pw.value.length < 8){
        pw.classList.add('is-invalid');
        fb1.classList.add('invalid-feedback');
        fb1.innerText = "Password must be at least 8 characters";
    } else if(pw.value.length >= 8){
        fb1.classList.remove('invalid-feedback');
        fb1.innerText = "";
        
    }
    if(!regex.test(pw.value)){
        pw.classList.add('is-invalid');
        fb2.classList.add('invalid-feedback');
        fb2.innerText = "Password must contain at least 1 number";
    } else if(regex.test(pw.value)){
        fb2.classList.remove('invalid-feedback');
        fb2.innerText = "";
    }
    if(pw.value.length >= 8 && regex.test(pw.value)){
        pw.classList.remove('is-invalid');
    }
})

pw2.addEventListener('input', () => {
    if(pw2.value !== pw.value){
        pw2.classList.add('is-invalid');
        document.querySelector('#pw2-feedback').innerText = "Passwords must match";
    } else {
        pw2.classList.remove('is-invalid');
        document.querySelector('#pw2-feedback').innerText = "";
    }
})

form.addEventListener('submit', event => {
    if(pw2.value !== pw.value){
        event.preventDefault();
        event.stopPropagation();
    }
    if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    }
    form.classList.add('was-validated')
})