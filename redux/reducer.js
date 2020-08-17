const initialState = {
  driverData: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DRIVER_DATA':
      return {
        ...state,
        driverData: action.payload
      }
    default:
      return state;
  }
}

export default reducer;