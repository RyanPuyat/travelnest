import { ACTION } from './Action';

function CitiesReducer(state, action) {
  switch (action.type) {
    //Loading state
    case ACTION.GET_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    //Get all the cities
    case ACTION.GET_CITIES_SUCCESS:
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    //Get current city
    case ACTION.GET_CURRENT_CITY_SUCCESS:
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };

    //Add new city
    case ACTION.ADD_NEW_CITY_SUCCESS:
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
      };

    //Delete  city
    case ACTION.DELETE_CITY_SUCCESS:
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
        currentCity: {},
      };

    //Failed state
    case ACTION.GET_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default CitiesReducer;
