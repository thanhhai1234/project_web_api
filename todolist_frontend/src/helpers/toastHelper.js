import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';

export const toastSuccess = () => toast.success('Thành công', { autoClose: 2000, pauseOnHover: false });

export const toastError = () => toast.error("API lỗi", { autoClose: 2000, pauseOnHover: false });
