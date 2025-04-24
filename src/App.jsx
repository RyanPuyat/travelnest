import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { CitiesContextProvider } from './context/CitiesContext';
import { AuthContextProvider } from './context/FakeAuthContext';
import Homepage from './pages/Homepage';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './component/CityList';
import CountryList from './component/CountryList';
import City from './component/City';
import Form from './component/Form';
import ProtectedRoutes from './pages/ProtectedRoutes';

function App() {
  return (
    <CitiesContextProvider>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="product" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route
                index
                element={<Navigate replace to="cities" />}
                // index
                // element={<CityList cities={cities} isLoading={isLoading} />}
              />
              <Route path="cities" element={<CityList />} />

              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContextProvider>
    </CitiesContextProvider>
  );
}

export default App;
