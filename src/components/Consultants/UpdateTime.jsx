import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import AvailableTimeSlots from "../AddNewConsultant/AvailableTimeSlots";
import { toast } from "react-toastify";
import LoadingSpinner from "../Utility/CustomSpinner/CustomSpinner";
import consultantService from "@/services/consultant-service";

const UpdateTime = ({ data, timeslots, getAll }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const [id, setId] = useState(0);

  const [selectData, setSelectData] = useState(null);

  const [loading, setLoading] = useState(false);

  const invalidIds = [];

  const [updatedValue, setUpdatedValue] = useState({});
  const updateTimeValues = async (values) => {
    const slotIndex = timeslots.findIndex((slot) => slot.id === values.id);

    if (slotIndex !== -1) {
      timeslots[slotIndex] = values;
    }

    const modifiedAvailabilities = timeslots.map((availability) => {
      const { consultant, timeSlots, ...rest } = availability;
      return rest;
    });

    const newConsultantObj = {
      ...data,
      timeSlots: modifiedAvailabilities,
    };
    setUpdatedValue(newConsultantObj);
  };

  const updateValue = async () => {
    setLoading(true);
    const response = await consultantService
      .update(updatedValue)
      .then((res) => {
        toast("Consultant time updated successfully", "success");
      })
      .finally(() => {
        getAll();
        setLoading(false);
      });
  };

  const checkValidations = (data) => {
    if (selectData) {
      const startDate = new Date(`2023-01-01 ${selectData.startTime}`);
      const endDate = new Date(`2023-01-01 ${selectData.endTime}`);

      const startDate1 = new Date(`2023-01-01 ${data.startTime}`);
      const endDate2 = new Date(`2023-01-01 ${data.endTime}`);

      if (startDate.getTime() < endDate.getTime()) {
        return false;
      } else {
        const val = selectData.id;
        invalidIds.push({ ...selectData, val });
        return true;
      }
    } else {
      return false;
    }
  };

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
          {timeslots.map((data) => (
            <>
              <AvailableTimeSlots
                title={data.day.substring(0, 3)}
                data={data}
                getTimeSlots={updateTimeValues}
              />
            </>
          ))}
        </DialogBody>

        <DialogFooter>
          {loading ? (
            <div>
              <LoadingSpinner />
            </div>
          ) : (
            <Button
              variant="gradient"
              className="w-full"
              color="yellow"
              onClick={updateValue}
              disabled={
                Object.keys(updatedValue).length === 0 &&
                localStorage.getItem("role") == "MANAGER"
                  ? true
                  : false
              }
            >
              <span>Update</span>
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default UpdateTime;
