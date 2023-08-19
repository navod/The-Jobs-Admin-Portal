import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import JobSeeker from "@/../public/img/job-seeker-detail.png";
import BookingAccept from "./BookingAccept";
import BookingReject from "./BookingReject";

export function BookingDetails() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

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
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                Name :
              </Typography>
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                Navod Perera
              </Typography>
            </div>

            <div className="flex flex-row items-center gap-4">
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                email :
              </Typography>
              <Typography className="text-sm font-normal text-blue-gray-500">
                navod@gmail.com
              </Typography>
            </div>

            <div className="flex flex-row items-center gap-4">
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                phone :
              </Typography>
              <Typography className="text-sm font-normal text-blue-gray-500">
                0763933541
              </Typography>
            </div>

            <div className="flex flex-row items-center gap-4">
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                age :
              </Typography>
              <Typography className="text-sm font-normal text-blue-gray-500">
                23
              </Typography>
            </div>

            <div className="flex flex-row items-center gap-4">
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                preffered destination :
              </Typography>
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                Australia
              </Typography>
            </div>

            <div className="flex flex-row items-center gap-4">
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                Preffered job type :
              </Typography>
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                Software Engineer
              </Typography>
            </div>

            <div className="flex flex-col gap-2">
              <Typography className="text-sm font-normal uppercase text-blue-gray-500">
                Description :
              </Typography>
              <p className="text-sm font-normal uppercase text-blue-gray-500">
                The key to more success is to have a lot of pillows. Put it this
                way, it took me twenty five years to get these plants, twenty
                five years of blood sweat and tears, and I&apos;m never giving
                up, I&apos;m just getting started. I&apos;m up to something. Fan
                luv.
              </p>
            </div>
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
          </div>
          <img
            className="absolute right-40 h-52 w-52 object-contain"
            src={JobSeeker}
          />
        </DialogBody>

        <DialogFooter className="flex flex-row gap-2">
          <BookingReject size="md" />

          <BookingAccept size="md" />
        </DialogFooter>
      </Dialog>
    </>
  );
}
