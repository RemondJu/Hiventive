import React from 'react';
import './SideBarDefault.scss';


const SideBarDefault = (props) => {
  const { children, title } = props;
  return (
    <div className="SideBarDefault">
      <h2>{title}</h2>
      <div className="body_sidebar">
        {children}
      </div>
    </div>
  );
};

export default SideBarDefault;
