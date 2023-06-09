const openMenu = async () => {
  // 회원 목록 조회 API 요청
  const result =  await getUser()
  if(result === false) return location.href= "../login/index.html"

  let wrapper = document.getElementById("Wrapper");
  let menu = document.getElementById("Menu_Background");
  let button = document.getElementById("Open_Menu_Btn");
  let closeButton = document.getElementById("CloseBtn");
  let naviWrapper = document.getElementById("Navi_Wrapper");
  let titleWrapper = document.getElementById("Title_Wrapper");
  let logoWrapper = document.getElementById("Logo_wrapper");
  // wrapper.style.height = "1700px";
  wrapper.style.backgroundImage = "url()";
  wrapper.style.backgroundColor = "rgba(0,0,0,0.9)";
  button.style.display = "none";
  menu.style.display = "flex";
  closeButton.style.display = "flex";
  naviWrapper.style.display = "none";
  titleWrapper.style.display = "none";
  logoWrapper.style.display = "none";

};
const closeMenu = () => {
  let wrapper = document.getElementById("Wrapper");
  let menu = document.getElementById("Menu_Background");
  let button = document.getElementById("Open_Menu_Btn");
  let closeButton = document.getElementById("CloseBtn");
  let naviWrapper = document.getElementById("Navi_Wrapper");
  let titleWrapper = document.getElementById("Title_Wrapper");
  let userDataWrapper = document.querySelector("#User_Data_Wrapper");
  let logoWrapper = document.getElementById("Logo_wrapper");
  wrapper.style.height = "";
  // wrapper.style.backgroundImage = 'url(../img/)'
  wrapper.style.backgroundColor = "rgba(0,0,0)";
  wrapper.style.backgroundPosition = "center";
  button.style.display = "flex";
  menu.style.display = "none";
  closeButton.style.display = "none";
  naviWrapper.style.display = "flex";
  titleWrapper.style.display = "block";
  logoWrapper.style.display = "block";
  while (userDataWrapper.firstChild) {
    userDataWrapper.removeChild(userDataWrapper.firstChild);
  }
};
