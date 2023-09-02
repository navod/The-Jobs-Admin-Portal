import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import JobSeeker from "@/../public/img/job-seeker-detail.png";
import BookingAccept from "./BookingAccept";
import BookingReject from "./BookingReject";
import { ToastContainer } from "react-toastify";
import bookingService from "@/services/booking-service";
import { toast } from "../Utility/utility";

export function BookingDetails({
  consultantDetails,
  bookingDetails,
  jobSeekerDetails,
  getAll,
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const completBooking = () => {
    bookingService
      .completeBooking(bookingDetails.id)
      .then((res) => {
        getAll();
        toast("Booking completed successfully", "success");
        handleOpen();
      })
      .catch((e) => {
        toast("Booking cannot complete..! Please re-check", "error");
      });
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="flex flex-row"
        color="blue"
        size="sm"
      >
        <div className="flex flex-row items-center gap-3">
          <i class="fa-solid fa-eye"></i>
          <p className="">View</p>
        </div>
      </Button>
      <Dialog
        open={open}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="justify-between" handler={handleOpen}>
          <Typography variant="h5" color="blue-gray">
            Job Seeker Details
          </Typography>

          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody divider className="flex flex-row">
          <ToastContainer />
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                Name :
              </Typography>
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                {jobSeekerDetails.firstName + " " + jobSeekerDetails.lastName}
              </Typography>
            </div>

            <div className="flex flex-row items-center gap-4">
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                email :
              </Typography>
              <Typography className="text-sm font-normal text-blue-gray-500">
                {jobSeekerDetails.email}
              </Typography>
            </div>

            <div className="flex flex-row items-center gap-4">
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                phone :
              </Typography>
              <Typography className="text-sm font-normal text-blue-gray-500">
                {jobSeekerDetails.mobile}
              </Typography>
            </div>

            <div className="flex flex-row items-center gap-4">
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                age :
              </Typography>
              <Typography className="text-sm font-normal text-blue-gray-500">
                {jobSeekerDetails.age}
              </Typography>
            </div>

            <div className="flex flex-row items-center gap-4">
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                preffered destination :
              </Typography>
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                {jobSeekerDetails.preferDestination}
              </Typography>
            </div>

            <div className="flex flex-row items-center gap-4">
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                Preffered job type :
              </Typography>
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                {jobSeekerDetails.preferJobType}
              </Typography>
            </div>

            <div className="flex flex-col gap-2">
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                Description :
              </Typography>
              <p className="text-sm font-normal uppercase text-blue-gray-500">
                {jobSeekerDetails.description
                  ? jobSeekerDetails.description
                  : "no"}
              </p>
            </div>
            {localStorage.getItem("role") !== "CONSULTANT" && (
              <>
                <div className="flex flex-row items-center gap-4">
                  <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                    Cosultant ID :
                  </Typography>
                  <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                    {consultantDetails.id}
                  </Typography>
                </div>

                <div className="flex flex-row items-center gap-4">
                  <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                    Cosultant Name :
                  </Typography>
                  <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                    {consultantDetails.firstName +
                      " " +
                      consultantDetails.lastName}
                  </Typography>
                </div>
              </>
            )}

            {jobSeekerDetails.cv && (
              <Button
                onClick={handleOpen}
                className="flex w-max flex-row"
                color="blue-gray"
                size="sm"
              >
                <div className="flex flex-row items-center gap-3">
                  <i class="fa-solid fa-download"></i>
                  <p className="">Download CV</p>
                </div>
              </Button>
            )}
          </div>
          <img
            className="absolute right-20 h-52 w-52 object-contain opacity-50"
            src={JobSeeker}
          />
        </DialogBody>

        <DialogFooter className="flex flex-row gap-2">
          {bookingDetails.status == "APPROVED" && (
            <Button
              onClick={completBooking}
              className="flex flex-row"
              color="blue"
              size={"md"}
            >
              Complte
            </Button>
          )}
          {bookingDetails.status == "PENDING" && (
            <>
              <BookingReject
                size="md"
                consultantId={consultantDetails.id}
                bookingId={bookingDetails.id}
                getAll={getAll}
              />

              <BookingAccept
                size="md"
                consultantId={consultantDetails.id}
                bookingId={bookingDetails.id}
                getAll={getAll}
              />
            </>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
}
