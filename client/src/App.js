import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Admin from './pages/admin';
import Partner from './pages/partner';
import Shows from './pages/partner/ShowsList';
import Profile from './pages/user';
import SingleMovie from './pages/user/SingleMovie';
import ProtectedRoute from './component/ProtectedRoute';
import Test from './pages/test';
import store from './redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <div className="App">
      <Provider store={store}> 
        <BrowserRouter>
          <Routes>
            <Route path='/' element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>}>
            </Route>
            {/* <Route path='/' element={<Test/>}></Route> */}
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/admin' element={
              <ProtectedRoute>
                <Admin/>
              </ProtectedRoute>}>
            </Route>
            <Route path='/partner' element={
              <ProtectedRoute>
                <Partner/>
              </ProtectedRoute>}>
            </Route>
            <Route path='/api/shows/:theaterId' element={
              <ProtectedRoute>
                <Shows/>
              </ProtectedRoute>
            }>
            </Route>
            <Route path='/profile' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }>            
            </Route>
            <Route path='/movie/:id' element={
              <ProtectedRoute>
                <SingleMovie />
              </ProtectedRoute>
            }>

            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      
    </div>
  );
}

export default App;
