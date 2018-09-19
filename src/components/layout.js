import React from 'react'

const Layout = (props) => {
  return (
    <div className="normal">
      <div className="header">
        <div className="inner">
          
          <span className="github">
            Built with <a rel="noopener noreferrer" href="https://github.com/umijs/umi" target="_blank">Umi</a> and <a rel="noopener noreferrer" href="https://github.com/dvajs/dva" target="_blank">Dva</a>
          </span>
        </div>
      </div>
      <div className="view">
        { props.children }
      </div>
    </div>
  );
};

export default Layout;