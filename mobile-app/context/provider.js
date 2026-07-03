import React from "react";
import GharbetiContext from "./context";
import useStateandActions from "./useStateandActions";

const GharbetiProvider = ({ children }) => {
  return (
    <GharbetiContext.Provider value={useStateandActions()}>
      {children}
    </GharbetiContext.Provider>
  );
};

export default GharbetiProvider;
