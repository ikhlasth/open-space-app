import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD'
};

function setIsPreloadActionCretator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload
    }
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (err) {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCretator(false));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setIsPreloadActionCretator,
  asyncPreloadProcess
};