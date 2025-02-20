import * as React from "react";

function Header(props) {

  return (
    <form>
      <header className="header">
        <p>{props?.title}</p>
      </header>
      <style jsx>{`
        .header {
          position: relative;
          margin-top: 20px;
          height: auto;
          font-size: 96px;
          text-align: center;
        }
      `}</style>
    </form>
  );
};

export default Header;