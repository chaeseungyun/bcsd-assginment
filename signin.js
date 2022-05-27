const SignInBtn = document.getElementById("signin-check");
const SignOutBtn = document.getElementById("signout-check");
const inputId = document.getElementById("input-id");
const inputPw = document.getElementById('input-password');
const time = 60*60*72;
let img = document.getElementById('img');
let cookie = document.cookie.split(';');
let Loginflag = 0;
let LoginCount = 0;
let currectId = 'a12345';
let cureectPw = 'a12345';
//console.log(cookie)
console.log(cookie)
axios.get('https://api.thecatapi.com/v1/images/search?size=full')
   .then((response)=>
	{
			img.src = response.data[0].url;			
	})
      .catch((Error)=>{
  console.log(Error);
  })
function setCookie(name) // 쿠키를 저장하는 함수
{
    document.cookie = `${name}_ID=${name};max-age=${time}`;
}
function deleteCookie(name) // 쿠키를 삭제하는 함수
{
    document.cookie = `${name};max-age=-1`;
}
function DataManagement() // 모든 스토리지, 쿠키에 데이터 저장
{
    setCookie(inputId.value);
    localStorage.setItem(`${inputId.value}_ID`,inputId.value);
    sessionStorage.setItem(`${inputId.value}_ID`,inputId.value);
}
function cleanData() // 모든 스토리지, 쿠키 삭제
{
  console.log(cookie)
  localStorage.clear();
  sessionStorage.clear();
  for(let i=0;i<cookie.length;i++)
  {
    deleteCookie(cookie[i]);
  }
  console.log(cookie)
}
function unabled(id){
  alert(`잘못된 비밀번호를 5회 이상 입력하여 로그인이 제한됩니다. 1시간 후 다시 시도하세요.`);
  blockSignIn(id);
  inputId.value = "";
  inputPw.value = "";
  LoginCount=0;
}
function blockSignIn(id){
    document.cookie = `blockflag=${id}; max-age=60*60;`;
    for(let i=0;i<cookie.length;i++)
    {
      if(cookie[i]==id)
      {
        deleteCookie(id);
      }
    }
}

SignOutBtn.addEventListener("click",cleanData); // 로그아웃에 이벤트 추가
SignInBtn.onclick = function LogIn() {
  DataManagement();  
  if(!inputId.value||!inputPw.value)
    {
      alert("아이디 또는 비밀번호를 입력해주세요");
      LoginCount++;
      if(LoginCount>=5)
      {
        unabled(inputId.value);
      }
    }
    else if(inputId.value==currectId&&inputPw.value==cureectPw){
      alert("로그인에 성공했습니다.");
      Loginflag=1;  
    }
    else {
      alert("아이디 또는 비밀번호를 확인하세요")
      LoginCount++;
      if(LoginCount>=5)
      {
        unabled(inputId.value);
      }
    }
  }



