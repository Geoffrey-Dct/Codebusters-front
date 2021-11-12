import axios from 'axios';
import {
  START_GAME,
  saveDataGame,
  setLoadingGame,
  END_GAME,
  SUBMIT_ANSWER,
  setWin,
  toggleDisplayDescription,
} from 'src/actions/game';
import { setLoading } from 'src/actions/loading';
import { clearInput, displayErrormessage } from 'src/actions/popup';
import { handleLogOut } from 'src/actions/auth';
import { toggleDisplayPopupLogin } from 'src/actions/buttonLog';

const gameMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case START_GAME: {
      store.dispatch(setLoading());
      const { id } = store.getState().auth;
      const token = sessionStorage.getItem('token').replace(/"/g, '');
      axios.post('http://3.238.70.10/api/game/create', { user: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          store.dispatch(saveDataGame(
            response.data.game.status,
            response.data.items,
            response.data.background,
            response.data.game.id,
          ));
          store.dispatch(setLoadingGame());
          store.dispatch(setLoading());
        })
        .catch((error) => {
          if (error.response.data.message === 'Expired JWT Token') {
            store.dispatch(handleLogOut());
            store.dispatch(displayErrormessage('veuillez vous reconnecter s\'il vous plaît'));
            store.dispatch(toggleDisplayPopupLogin());
          }
          store.dispatch(setLoading());
        })
        .then(() => {
          store.dispatch(setLoadingGame());
        });
      break;
    }
    case SUBMIT_ANSWER: {
      store.dispatch(setLoading());
      const { inputGameValue, id } = store.getState().game;
      axios.post(`http://3.238.70.10/api/game/answer/${id}`, { answer: inputGameValue },
        {
          headers: {
            Authorization: `Bearer ${store.getState().auth.token}`,
          },
        })
        .then((response) => {
          if (response.data.answer) {
            store.dispatch(setWin(true));
          }
          else {
            store.dispatch(toggleDisplayDescription());
          }
          store.dispatch(setLoading());
        })
        .catch(() => {
          store.dispatch(displayErrormessage('une erreur s\'est produite, veuillez réessayer'));
          store.dispatch(setLoading());
        });
      break;
    }
    case END_GAME: {
      store.dispatch(setLoading());
      const { id } = store.getState().game;
      axios.put(`http://3.238.70.10/api/game/update/${id}`, {},
        {
          headers: {
            Authorization: `Bearer ${store.getState().auth.token}`,
          },
        })
        .then(() => {
          store.dispatch(setLoading());
          store.dispatch(clearInput('inputGameValue', ''));
        })
        .catch(() => {
          store.dispatch(setLoading());
        });
      break;
    }
    default:
      next(action);
  }
};
  // on passe l'action au suivant (middleware suivant ou reducer)

export default gameMiddleware;
