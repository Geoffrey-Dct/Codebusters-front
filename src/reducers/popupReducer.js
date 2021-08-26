import { TOGGLE_DISPLAY_POPUP_SIGNIN, TOGGLE_DISPLAY_POPUP_LOGIN } from 'src/actions/buttonLog';
import {
  DISPLAY_ERRORMESSAGE,
  CLOSED_ERRORMESSAGE,
  TOGGLE_DISPLAY_POPUP_COMMENT,
  SUBMIT_COMMENT,
} from 'src/actions/popup';
import { CHANGE_FIELD, CLEAR_INPUT } from 'src/actions/auth';

const initialState = {
  displayLogin: false,
  displaySignin: false,
  displayComment: false,
  displayErrorMessage: false,
  errorContent: '',
  comment: '',
  rating: '',
};

const popupReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_DISPLAY_POPUP_SIGNIN:
      return {
        ...state,
        displaySignin: !state.displaySignin,
      };
    case TOGGLE_DISPLAY_POPUP_LOGIN:
      return {
        ...state,
        displayLogin: !state.displayLogin,
      };
    case TOGGLE_DISPLAY_POPUP_COMMENT:
      return {
        ...state,
        displayComment: !state.displayComment,
      };
    case DISPLAY_ERRORMESSAGE:
      return {
        ...state,
        displayErrorMessage: true,
        errorContent: action.content,
      };
    case CLOSED_ERRORMESSAGE:
      return {
        ...state,
        displayErrorMessage: false,
      };
    case CHANGE_FIELD:
      return {
        ...state,
        [action.name]: action.newValue,
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        comment: '',
        rating: '',
      };
    case CLEAR_INPUT:
      return {
        ...state,
        comment: '',
      };
    default:
      return state;
  }
};

export default popupReducer;
