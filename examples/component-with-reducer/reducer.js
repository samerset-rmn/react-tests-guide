const actionTypes = {
  SUCCESS: 'SUCCESS'
};

const initialState = {
  isConfirmed: false
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.SUCCESS:
      return {
        ...state,
        isConfirmed: true
      };
    default:
      throw new Error('Не поддерживаемый тип action');
  }
}

export { actionTypes, initialState, reducer };
