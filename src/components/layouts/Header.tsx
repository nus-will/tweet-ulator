import * as React from 'react';
import { Link } from "react-router-dom";

type Props = {
  currentUser: string;
  isLogged: boolean;
};

export const Header: React.FC<Props> = props => {
  const { currentUser, isLogged } = props;

  return (
    <header className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
      { isLogged && (
        <Link
          className="d-flex align-items-center text-dark text-decoration-none"
          to={`/users/${currentUser}`}
        >
          <span className="fs-4">Welcome, {currentUser}!</span>
        </Link>
      )}

      { !isLogged && (
        <Link
          className="d-flex align-items-center text-dark text-decoration-none"
          to="/"
        >
          <span className="fs-4">Tweet-tulator</span>
        </Link>
      )}

      <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        { !isLogged && (
          <Link
            className="me-3 py-2 text-dark text-decoration-none"
            to="/login">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};