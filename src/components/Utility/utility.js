import { toast as notify } from "react-toastify";

export const ALERT_TYPE = {
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warn",
};

export const ALERT_COLOR = {
  error: "#ff3f34",
  success: "#05c46b",
  warn: "#ffd32a",
};

export const toast = (text, type) =>
  notify(text, {
    type,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    // className: css({
    //   background: '#00FF00 !important',
    //   color: 'white !important',
    //   fontWeight: 'bold',
    // }),
    icon: false,
    style: { backgroundColor: ALERT_COLOR[type], color: "white" },
  });
