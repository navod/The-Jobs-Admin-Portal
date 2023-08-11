import { countriesData } from "@/data/countries-data";
import { jobs } from "@/data/jobs-data";
import React from "react";
import AddNewClientImg from "../../../public/img/add-new-construct.png";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useCountries } from "use-react-countries";

const AddNewConsultant = () => {
  const { countries } = useCountries();
  const [country, setCountry] = React.useState(0);
  const { name, flags, countryCallingCode } = countries[country];

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Add New Consultant
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 pl-8">
          <div className="flex flex-row">
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

                <Button color="green" size="lg" className="w-[95%] ml-4 mt-10">Submit</Button>
              </div>
            </form>

            <div className="flex w-full items-center justify-center">
              <img src={AddNewClientImg} />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddNewConsultant;
