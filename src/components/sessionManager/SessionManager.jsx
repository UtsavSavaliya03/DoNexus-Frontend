import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cleareCookies } from '../../services/Cookies.js';
import api from '../../api/index.js';
import { useDispatch } from 'react-redux';
import { setloggedIn } from "../../store/Slices/userSlice.js";
import toast from 'react-hot-toast';

let errorToastId = null;

const showErrorToast = (message) => {
    if (errorToastId) {
        return;
    }
    errorToastId = toast.error(message, {
        onClose: () => {
            // Reset the errorToastId when the toast is closed
            errorToastId = null;
        }
    });
};

export default function SessionManager() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    api.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (error.response.status === 401) {
                dispatch(setloggedIn(false));
                cleareCookies();
                showErrorToast('Your session has expired. Please login to pick up where you left off.');
                return navigate('/');
            }
            return Promise.reject(error);
        }
    );
}
