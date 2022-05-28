const SignInBtn = document.getElementById("signin-check");
const SignOutBtn = document.getElementById("signout-check");
const inputId = document.getElementById("input-id");
const inputPw = document.getElementById('input-password');
const time = 60*60*72;
let img = document.getElementById('img');

const LoginCount = `LoginCount`; // localStorage에 저장할 key값, 로그인 실패 횟수를 카운트
let currectId = 'a12345';
let currectPw = 'a12345';

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
    document.cookie = `${name}_ID=${name};max-age=${time}`; // expire 대신 max-age를 사용했다.
}
function deleteCookie(name) // 쿠키를 삭제하는 함수
{
    document.cookie = `${name};max-age=-1`; // max-age를 음수로 준다.
}
function saveData() // 모든 스토리지, 쿠키에 데이터 저장
{
    setCookie(inputId.value);
    localStorage.setItem(`${inputId.value}_ID`,inputId.value);
    localStorage.setItem(`LoginState`,0);
    sessionStorage.setItem(`${inputId.value}_ID`,inputId.value);

}
function cleanData() // 모든 스토리지, 쿠키 삭제
{
  if(parseInt(localStorage.getItem('LoginState'))==1) // 로그인 상태일 때 동작
  {
    localStorage.clear();
    sessionStorage.clear();
    for(let i=document.cookie.split('; ').length-1;i>=0;i--)
    {
      deleteCookie(document.cookie.split('; ')[i]);
    }
    LoginState=0;
    alert("로그아웃 되었습니다.");
  }
}
function failToLogIn() // 로그인 실패 카운트 및 오류 출력, 플래그 생성
{
  saveData();
  if(!inputId.value||!inputPw.value)
  {
    if(localStorage.getItem(LoginCount)==null)
    {
      localStorage.setItem(LoginCount,1);
      alert(`로그인 오류(${localStorage.getItem(LoginCount)}) 아이디 혹은 비밀번호를 입력하세요.`);
    }
    else if(parseInt(localStorage.getItem(LoginCount))<4)
    {
      localStorage.setItem(LoginCount,parseInt(localStorage.getItem(LoginCount))+1);
      alert(`로그인 오류(${localStorage.getItem(LoginCount)}) 아이디 혹은 비밀번호를 입력하세요.`);
    }
    else if(parseInt(localStorage.getItem(LoginCount))>=4)
    {
      localStorage.setItem(LoginCount,parseInt(localStorage.getItem(LoginCount))+1);
      alert("잘못된 로그인 정보를 5회 입력하여 로그인이 제한됩니다. 한 시간 후 시도해주세요.");
      document.cookie = `blockflag=LogInError; max-age=3600`;
    }
  }
  else if(inputId.value!=currectId&&inputPw.value!=currectPw)
  {
    if(localStorage.getItem(LoginCount)==null)
    {
      localStorage.setItem(LoginCount,1);
      alert(`로그인 오류(${localStorage.getItem(LoginCount)}) 아이디 혹은 비밀번호를 확인하세요.`);
    }
    else if(parseInt(localStorage.getItem(LoginCount))<4)
    {
      localStorage.setItem(LoginCount,parseInt(localStorage.getItem(LoginCount))+1);
      alert(`로그인 오류(${localStorage.getItem(LoginCount)}) 아이디 혹은 비밀번호를 확인하세요.`);
    }
    else if(parseInt(localStorage.getItem(LoginCount))>=4)
    {
      localStorage.setItem(LoginCount,parseInt(localStorage.getItem(LoginCount))+1);
      alert("잘못된 로그인 정보를 5회 입력하여 로그인이 제한됩니다. 한 시간 후 시도해주세요.");
      document.cookie = `blockflag=LogInError; max-age=3600`;
    }
  }
}

function blockSignIn(){
  for(let i=0;i<document.cookie.split("; ").length;i++) // 플래그 탐색
  {
    let checkflag = document.cookie.split("; ")[i];
    if(checkflag==`blockflag=LogInError`) // 로그인 플래그가 존재하면 경고창을 띄우고 폼 초기화
    {
      alert("잠시 후 다시 시도하세요.");
      inputId.value="";
      inputPw.value="";
    }
  }
}
inputId.addEventListener("keyup",blockSignIn);
inputPw.addEventListener("keyup",blockSignIn);
SignOutBtn.addEventListener("click",cleanData); // 로그아웃에 이벤트 추가
SignInBtn.onclick = function LogIn()  // 로그인에 이벤트 추가
{
    failToLogIn();
    if(inputId.value==currectId&&inputPw.value==currectPw){
      saveData();
      alert("로그인에 성공했습니다.");
      inputId.value = "";
      inputPw.value = "";
      localStorage.setItem('LoginState',1);
    }
  }
