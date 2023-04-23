import logo from './logo.svg';
import './App.css';
import { Home } from './Components/Home';
import { SignIn } from './Components/SignIn';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import appContext from './Context/AppContext';
function App() {
  
  const { currentUser,setcurrentUser } = useContext(appContext)
  
  const ProtectedRoute = ({ children }) => {
    if (!currentUser ||  currentUser=='false') {
      return <Navigate to="/login" />
    }

    return children
  }
  return (

    <div className="App ">
      <Routes>
        <Route path="/">
          <Route index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
        </Route>
        <Route path="login" element={<SignIn />}></Route>
      </Routes>
      

    </div>
  );
}

export default App;
