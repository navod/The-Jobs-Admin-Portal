import { hours, minutes } from "@/data/times-data";
import { Switch, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

const AvailableTimeSlots = ({ title, data, getTimeSlots }) => {
  const [status, setStatus] = useState(data?.status);

  const [startTimeMin, setStartTimeMin] = useState(
    data?.startTime == null ? "00" : data?.startTime?.split(":")[1]
  );

  const [endTimeHour, setEndTimeHour] = useState(
    data?.endTime == null ? "00" : data?.endTime?.split(":")[0]
  );

  const [endTimeMin, setEndTimeMin] = useState(
    data?.endTime == null ? "00" : data?.endTime?.split(":")[1]
  );

  const [startTimeHour, setStartTimeHour] = useState(
    data?.startTime == null ? "00" : data?.startTime?.split(":")[0]
  );

  const [startTime, setStartTime] = useState(
    new Date(`2023-01-01 ${data?.startTime}`)
  );
  const [endTime, setEndTime] = useState(
    new Date(new Date(`2023-01-01 ${data?.endTime}`))
  );

  const handleChangeSwitch = (value) => {
    setStatus(value);

    if (value === false) {
      setStartTimeHour("00");
      setStartTimeMin("00");
      setEndTimeMin("00");
      setEndTimeHour("00");
    }
  };

  const onHandleTime = (value, timeSlotValue) => {
    switch (timeSlotValue) {
      case "startHour":
        setStartTimeHour(value);
        getTimeSlots({
          ...data,
          startTime: `${value}:${startTimeMin}`,
          endTime: `${endTimeHour}:${endTimeMin}`,
          status: status,
        });

        setStartTime(new Date(`2023-01-01 ${value}:${startTimeMin}`));
        break;

      case "startMin":
        setStartTimeMin(value);
        getTimeSlots({
          ...data,
          startTime: `${startTimeHour}:${value}`,
          endTime: `${endTimeHour}:${endTimeMin}`,
          status: status,
        });
        setStartTime(new Date(`2023-01-01 ${startTimeHour}:${value}`));
        break;

      case "endHour":
        setEndTimeHour(value);
        getTimeSlots({
          ...data,
          startTime: `${startTimeHour}:${startTimeMin}`,
          endTime: `${value}:${endTimeMin}`,
          status: status,
        });

        setEndTime(new Date(`2023-01-01 ${value}:${endTimeMin}`));
        break;

      case "endMin":
        setEndTimeMin(value);
        getTimeSlots({
          ...data,
          startTime: `${startTimeHour}:${startTimeMin}`,
          endTime: `${endTimeHour}:${value}`,
          status: status,
        });

        setEndTime(new Date(`2023-01-01 ${endTimeHour}:${value}`));
        break;
    }
  };
  return (
    <div className="flex flex-row items-center justify-around">
      <ToastContainer />
      <Switch
        id={data.day}
        ripple={false}
        className="h-full w-full checked:bg-[#2ec946]"
        containerProps={{
          className: "w-11 h-6",
        }}
        circleProps={{
          className: "before:hidden left-0.5 border-none",
        }}
        checked={status}
        onChange={(e) => handleChangeSwitch(e.target.checked)}
      />
      <p className="text-xs font-bold uppercase tracking-wide text-gray-700">
        {title}
      </p>
      <div className="flex flex-row">
        <div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <div class="relative w-20">
            <select
              class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              onChange={(e) => onHandleTime(e.target.value, "startHour")}
              disabled={!status}
            >
              <option className="font-semibold">{startTimeHour}</option>
              {hours.map((props, index) => {
                if (props !== startTimeHour) {
                  return <option key={index}>{props}</option>;
                }
                return null; // Exclude Australia from the options
              })}
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
          </div>
        </div>
      </div>
      <div>:</div>
      <div className="flex flex-row">
        <div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <div class="relative w-20">
            <select
              class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              onChange={(e) => onHandleTime(e.target.value, "startMin")}
              disabled={!status}
            >
              <option className="font-semibold">{startTimeMin}</option>
              {minutes.map((props) => {
                if (props !== startTimeMin) {
                  return <option key={props}>{props}</option>;
                }
                return null; // Exclude Australia from the options
              })}
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
          </div>
        </div>
      </div>
      <Typography variant="h6">to</Typography>

      <div className="flex flex-row">
        <div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <div class="relative w-20">
            <select
              class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              onChange={(e) => onHandleTime(e.target.value, "endHour")}
              disabled={!status}
            >
              <option className="font-semibold">{endTimeHour}</option>
              {hours.map((props) => {
                if (props !== endTimeHour) {
                  return <option key={props}>{props}</option>;
                }
                return null; // Exclude Australia from the options
              })}
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
          </div>
        </div>
      </div>
      <div>:</div>
      <div className="flex flex-row">
        <div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <div class="relative w-20">
            <select
              class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              onChange={(e) => onHandleTime(e.target.value, "endMin")}
              disabled={!status}
            >
              <option className="font-semibold">{endTimeMin}</option>
              {minutes.map((props) => {
                if (props !== endTimeMin) {
                  return <option key={props}>{props}</option>;
                }
                return null; // Exclude Australia from the options
              })}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableTimeSlots;
