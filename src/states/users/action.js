import api from '../../utils/api';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
const ActionType = {
  RECEIVE_USER: 'RECEIVE_USER'
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USER,
    payload: {
      users
    }
  };
}

function asyncRegisterUser({ id, name, password }) {
  return async () => {
    dispatch(showLoading());
    try {
      await api.register({ id, name, password });
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncRegisterUser
};