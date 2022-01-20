import React from 'react';
import { useAppDispatch } from '../hooks';
import { useNavigate } from "react-router-dom";
import { login } from '../reducers/userSlice';
// components
import { Footer } from '../components/layouts/Footer';
import { Header } from '../components/layouts/Header';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState('');

  const dispatch = useAppDispatch();

  const handleLogin = () => {
    if (currentUser) {
      dispatch(login(String(currentUser)))
      navigate("../", { replace: true });
    }
  }

  return (
    <main>
      <div className="container py-4">
        <Header currentUser={''} isLogged={false}/>
        <div className="form-signin">
          <form>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
              <input type="text" className="form-control mb-2" id="floatingInput" placeholder="Author" onChange={(e) => setCurrentUser(e.target.value)}/>
              <label htmlFor="floatingInput">Username</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control mb-2" id="floatingPassword" placeholder="Password"/>
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button
              className="w-100 btn btn-lg btn-primary"
              onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }
              }
            >
              Sign in
            </button>
          </form>
        </div>
         <Footer/>
       </div>
    </main>
  );
}