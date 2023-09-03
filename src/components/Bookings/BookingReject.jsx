import bookingService from "@/services/booking-service";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Textarea,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { toast } from "../Utility/utility";
import { ClipLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";

const BookingReject = ({ size, consultantId, bookingId, getAll }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const todayDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const onReject = () => {
    if (message == "") {
      toast("Please add reject reason", "error");
    } else {
      const obj = {
        rejectReason: message,
        id: bookingId,
      };

      bookingService
        .rejectBooking(obj)
        .then((res) => {
          setLoading(false);
          getAll();
          handleOpen();
          toast("Booking reject successfully", "success");
        })
        .finally(() => setLoading(false))
        .catch(() => {
          setLoading(false);
          toast("Booking cannot reject", "error");
        });
    }
  };

  return (
    <>
      <>
        <Button
          className="flex flex-row"
          color="red"
          size={size ? size : "sm"}
          onClick={handleOpen}
          disabled={localStorage.getItem("role") == "MANAGER"}
        >
          <div className="flex flex-row items-center gap-3">
            <i class="fa-solid fa-trash"></i>
            <p className="">Reject</p>
          </div>
        </Button>
        <Dialog open={open} size="xs">
          <ToastContainer />
          <DialogHeader>Booking Reject</DialogHeader>
          <DialogBody divider>
            <div className="my-2 flex w-full flex-col">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                label="Message *"
              />
            </div>
          </DialogBody>
          <DialogFooter>
            {loading ? (
              <ClipLoader size={30} color="green" />
            ) : (
              <>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpen}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={onReject}>
                  <span>Confirm</span>
                </Button>
              </>
            )}
          </DialogFooter>
        </Dialog>
      </>
    </>
  );
};

export default BookingReject;
