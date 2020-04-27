import React, { useReducer } from 'react';

import AlertContext from './AlertContext';
import alertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from './alertActions';

const AlertState = (props) => {
  const initialState = { cls: 'light', msg: '', show: false },
    [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg, cls = 'light') => {
    dispatch({ type: SET_ALERT, payload: { msg, cls } });

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
  };

  return (
    <AlertContext.Provider
      value={{
        cls: state.cls,
        msg: state.msg,
        show: state.show,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
