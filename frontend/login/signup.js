let isAuth = false;
let timer
// 휴대폰 인증 토큰 전송API를 요청해주세요.
const getValidationNumber = async () => {
  
  const phone =
    document.querySelector("#PhoneNumber01").value +
    document.querySelector("#PhoneNumber02").value +
    document.querySelector("#PhoneNumber03").value;

  const result = await axios.post("http://localhost:4000/tokens/phone", {
    phone,
  });

  const status = result.data.status;
  const message = result.data.message;

  if (!status) {
    document.querySelector("#ValidationInputWrapper").style.display = "none";
    return alert(message); 
  } else {
    document.querySelector("#ValidationInputWrapper").style.display = "flex";
  }

  let time = document.querySelector("#LimitTime").innerText.slice(0, 1);
  time = time * 60;

  timer = setInterval(() => {
    if (time >= 0) {
      let min = Math.floor(time / 60);
      let sec = String(time % 60).padStart(2, "0");
      time = time - 1;

      document.querySelector("#LimitTime").innerText = `${min}:${sec}`;
    } else {
      clearInterval(timer);
      alert("인증 시간 초과!!");
      document.querySelector("#ValidationInputWrapper").style.display = "none";
      document.querySelector("#LimitTime").innerText = "1:00";
    }
  }, 1000);
};

// 핸드폰 인증 완료 API를 요청해주세요.
const submitToken = async () => {
  const phone =
    document.querySelector("#PhoneNumber01").value +
    document.querySelector("#PhoneNumber02").value +
    document.querySelector("#PhoneNumber03").value;

  const token = document.querySelector("#TokenInput").value;

  const result = await axios.patch("http://localhost:4000/tokens/phone", {
    phone,
    token,
  });

  isAuth = result.data;
  if (isAuth) {
    clearInterval(timer);
    alert("핸드폰 인증 완료!!");
    document.querySelectorAll(".NumberVailidationBtn")[0].style.display = "none";
    document.querySelector("#ValidationInputWrapper").style.display = "none";
  }
};

// 회원 가입 API를 요청해주세요.
const submitSignup = async () => {
  let message;
  let status;

  const name = document.querySelector("#SignupName").value;
  const personal =
    document.querySelector("#SignupPersonal1").value + "-"
    document.querySelector("#SignupPersonal2").value;
  const phone =
    document.querySelector("#PhoneNumber01").value +
    document.querySelector("#PhoneNumber02").value +
    document.querySelector("#PhoneNumber03").value;
  const prefer = document.querySelector("#SignupPrefer").value;
  const email = document.querySelector("#SignupEmail").value;
  const pwd = document.querySelector("#SignupPwd").value;

  try {
    const result = await axios.post("http://localhost:4000/users", {
      name,
      personal,
      phone,
      prefer,
      email,
      pwd,
    });

    message = result.data.message;

    alert(message);

    location.href = "../user/index.html?login=true";
  } catch (error) {
    alert(error.response.data.message);
  }
};
