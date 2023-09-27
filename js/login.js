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

const setCookie = (userNameValue, passwordValue, rememberFlag) => {
  let nowDate = new Date();
  nowDate.setTime(nowDate.getTime() + 10 * 60 * 1000);
  $.cookie = `userName=${userNameValue};Path=/;expires=${nowDate}`;
  $.cookie = `password=${passwordValue};Path=/;expires=${nowDate}`;
  $.cookie = `remember=${rememberFlag};Path=/;expires=${nowDate}`;
};
const clearInput = () => {
  userName.value = "";
  password.value = "";
};
const getCookie = (input, cookieParam) => {
  input.value = cookieParam.substring(cookieParam.indexOf("=") + 1);
};
const hideUserNameError = (e) => {
  e.key === "Backspace" && showUserNameError();
  if (regValidUser.test(userName.value)) {
    userCharactersCountMessage.classList.add("hide");
  }
};
const hidePasswordError = (e) => {
  e.key === "Backspace" && showPasswordError();
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
};
const showUserNameError = () => {
  userCharactersCountMessage.classList.remove("hide");
};
const showPasswordError = () => {
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
};
const checkBoxHandler = () => {
  if (checkBox.checked) {
    setCookie(userName.value, password.value, true);
  } else {
    setCookie(userName.value, password.value, false);
  }
};
const passwordValidator = () => {
  if (regValidPass.test(password.value)) {
    checkBoxHandler();
    setTimeout(() => history.back(), 1000);
    clearInput();
  } else {
    showPasswordError();
  }
};
const userNameValidator = () => {
  if (regValidUser.test(userName.value)) {
    return true;
  } else {
    showUserNameError();
    return false;
  }
};
const submitForm = (e) => {
  e.preventDefault();
  userNameValidator() && passwordValidator();
};
const togglePasswordVisibility = (e) => {
  if (e.target.nodeName === "I") {
    eye.classList.toggle("hide");
    eyeSlash.classList.toggle("hide");
    password.type === "password"
      ? (password.type = "type")
      : (password.type = "password");
  }
};
const pushCookiesToInputs = () => {
  if ($.cookie) {
    let cookieArray = $.cookie.split("; ");
    if (cookieArray[2].substring(cookieArray[2].indexOf("=") + 1) == "true") {
      checkBox.checked = true;
      if (regUserName.test(userName.value)) {
        getCookie(userName, cookieArray[0]);
        getCookie(password, cookieArray[1]);
      }
    }
  }
};

userName.addEventListener("keyup", hideUserNameError);
password.addEventListener("keyup", hidePasswordError);
userName.addEventListener("focus", pushCookiesToInputs);
passwordWrapper.addEventListener("click", togglePasswordVisibility);
loginButton.addEventListener("click", submitForm);
