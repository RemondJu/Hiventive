import React from 'react';
import './SideBarDefault.scss';


const SideBarDefault = (props) => {
  const { children } = props;
  return (
    <div className="SideBarDefault">
      {children}
    </div>
  );
};

export default SideBarDefault;
