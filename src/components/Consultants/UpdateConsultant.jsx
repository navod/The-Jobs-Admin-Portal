import { jobs } from "@/data/jobs-data";
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
import { countriesData } from "@/data/countries-data";
import LoadingSpinner from "../Utility/CustomSpinner/CustomSpinner";
import consultantService from "@/services/consultant-service";
import { toast } from "../Utility/utility";

const UpdateConsultant = ({ data, timeslots, getAll }) => {
  const [open, setOpen] = React.useState(false);
  const [inputs, setInputs] = useState({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    mobile: data.mobile,
    nic: data.nic,
    preCountry: data.country,
    jobType: data.jobType,
  });

  const [errors, setErrors] = useState({
    email: false,
    firstName: false,
    lastName: false,
    mobile: false,
    nic: false,
    preCountry: false,
    jobType: false,
  });

  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpen = () => setOpen(!open);

  const updateConsultant = async () => {
    setLoading(true);

    const modifiedAvailabilities = timeslots.map((availability) => {
      const { consultant, timeSlots, ...rest } = availability;
      return rest;
    });
    const newConsultantObj = {
      ...data,
      ...inputs,
      timeSlots: modifiedAvailabilities,
    };

    const response = await consultantService
      .update(newConsultantObj)
      .finally(() => {
        getAll();
        setLoading(false);
        toast("Consultant updated successfully", "success");
      });
  };

  const deleteConsultant = async () => {
    const response = await consultantService
      .update({ id: data.id })
      .finally(() => {
        getAll();
        toast("Consultant deleted successfully", "success");
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
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="sm"
      >
        <DialogHeader className="justify-between">
          <Typography variant="h5" color="blue-gray">
            Consultant Details
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
        <DialogBody
          divider
          className="flex max-h-96 flex-row justify-center overflow-auto"
        >
          {false ? (
            <LoadingSpinner />
          ) : (
            <div className="mb-8 flex flex-col gap-12 ">
              <form class="mb-4 w-full max-w-lg ">
                <div class="-mx-3 mb-6 flex flex-wrap">
                  <div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                    <label
                      class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      for="grid-first-name"
                    >
                      First Name
                    </label>
                    <input
                      class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                      id="grid-first-name"
                      type="text"
                      placeholder="Jane"
                      value={inputs.firstName}
                      name="firstName"
                      onChange={changeHandler}
                    />
                    {errors.firstName && (
                      <p class="text-xs italic text-red-500">
                        Please fill first name field.
                      </p>
                    )}
                  </div>
                  <div class="w-full px-3 md:w-1/2">
                    <label
                      class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      for="grid-last-name"
                    >
                      Last Name
                    </label>
                    <input
                      class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-last-name"
                      type="text"
                      placeholder="Doe"
                      value={inputs.lastName}
                      name="lastName"
                      onChange={changeHandler}
                    />
                  </div>
                </div>
                <div class="-mx-3 mb-6 flex flex-wrap">
                  <div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                    <label
                      class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      for="grid-first-name"
                    >
                      Email
                    </label>
                    <input
                      class="mb-3 block w-full appearance-none rounded border bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                      id="grid-first-name"
                      type="text"
                      placeholder="example@gmail.com"
                      value={inputs.email}
                      name="email"
                      onChange={changeHandler}
                    />
                    {errors.email && (
                      <p class="text-xs italic text-red-500">
                        Email Field Cannot be empty
                      </p>
                    )}
                  </div>
                  <div class="w-full px-3 md:w-1/2">
                    <label
                      class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      for="grid-last-name"
                    >
                      NIC
                    </label>
                    <input
                      class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-last-name"
                      type="text"
                      placeholder="131321321322"
                      value={inputs.nic}
                      name="nic"
                      onChange={changeHandler}
                    />
                    {errors.nic && (
                      <p class="text-xs italic text-red-500">
                        NIC Field Cannot be empty
                      </p>
                    )}
                  </div>
                </div>

                <div class="-mx-3 mb-6 flex flex-wrap">
                  <div class="w-full px-3">
                    <label
                      class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      for="grid-password"
                    >
                      Mobile
                    </label>
                    <input
                      class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                      id="grid-password"
                      type="tel"
                      placeholder="01231231223"
                      maxLength={10}
                      value={inputs.mobile}
                      name="mobile"
                      onChange={changeHandler}
                    />
                    {errors.email && (
                      <p class="text-xs italic text-red-500">
                        Email Field Cannot be empty
                      </p>
                    )}
                  </div>
                </div>

                <div class="-mx-3 mb-2 flex flex-wrap">
                  <div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                    <label
                      class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      for="grid-state"
                    >
                      Country
                    </label>
                    <div class="relative">
                      <select
                        class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                        id="grid-state"
                        value={inputs.preCountry}
                        onChange={changeHandler}
                      >
                        <option className="font-semibold">
                          {inputs.preCountry}
                        </option>
                        {countriesData.map((props) => {
                          if (props.name !== inputs.preCountry) {
                            return (
                              <option key={props.code}>{props.name}</option>
                            );
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

                  <div class="w-full px-3 pb-4 md:mb-0 md:w-1/2">
                    <label
                      class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                      for="grid-state"
                    >
                      job Type
                    </label>
                    <div class="relative">
                      <select
                        class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                        id="grid-state"
                      >
                        <option className="font-semibold">
                          {inputs.jobType}
                        </option>
                        {jobs.map((props) => {
                          if (props !== inputs.jobType) {
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
              </form>
            </div>
          )}
        </DialogBody>

        <DialogFooter>
          <Button
            variant="gradient"
            color="red"
            onClick={deleteConsultant}
            className="mr-1"
            disabled={localStorage.getItem("role") == "MANAGER"}
          >
            <span>Delete</span>
          </Button>
          <Button
            variant="gradient"
            disabled={localStorage.getItem("role") == "MANAGER"}
            color="yellow"
            onClick={updateConsultant}
          >
            <span>Update</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default UpdateConsultant;
