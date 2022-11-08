import _ from "lodash";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { getUser } from "../Demo/demoSlice";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let location = useLocation();
    const user = useAppSelector(getUser);

    console.log("enter pub auth");
    console.log("user", user);
    console.log("is empty user", _.isEmpty(user));
    const isAuth = !!user && !_.isEmpty(user);

    console.log("is auth value", isAuth);
  
    if (!!isAuth) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.

      if (!!user && user?.type === "student") {
        return <Navigate to="/dashboard" state={{ from: location }} replace />;
      }

      if (!!user && user?.type === "admin") {
        return <Navigate to="/admin/dashboard" state={{ from: location }} replace />;
      }

      return <Navigate to="/owner/dashboard" state={{ from: location }} replace />;
    }
  
    return children;
}

export default RequireAuth;