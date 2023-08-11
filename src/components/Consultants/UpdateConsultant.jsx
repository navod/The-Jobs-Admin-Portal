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

const UpdateConsultant = () => {
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
                    class="mb-3 block w-full appearance-none rounded border border-red-500 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                    id="grid-first-name"
                    type="text"
                    placeholder="Jane"
                  />
                  <p class="text-xs italic text-red-500">
                    Please fill out this field.
                  </p>
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
                    class="mb-3 block w-full appearance-none rounded border border-red-500 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                    id="grid-first-name"
                    type="text"
                    placeholder="Jane"
                  />
                  <p class="text-xs italic text-red-500">
                    Please fill out this field.
                  </p>
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
                  />
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
                    type="password"
                    placeholder="******************"
                  />
                  <p class="text-xs italic text-gray-600">
                    Make it as long and as crazy as you'd like
                  </p>
                </div>
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
                  />
                  <p class="text-xs italic text-gray-600">
                    Make it as long and as crazy as you'd like
                  </p>
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
                  />
                  <p class="text-xs italic text-gray-600">
                    Make it as long and as crazy as you'd like
                  </p>
                </div>
              </div>

              <div class="-mx-3 mb-6 flex flex-wrap">
                <div class="w-full px-3">
                  <label
                    class="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                    for="grid-password"
                  >
                    NIC
                  </label>
                  <input
                    class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="grid-password"
                    type="password"
                    placeholder="******************"
                  />
                  <p class="text-xs italic text-gray-600">
                    Make it as long and as crazy as you'd like
                  </p>
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
                      {jobs.map((props) => (
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
                  </div>
                </div>
              </div>
            </form>
          </div>
        </DialogBody>

        <DialogFooter>
          <Button
            variant="gradient"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Delete</span>
          </Button>
          <Button variant="gradient" color="yellow" onClick={handleOpen}>
            <span>Update</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default UpdateConsultant;
