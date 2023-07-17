let regValidUser = /^\S{3,}$/;
let regValidPass =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])\S{8,}$/;
let regPassCapitalLetters = /^(?=.*?[A-Z])\S{1,}$/;
let regPassLowercaseLetters = /^(?=.*?[a-z])\S{1,}$/;
let regPassNumbers = /^(?=.*?[0-9])\S{1,}$/;
let regPassCharacters = /^(?=.*?[#?!@$%^&*-])\S{1,}$/;
let regPassCharactersCount = /^\S{8,}$/;
let regUserName = /^$/;

export {
  regValidUser,
  regValidPass,
  regPassCapitalLetters,
  regPassLowercaseLetters,
  regPassNumbers,
  regPassCharacters,
  regPassCharactersCount,
  regUserName
};
