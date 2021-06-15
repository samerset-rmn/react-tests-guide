const actionTypes = {
  LOAD_MORE: 'LOAD_MORE',
  LOAD_MORE_SUCCESS: 'LOAD_MORE_SUCCESS',
};

const initialState = {
  isNextLoading: false,
  page: 2,
  items: [],
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.LOAD_MORE:
      return {
        ...state,
        isNextLoading: true,
      };
    case actionTypes.LOAD_MORE_SUCCESS:
      return {
        ...state,
        isNextLoading: false,
        items: [...state.items, ...action.items],
        page: state.page + 1,
      };
    default:
      throw new Error('Не поддерживаемый тип action');
  }
}

export { actionTypes, initialState, reducer };
