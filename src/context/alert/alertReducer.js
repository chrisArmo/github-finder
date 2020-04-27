import { SET_ALERT, REMOVE_ALERT } from './alertActions';

const alertReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_ALERT:
      const { cls, msg } = payload;

      return { ...state, cls, msg, show: true };

    case REMOVE_ALERT:
      return { ...state, msg: '', show: false };

    default:
      return state;
  }
};

export default alertReducer;
