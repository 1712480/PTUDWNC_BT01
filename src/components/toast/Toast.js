import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    newestOnTop: true
}

toast.configure();

export const notify = {
    success: (message) => toast.success(message, options),
    warning: (message) => toast.warning(message, options)
}