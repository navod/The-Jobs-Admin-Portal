import { jobs } from "@/data/jobs-data";
import React from "react";
import AddNewClientImg from "../../../public/img/add-new-construct.png";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useCountries } from "use-react-countries";
import { countriesData } from "@/data/countries-data";
import AvailableTimeSlots from "../AddNewConsultant/AvailableTimeSlots";

const UpdateTime = () => {
  const { countries } = useCountries();
  const [country, setCountry] = React.useState(0);
  const { name, flags, countryCallingCode } = countries[country];

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        onClick={handleOpen}
        className="flex flex-row"
        color="yellow"
        size="sm"
      >
        <div className="flex flex-row items-center gap-3">
          <i class="fa-regular fa-clock"></i>
          <p className="">View Time</p>
        </div>
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="sm"
      >
        <DialogHeader className="justify-between">
          <Typography variant="h5" color="blue-gray">
            Time Slot Details
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
        <DialogBody divider className=" flex flex-col gap-4 overflow-auto">
          <AvailableTimeSlots title="Sun" />
          <AvailableTimeSlots title="Mon" />
          <AvailableTimeSlots title="Tue" />
          <AvailableTimeSlots title="Wed" />
          <AvailableTimeSlots title="Thu" />
          <AvailableTimeSlots title="Fri" />
          <AvailableTimeSlots title="Sat" />
        </DialogBody>

        <DialogFooter>
          <Button
            variant="gradient"
            className="w-full"
            color="green"
            onClick={handleOpen}
          >
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default UpdateTime;
