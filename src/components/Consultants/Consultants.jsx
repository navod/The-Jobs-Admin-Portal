import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
  Input,
  Switch,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { Pagination } from "../Utility/Pagination";
import UpdateConsultant from "./UpdateConsultant";

const Consultants = () => {
  const [email, setEmail] = React.useState("");
  const onChange = ({ target }) => setEmail(target.value);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Consultants
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div className="flex justify-end p-4">
            <div className="relative ml-4 flex w-full max-w-[24rem]">
              <Input
                type="text"
                label="Search"
                value={email}
                onChange={onChange}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
                color="green"
              />
              <Button
                size="sm"
                color={email ? "green" : "light-green"}
                disabled={!email}
                className="!absolute right-1 top-1 rounded"
              >
                Search
              </Button>
            </div>
          </div>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["author", "function", "status", "employed", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {authorsTableData.map(
                ({ img, name, email, job, online, date }, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {job[0]}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={online ? "green" : "blue-gray"}
                          value={online ? "online" : "offline"}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date}
                        </Typography>
                      </td>
                      <td
                        className={
                          className + " flex flex-row items-center gap-4"
                        }
                      >
                        <Switch
                          id="custom-switch-component"
                          ripple={false}
                          className="h-full w-full checked:bg-[#2ec946]"
                          containerProps={{
                            className: "w-11 h-6",
                          }}
                          circleProps={{
                            className: "before:hidden left-0.5 border-none",
                          }}
                          checked={true}
                        />

                        {/* <Button
                          variant="text"
                          className="flex items-center gap-2"
                          href="/profile"
                        >
                          View
                        </Button> */}
                        <UpdateConsultant />
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Pagination />
    </div>
  );
};

export default Consultants;
