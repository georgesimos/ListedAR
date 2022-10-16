import createDataContext from './createDataContext';

const INITIAL_STATE = {
  initialLocation: null,
  currentLocation: null,
  destination: null,
  destinationLatLong: null,
  directions: null,
};

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CURRENT_LOCATION':
      return {
        ...state,
        currentLocation: action.payload,
        initialLocation: state.initialLocation
          ? state.initialLocation
          : action.payload,
      };
    case 'ADD_DESTINATION':
      return { ...state, destination: action.payload };
    case 'ADD_DESTINATION_LAT_LONG':
      return { ...state, destinationLatLong: action.payload };
    case 'ADD_DIRECTIONS':
      return { ...state, directions: action.payload };

    case 'RESET':
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

const addCurrentLocation = dispatch => payload =>
  dispatch({ type: 'ADD_CURRENT_LOCATION', payload });

const addDestination = dispatch => payload =>
  dispatch({ type: 'ADD_DESTINATION', payload });

const addDestinationLatLong = dispatch => payload =>
  dispatch({ type: 'ADD_DESTINATION_LAT_LONG', payload });

const addDirections = dispatch => payload =>
  dispatch({ type: 'ADD_DIRECTIONS', payload });

const reset = dispatch => () => {
  dispatch({ type: 'RESET' });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  {
    addCurrentLocation,
    addDestination,
    addDestinationLatLong,
    addDirections,
    reset,
  },
  { INITIAL_STATE },
);
