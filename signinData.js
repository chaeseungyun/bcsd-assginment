const SignInBtn = document.getElementById("signin-check");
const inputId = document.getElementById("input-id");
const time = 60*60*72;

function blockSignIn(){
    document.cookie = `flag=blockSignInflag; max-age=60*60;`;
}
function datamanagement() {
    setCookie(inputId.value);
    localStorage.setItem(`${inputId.value}_ID`,inputId.value);
    sessionStorage.setItem(`${inputId.value}_ID`,inputId.value);
}
function setCookie(name){
    document.cookie = `${name}_ID=${name};max-age=${time}`;
}
function deleteCookie(name){
    document.cookie = `${name}_ID=${name};max-age=-1`;
}

SignInBtn.addEventListener("click",datamanagement);