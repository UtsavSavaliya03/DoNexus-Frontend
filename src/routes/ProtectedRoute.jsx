import { useSelector } from 'react-redux';
import AppLayout from '../components/global/layout/Layout.jsx';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ type, children, title }) => {

    const { loggedIn } = useSelector(state => state.user);

    if (type === 'private') {
        if (loggedIn) {
            return <AppLayout title={title} >{children}</AppLayout>
        } else {
            return <Navigate to='/' replace />
        }
    }
    if (type === 'public') {
        return children;
    }
    if (type === 'auth') {
        if (!loggedIn) {
            return children;
        } else {
            return <Navigate to='/dashboard' replace />;
        }
    }
    return;
}

export default ProtectedRoute;