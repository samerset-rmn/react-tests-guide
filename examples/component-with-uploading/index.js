/* eslint-disable no-console */
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
// Config
import { BASE_URL } from './config';
// Reducer
import { actionTypes, initialState, reducer } from './reducer';

/**
 * Функция для загрузки элементов списка.
 */
const loadUsers = async (page) => {
  return fetch(`${BASE_URL}/users?page=${page}`, {
    method: 'GET',
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.error(err);
    });
};

/**
 * Компонент со списком элементов.
 * По нажатию на кнопку "Показать ещё" подгружаются следующие элементы из API.
 */
function UserList({ listItems }) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    (defaultState) => {
      return {
        ...defaultState,
        items: listItems,
      };
    }
  );

  // Функция-обработчик подзагрузки списка
  const loadMoreUsers = async () => {
    dispatch({ type: actionTypes.LOAD_MORE });

    const { data: items } = await loadUsers(state.page);

    dispatch({ type: actionTypes.LOAD_MORE_SUCCESS, items });
  };

  return (
    <div>
      <ul aria-label="Пользователи">
        {state.items.map((item) => (
          <li key={item.id}>{`${item.first_name} ${item.last_name}`}</li>
        ))}
      </ul>
      <button
        type="button"
        onClick={loadMoreUsers}
        disabled={state.isNextLoading}
      >
        Показать ещё
      </button>
    </div>
  );
}

UserList.propTypes = {
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default UserList;
