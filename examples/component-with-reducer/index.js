import React, { useReducer } from 'react';
// Reducer
import { actionTypes, initialState, reducer } from './reducer';

/**
 * Компонент с состоянием под управлением редьюсера.
 * Меняет состояние "Подтверждено" при клике на кнопку.
 */
function ConfirmationBlock() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onClickHandler = () => {
    dispatch({ type: actionTypes.SUCCESS });
  };

  return (
    <div>
      <div>
        {state.isConfirmed ? <p>Готово!</p> : <p>Ожидание подтверждения...</p>}
      </div>
      <button type='button' onClick={onClickHandler}>
        Подтвердить
      </button>
    </div>
  );
}

export default ConfirmationBlock;
