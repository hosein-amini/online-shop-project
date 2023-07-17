import {
  regValidUser,
  regValidPass,
  regPassCapitalLetters,
  regPassLowercaseLetters,
  regPassNumbers,
  regPassCharacters,
  regPassCharactersCount,
  regUserName,
} from "./regex.js";
const $ = document;
const userName = $.querySelector("#username");
const password = $.querySelector("#password");
const checkBox = $.querySelector("#check");
const loginButton = $.querySelector("button");
const passwordWrapper = $.querySelector(".password-wrapper");
const eye = $.querySelector(".fa-eye");
const eyeSlash = $.querySelector(".fa-eye-slash");

let capitalLettersMessage = $.querySelector(".capitalLettersMessage");
let lowercaseLettersMessage = $.querySelector(".lowercaseLettersMessage");
let numbersMessage = $.querySelector(".numbersMessage");
let charactersMessage = $.querySelector(".charactersMessage");
let charactersCountMessage = $.querySelector(".charactersCountMessage");
let userCharactersCountMessage = $.querySelector(".userCharactersCountMessage");

passwordWrapper.addEventListener("click", (e) => {
  if (e.target.nodeName === "I") {
    eye.classList.toggle("hide");
    eyeSlash.classList.toggle("hide");
    password.type === "password"
      ? (password.type = "type")
      : (password.type = "password");
  }
});

function setCookie(userNameValue, passwordValue) {
  let nowDate = new Date();
  nowDate.setTime(nowDate.getTime() + 10 * 60 * 1000);
  $.cookie = `userName=${userNameValue};Path=/;expires=${nowDate}`;
  $.cookie = `password=${passwordValue};Path=/;expires=${nowDate}`;
}

function clearInput() {
  userName.value = "";
  password.value = "";
}
loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (regValidUser.test(userName.value)) {
    if (regValidPass.test(password.value)) {
      if (checkBox.checked) {
        setCookie(userName.value, password.value);
        setTimeout(() => {
          history.back();
        }, 1000);
      }
      clearInput();
    } else {
      if (!regPassCapitalLetters.test(password.value)) {
        capitalLettersMessage.classList.remove("hide");
      }
      if (!regPassLowercaseLetters.test(password.value)) {
        lowercaseLettersMessage.classList.remove("hide");
      }
      if (!regPassNumbers.test(password.value)) {
        numbersMessage.classList.remove("hide");
      }
      if (!regPassCharacters.test(password.value)) {
        charactersMessage.classList.remove("hide");
      }
      if (!regPassCharactersCount.test(password.value)) {
        charactersCountMessage.classList.remove("hide");
      }
    }
  } else {
    userCharactersCountMessage.classList.remove("hide");
  }
});

userName.addEventListener("keyup", () => {
  if (regValidUser.test(userName.value)) {
    userCharactersCountMessage.classList.add("hide");
  }
});
password.addEventListener("keyup", () => {
  if (regPassCapitalLetters.test(password.value)) {
    capitalLettersMessage.classList.add("hide");
  }
  if (regPassLowercaseLetters.test(password.value)) {
    lowercaseLettersMessage.classList.add("hide");
  }
  if (regPassNumbers.test(password.value)) {
    numbersMessage.classList.add("hide");
  }
  if (regPassCharacters.test(password.value)) {
    charactersMessage.classList.add("hide");
  }
  if (regPassCharactersCount.test(password.value)) {
    charactersCountMessage.classList.add("hide");
  }
});

// !-------------------------------------

userName.addEventListener("focus", () => {
  if ($.cookie) {
    let cookieArray = $.cookie.split("; ");
    if (regUserName.test(userName.value)) {
      if (cookieArray[0].includes("userName")) {
        getCookie(userName, cookieArray[0]);
        getCookie(password, cookieArray[1]);
      }
    }
  }
});

function getCookie(input, cookieParam) {
  input.value = cookieParam.substring(cookieParam.indexOf("=") + 1);
}
