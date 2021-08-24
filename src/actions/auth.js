// === action types
export const CHANGE_FIELD = 'CHANGE_FIELD';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const CLICK_ON_LOGOUT = 'CLICK_ON_LOGOUT';
export const SUBMIT_SIGNIN = 'SUBMIT_SIGNIN';
export const SUBMIT_COMMENT = 'SUBMIT_COMMENT';

// === action creators
export const changeField = (newValue, identifier) => ({
  type: CHANGE_FIELD,
  newValue: newValue,
  name: identifier,
});

export const saveUserData = ( nickname, isLogged, email, comment) => ({
  type: SAVE_USER_DATA,
  nickname: nickname,
  logged: isLogged,
  email: email,
  comment: comment,
});

export const handleLogOut = () => ({
  type: CLICK_ON_LOGOUT,
});

export const submitSignin = () => ({
  type: SUBMIT_SIGNIN,
});

export const submitLogin = () => ({
  type: SUBMIT_LOGIN,
});
export const submitComment = () => ({
  type: SUBMIT_COMMENT,
});
