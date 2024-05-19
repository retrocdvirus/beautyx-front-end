import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const RemoveTrailingSlash = () => {
  const location = useLocation();

  // If the last character of the url is '/'
  if (location.pathname.match("/.*/$")) {
    return (
      <Navigate
        replace
        to={{
          pathname: location.pathname.replace(/\/+$/, ""),
          search: location.search,
        }}
      />
    );
  } else return null;
};

export default RemoveTrailingSlash;
