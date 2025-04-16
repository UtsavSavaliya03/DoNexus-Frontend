import Login from '../pages/auth/Login.jsx';
import Signup from '../pages/auth/Signup.jsx';
import ForgotPassword from '../pages/auth/ForgotPassword.jsx';
import ChangePassword from '../pages/auth/ChangePassword.jsx';
import Dashboard from '../pages/dashboard/Dashboard.jsx';
import ToDo from '../pages/todo/ToDo.jsx';

export const initialRoutes = () => {
    const routes = [
        // ============ Auth ===============
        { path: "/", type: "auth", component: Login, title: 'Login' },
        { path: "/signup", type: "auth", component: Signup, title: 'Signup' },
        { path: "/forgot_password", type: "auth", component: ForgotPassword, title: 'Forgot Password' },
        { path: "/change_password", type: "auth", component: ChangePassword, title: 'Change Password' },

        // ============ Private ==============
        { path: '/dashboard', type: 'private', component: Dashboard, title: 'Dashboard' },
        { path: '/todo', type: 'private', component: ToDo, title: 'To Do' },
    ]
    return routes;
}