import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import { CheckIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import dashboardService from "@/services/dashboard-service";
import LoadingSpinner from "../Utility/CustomSpinner/CustomSpinner";

export function ConsultantDashboard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    todayCountDTO: {
      todayCount: 0,
      yesterday: "",
      today: "",
      yesterdayCount: 0,
      increaseToday: 0,
    },
    pendingCount: 0,
    completedCount: 0,
    rejectCount: 0,
    todayBookingDetails: [],
  });

  useEffect(() => {
    setLoading(true);
    dashboardService
      .getConsultantAnalytics(localStorage.getItem("user_id"))
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-12">
      {loading && !data ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-5">
            <StatisticsCard
              title="Today Bookings"
              value={data.todayCountDTO.todayCount}
              color="blue"
              icon={<UserPlusIcon className="h-6 w-6 text-white" />}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  <strong className="text-green-500">
                    {data.todayCountDTO.increaseToday * 100}%
                  </strong>
                  &nbsp;than yesterday
                </Typography>
              }
            />
            <StatisticsCard
              title="Pending Bookings"
              value={data.pendingCount}
              color="orange"
              icon={<UserPlusIcon className="h-6 w-6 text-white" />}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  Total Pending Bookings
                </Typography>
              }
            />
            <StatisticsCard
              title="Reject Bookings"
              value={data.rejectCount}
              color="red"
              icon={<UserPlusIcon className="h-6 w-6 text-white" />}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  Total Reject Bookings
                </Typography>
              }
            />
            <StatisticsCard
              title="Complete Bookings"
              value={data.completedCount}
              color="green"
              icon={<UserPlusIcon className="h-6 w-6 text-white" />}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  Total Completed Bookings
                </Typography>
              }
            />

            <StatisticsCard
              title="Complete Bookings"
              value={data.sheduledCount}
              color="yellow"
              icon={<UserPlusIcon className="h-6 w-6 text-white" />}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  Total Scheduled Bookings
                </Typography>
              }
            />
          </div>
          <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-1">
            <Card className="overflow-hidden xl:col-span-2">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 flex items-center justify-between p-6"
              >
                <div>
                  <Typography variant="h6" color="blue-gray" className="mb-1">
                    Today Bookings
                  </Typography>
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 font-normal text-blue-gray-600"
                  >
                    <CheckIcon
                      strokeWidth={3}
                      className="h-4 w-4 text-blue-500"
                    />
                    <strong>
                      {data?.todayBookingDetails?.length} meetings sheduled
                    </strong>{" "}
                    today
                  </Typography>
                </div>
                <Menu placement="left-start">
                  <MenuHandler>
                    <IconButton size="sm" variant="text" color="blue-gray">
                      <EllipsisVerticalIcon
                        strokeWidth={3}
                        fill="currenColor"
                        className="h-6 w-6"
                      />
                    </IconButton>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>Action</MenuItem>
                    <MenuItem>Another Action</MenuItem>
                    <MenuItem>Something else here</MenuItem>
                  </MenuList>
                </Menu>
              </CardHeader>
              <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {["Job Seeker", "preffered Dest..", "Date/Time"].map(
                        (el) => (
                          <th
                            key={el}
                            className="border-b border-blue-gray-50 py-3 px-6 text-left"
                          >
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium uppercase text-blue-gray-400"
                            >
                              {el}
                            </Typography>
                          </th>
                        )
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {data?.todayBookingDetails?.length > 0 &&
                      data?.todayBookingDetails?.map((data, key) => {
                        const className = `py-3 px-5 ${
                          key === data?.todayBookingDetails?.length - 1
                            ? ""
                            : "border-b border-blue-gray-50"
                        }`;

                        return (
                          <tr key={data.booking.id}>
                            <td className={className}>
                              <div className="flex items-center gap-4">
                                <Avatar
                                  src={"/img/man.png"}
                                  alt={data.booking.firstName}
                                  size="sm"
                                />
                                <div>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold capitalize"
                                  >
                                    {data.jobSeeker.firstName +
                                      " " +
                                      data.jobSeeker.lastName}
                                  </Typography>
                                  <Typography className="text-xs font-normal text-blue-gray-500">
                                    {data.jobSeeker.email}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className={className}>
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold capitalize"
                                >
                                  {data.jobSeeker.preferJobType}
                                </Typography>
                                <Typography className="text-xs font-normal text-blue-gray-500">
                                  {data.jobSeeker.preferDestination}
                                </Typography>
                              </div>
                            </td>
                            <td className={className}>
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold capitalize"
                                >
                                  {data.booking.date}
                                </Typography>
                                <Typography className="text-xs font-normal text-blue-gray-500">
                                  {data.booking.time}
                                </Typography>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>

                {data?.todayBookingDetails?.length == 0 && (
                  <div
                    style={{ borderWidth: 1 }}
                    className="flex h-40 w-full items-center justify-center"
                  >
                    <Typography>No bookings available</Typography>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

export default ConsultantDashboard;
