import './App.scss';
import ProtectedRoute from "./routes/ProtectedRoute";
import { initialRoutes } from "./routes/routes.js";

const generateRoutes = (routes) => {
  return routes.map(({ type, component: Component, ...rest }) => {
    return {
      element: (
        <ProtectedRoute type={type} {...rest} >
          <Component />
        </ProtectedRoute>
      ),
      ...rest,
    };
  });
};

const AppWrapper = generateRoutes(initialRoutes());
export default AppWrapper;