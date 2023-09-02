import bookingService from "@/services/booking-service";
import consultantService from "@/services/consultant-service";
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
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "../Utility/utility";
import { ToastContainer } from "react-toastify";

const BookingAccept = ({ size, consultantId, bookingId, getAll }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [availabileTimes, setAvailableTimes] = useState([]);

  const [selectDate, setSelectDate] = useState("");

  const [selectTime, setSelectTime] = useState("");

  const todayDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const onHandler = (value) => {
    setLoading(true);
    const obj = {
      id: consultantId,
      date: value,
    };
    consultantService
      .getAvailableTimeSlot(obj)
      .then((res) => {
        if (res.data.length !== 0) {
          setSelectDate(value);
          setAvailableTimes(res.data);
          setSelectTime(res.data[0]);
        } else {
          setSelectDate("");
          setSelectTime("");
          setAvailableTimes([]);
          toast("You are no available on this date", "error");
        }
      })
      .finally(() => setLoading(false))
      .catch(() => {
        setSelectDate("");
        setSelectTime("");
        setAvailableTimes([]);
        toast("You are no available on this date", "error");
      });
  };

  const [acceptBookingLoading, setAcceptBookingLoading] = useState(false);

  const onAccept = () => {
    if (selectDate == "" && selectTime == "") {
      toast("Please select date and time", "error");
    } else {
      setAcceptBookingLoading(true);
      const obj = {
        specialNote: message,
        date: selectDate,
        time: selectTime,
        id: bookingId,
      };

      bookingService
        .acceptBooking(obj)
        .then((res) => {
          getAll();
          setAcceptBookingLoading(false);
          handleOpen();

          toast("Booking accepted successfully", "success");
        })
        .catch(() => {
          setAcceptBookingLoading(false);
          toast("Booking cannot add..! Please re-check", "error");
        });
    }
  };
  return (
    <>
      <Button
        className="flex flex-row"
        color="green"
        size={size ? size : "sm"}
        onClick={handleOpen}
        disabled={localStorage.getItem("role") == "MANAGER"}
      >
        <div className="flex flex-row items-center gap-3">
          <i class="fa-solid fa-check"></i>
          <p className="">Accept</p>
        </div>
      </Button>

      <Dialog open={open} size="xs">
        <ToastContainer />
        <DialogHeader>Booking Accept</DialogHeader>
        <DialogBody divider>
          <div className="flex w-full flex-col gap-5">
            <div className="flex flex-row items-center justify-between gap-5">
              <div>
                <Typography
                  variant="h6"
                  className="cursor-pointer  text-xs italic text-blue-600 underline"
                >
                  <i class="fa-regular fa-clock"></i>
                  Suggest Time
                </Typography>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div class="relative h-10 w-full min-w-[200px]">
                <input
                  class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  type="date"
                  min={todayDate()}
                  onChange={(e) => {
                    onHandler(e.target.value);
                  }}
                  value={selectDate}
                />
                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Available Time*
                </label>
              </div>

              <div className="flex flex-row">
                <div className="flex flex-row">
                  <div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                    <div class="relative w-28">
                      {loading ? (
                        <ClipLoader
                          color={"green"}
                          loading={loading}
                          size={20}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      ) : (
                        <>
                          <select
                            class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                            id="grid-state"
                            onChange={(e) => setSelectTime(e.target.value)}
                          >
                            {availabileTimes.map((props) => (
                              <option>{props}</option>
                            ))}
                          </select>
                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              class="h-4 w-4 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Textarea
              label="Message (Optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          {acceptBookingLoading ? (
            <ClipLoader size={35} color="green" />
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
              <Button variant="gradient" color="green" onClick={onAccept}>
                <span>Confirm</span>
              </Button>
            </>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default BookingAccept;
