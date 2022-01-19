import React from 'react';
import { Link } from "react-router-dom";
// components
import { Footer } from '../components/layouts/Footer';
import { Header } from '../components/layouts/Header';

export const Login: React.FC = () => {
  const [currentUser, setCurrentUser] = React.useState('');

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
            <Link
              className="w-100 btn btn-lg btn-primary"
              to={`/users/${currentUser}`}
            >
              Sign in
            </Link>
          </form>
        </div>
         <Footer/>
       </div>
    </main>
  );
}