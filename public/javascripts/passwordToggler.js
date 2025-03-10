const togglePassword = (num) => {
    document.querySelector(`#toggler-${num}`).classList.toggle('d-none');
    if(num % 2){
        document.querySelector(`#toggler-${num + 1}`).classList.toggle('d-none');
    } else {
        document.querySelector(`#toggler-${num - 1}`).classList.toggle('d-none');
    }
    let select = '#password';
    if(num > 2){
        select += '2';
    }
    let input = document.querySelector(select);
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}

let togglers = document.querySelectorAll('.password-toggler');
for(let x = 0; x < togglers.length; x++){
    togglers[x].addEventListener('click', () => {
        togglePassword(x + 1);
    })
}