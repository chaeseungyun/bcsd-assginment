const SignInBtn = document.getElementById("signin-check");
const inputId = document.getElementById("input-id");
const time = 60*60*72;
let img = document.getElementById('img');
let LoginCount=0;

SignInBtn.onclick = function checkIdPw() {
    inputId.value;
    let inputPw = document.getElementById('input-password').value;
    if(!inputId||!inputPw)
    {
      alert("아이디 또는 비밀번호를 입력해주세요");
      LoginCount++;
      if(LoginCount>=5)
      {
        alert("1시간 후 다시 시도하세요.");
        blockSignIn();
        LoginCount=0;
      }
    }
    else if(inputId=='a12345'&&inputPw=='a12345'){
      alert("로그인에 성공했습니다.");
    }
    else {
      alert("아이디 또는 비밀번호를 확인하세요")
    }
  }

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
	axios.get('https://api.thecatapi.com/v1/images/search?size=full')
    .then((response)=>
		{
			img.src = response.data[0].url;			
		})
        .catch((Error)=>{
    console.log(Error);
    })