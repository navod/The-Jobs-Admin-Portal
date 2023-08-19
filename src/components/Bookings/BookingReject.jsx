import { hours, minutes } from "@/data/times-data";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";

const BookingReject = ({ size }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const todayDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <>
        <Button
          className="flex flex-row"
          color="red"
          size={size ? size : "sm"}
          onClick={handleOpen}
        >
          <div className="flex flex-row items-center gap-3">
            <i class="fa-solid fa-trash"></i>
            <p className="">Reject</p>
          </div>
        </Button>
        <Dialog open={open} size="xs">
          <DialogHeader>Booking Reject</DialogHeader>
          <DialogBody divider>
            <div className="my-2 flex w-full flex-col">
              <Textarea label="Message *" />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    </>
  );
};

export default BookingReject;
