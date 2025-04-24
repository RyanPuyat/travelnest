import { createContext, useContext, useEffect, useReducer } from 'react';
import CitiesReducer from './CitiesReducer';
import { ACTION } from './Action';

const CitiesContext = createContext();

function CitiesContextProvider({ children }) {
  const initialState = {
    cities: [],
    currentCity: {},
    isLoading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(CitiesReducer, initialState);

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: ACTION.REQUEST });
      try {
        const res = await fetch('/api/cities');

        if (!res.ok) {
          throw new Error('Failed to fetch cities');
        }

        const data = await res.json();
        dispatch({
          type: ACTION.GET_CITIES_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({ type: ACTION.ERROR, payload: error.message });
        alert('Error:', error.message);
      }
    }
    fetchCities();
  }, []);

  async function fetchCity(id) {
    if (Number(id) === state.currentCity.id) return;
    dispatch({ type: ACTION.REQUEST });
    try {
      const res = await fetch(`/api/cities/${id}`);

      if (!res.ok) {
        throw new Error('Failed to get current city');
      }

      const data = await res.json();

      dispatch({
        type: ACTION.GET_CURRENT_CITY_SUCCESS,
        payload: data,
      });
      // setCurrentCity(data);
    } catch (error) {
      dispatch({
        type: ACTION.ERROR,
        payload: error.message,
      });
      alert('Error:', error.message);
    }
  }

  const addNewCity = async (newCity) => {
    dispatch({ type: ACTION.REQUEST });
    try {
      const res = await fetch('/api/cities', {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to add new city');
      }

      const data = await res.json();
      dispatch({
        type: ACTION.ADD_NEW_CITY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: ACTION.ERROR, payload: error.message });
      alert('Error', error.message);
    }
  };

  const deleteCity = async (id) => {
    dispatch({ type: ACTION.REQUEST });
    try {
      if (window.confirm('Are you sure you want to delete this item?')) {
        await fetch(`/api/cities/${id}`, { method: 'DELETE' });

        dispatch({
          type: ACTION.DELETE_CITY_SUCCESS,
          payload: id,
        });
      }
    } catch (error) {
      dispatch({ type: ACTION.ERROR, payload: error.message });
      alert('Error:', error.message);
    }
  };

  const value = {
    cities: state.cities,
    currentCity: state.currentCity,
    isLoading: state.isLoading,
    dispatch,
    fetchCity,
    addNewCity,
    deleteCity,
  };

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext was used outside the CitiesProvider');
  return context;
}

export { CitiesContextProvider, useCities };
