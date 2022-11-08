import _ from "lodash";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { getDemoUser } from "../Demo/demoSlice";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    let location = useLocation();
    // const user = useAppSelector(getUser);
    const user = useAppSelector(getDemoUser);

    console.log("t4", user);

    const isAuth = !!user && !_.isEmpty(user);

    console.log("t5", isAuth);
  
    if (!isAuth) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }
  
    return children;
}

export default RequireAuth;