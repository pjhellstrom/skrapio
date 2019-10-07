import React, { Fragment } from "react";
const Navbar = () => {
  return (
    <Fragment>
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              <a class='button'>
                <span class='icon'>
                  <i class='fab fa-github'></i>
                </span>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
