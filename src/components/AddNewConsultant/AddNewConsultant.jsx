import { countriesData } from "@/data/countries-data";
import { jobs } from "@/data/jobs-data";
import React, { useState } from "react";
import AddNewClientImg from "../../../public/img/add-new-construct.png";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useCountries } from "use-react-countries";
import AvailableTimeSlots from "./AvailableTimeSlots";
import { timeSlots } from "@/data/sampleTimeslots";
import consultantService from "@/services/consultant-service";
import { toast } from "../Utility/utility";

const AddNewConsultant = () => {
  const { countries } = useCountries();
  const [country, setCountry] = React.useState(
    countries.findIndex((country) => country.name === "Sri Lanka")
  );
  const { name, flags, countryCallingCode } = countries[country];

  const [slots, setSlots] = useState([]);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobile: "",
    nic: "",
    reTypePassword: "",
    country: countriesData[0].name,
    jobType: jobs[0],
  });

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    firstName: false,
    lastName: false,
    mobile: false,
    nic: false,
    country: false,
    reTypePassword: false,
    jobType: false,
  });

  const onTimeSlotHanlder = (values) => {
    const slotIndex = timeSlots.findIndex((slot) => slot.day === values.day);

    if (slotIndex !== -1) {
      timeSlots[slotIndex] = values;
      timeSlots[slotIndex].status = true;
    }

    setSlots(timeSlots);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (
      inputs.email.trim().length === 0 ||
      !inputs.email.trim().match(mailFormat)
    ) {
      setErrors({ ...errors, email: true });
      return;
    }

    if (inputs.password.length === 0) {
      setErrors({ ...errors, password: true });
      return;
    }
    if (inputs.firstName.length === 0) {
      setErrors({ ...errors, firstName: true });
      return;
    }

    if (inputs.nic.length === 0) {
      setErrors({ ...errors, nic: true });
      return;
    }

    if (inputs.mobile.length === 0) {
      setErrors({ ...errors, mobile: true });
      return;
    }

    if (inputs.password.trim() !== inputs.reTypePassword.trim()) {
      setErrors({ ...errors, reTypePassword: true });
      return;
    }
    console.log(slots);
    if (slots.length == 0) {
      toast("Please select available time slots", "error");
      return;
    }
    const newConsultantObj = {
      ...inputs,
      timeSlots: slots,
    };

    await consultantService
      .save({
        ...newConsultantObj,
        role: "CONSULTANT",
      })
      .then((resp) => {
        toast("Consultant added successfully", "success");
      })
      .catch((e) => {
        toast(e, "error");
      });
    setInputs({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      reTypePassword: "",
      mobile: "",
      nic: "",
      country: countriesData[0],
      jobType: jobs[0],
    });

    setErrors({
      email: false,
      firstName: false,
      lastName: false,
      password: false,
      mobile: false,
      nic: false,
      country: false,
      jobType: false,
    });
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Add New Consultant
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 pl-8">
          <div className="flex flex-row gap-10">
            <form class="mb-4 mt-4 w-full max-w-lg ">
              <div class="-mx-3 mb-6 flex flex-wrap">
                <div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
                  <label
                    class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    for="grid-first-name"
                  >
                    First Name
                  </label>
                  <input
                    class="mb-3 block w-full appearance-none rounded border bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                    id="grid-first-name"
                    type="text"
                    placeholder="Jane"
                    name="firstName"
                    onChange={changeHandler}
                    value={inputs.firstName}
                  />
                  {errors.firstName && (
                    <p class="text-xs italic text-red-500">
                      Please fill out this field.
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
                    name="lastName"
                    onChange={changeHandler}
                    value={inputs.lastName}
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
                    placeholder="Jane"
                    name="email"
                    onChange={changeHandler}
                    value={inputs.email}
                  />
                  {errors.email && (
                    <p class="text-xs italic text-red-500">
                      Please fill out this field.
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
                    placeholder="Doe"
                    name="nic"
                    onChange={changeHandler}
                    value={inputs.nic}
                  />

                  {errors.nic && (
                    <p class="text-xs italic text-red-500">
                      Please fill out this field.
                    </p>
                  )}
                </div>
              </div>

              <label
                class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                for="grid-last-name"
              >
                Mobile
              </label>
              <div className="-mx-7 mb-6 flex flex-wrap justify-center">
                <Menu placement="bottom-start">
                  <MenuHandler>
                    <Button
                      ripple={false}
                      variant="text"
                      color="blue-gray"
                      className="flex  items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-white pl-3"
                    >
                      <img
                        src={flags.svg}
                        alt={name}
                        className="h-4 w-4 rounded-full object-cover"
                      />
                      {countryCallingCode}
                    </Button>
                  </MenuHandler>
                  <MenuList className="max-h-[20rem] max-w-[18rem]">
                    {countries.map(
                      ({ name, flags, countryCallingCode }, index) => {
                        return (
                          <MenuItem
                            key={name}
                            value={name}
                            className="flex items-center gap-2"
                            onClick={() => setCountry(index)}
                          >
                            <img
                              src={flags.svg}
                              alt={name}
                              className="h-5 w-5 rounded-full object-cover"
                            />
                            {name}{" "}
                            <span className="ml-auto">
                              {countryCallingCode}
                            </span>
                          </MenuItem>
                        );
                      }
                    )}
                  </MenuList>
                </Menu>

                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="block w-[75%] appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "min-w-0",
                  }}
                  name="mobile"
                  onChange={changeHandler}
                  value={inputs.mobile}
                />
              </div>
              <div class="-mx-3 mb-6 flex flex-wrap">
                <div class="w-full px-3">
                  <label
                    class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    for="grid-password"
                  >
                    Password
                  </label>
                  <input
                    class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-password"
                    type="password"
                    placeholder="******************"
                    name="password"
                    onChange={changeHandler}
                    value={inputs.password}
                  />
                  {errors.password && (
                    <p class="text-xs italic text-red-500">
                      Please fill out this field.
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
                    Re-Type Password
                  </label>
                  <input
                    class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-password"
                    type="password"
                    placeholder="******************"
                    name="reTypePassword"
                    onChange={changeHandler}
                    value={inputs.reTypePassword}
                  />
                  {errors.nic && (
                    <p class="text-xs italic text-red-500">
                      Re-type passwoed is mismatched
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
                      onChange={changeHandler}
                      name="country"
                      value={inputs.country}
                    >
                      {countriesData.map((props) => (
                        <option key={props.code}>{props.name}</option>
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
                  </div>
                </div>

                <div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
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
                      onChange={changeHandler}
                      name="jobType"
                      value={inputs.jobType}
                    >
                      {jobs.map((props) => (
                        <option key={{ props }}>{props}</option>
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
                  </div>
                </div>

                <Button
                  color="green"
                  size="lg"
                  className="ml-4 mt-10 w-[95%]"
                  onClick={submitHandler}
                >
                  Submit
                </Button>
              </div>
            </form>

            <div className="flex w-full flex-col justify-center gap-8">
              <Typography variant="h4">Available Time slots</Typography>
              {timeSlots.map((data) => (
                <AvailableTimeSlots
                  title={data.day.substring(0, 3)}
                  data={data}
                  getTimeSlots={onTimeSlotHanlder}
                  key={data.day}
                />
              ))}

              <img src={AddNewClientImg} className="h-80 w-80 object-contain" />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
export default AddNewConsultant;
