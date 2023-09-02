import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
} from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import LoadingSpinner from "../Utility/CustomSpinner/CustomSpinner";
import dashboardService from "@/services/dashboard-service";

export function AdminDashboard() {
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllAnalytics();
  }, []);

  const getAllAnalytics = async () => {
    setLoading(true);
    await dashboardService
      .getDashboardAnalytics()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <div className="mt-12">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            <StatisticsCard
              title="Today Bookings"
              value={data?.todayCountDTO?.todayCount}
              color="blue"
              icon={<UserPlusIcon className="h-6 w-6 text-white" />}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  <strong className="text-green-500">
                    {data?.todayCountDTO?.todayCount * 100}%
                  </strong>
                  &nbsp;than last week
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
              title="Total Consultants"
              value={data.totalConsultants}
              color="blue"
              icon={<UserPlusIcon className="h-6 w-6 text-white" />}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  Total Consultants
                </Typography>
              }
            />
            <StatisticsCard
              title="Active Consultants"
              value={data.activeConsultants}
              color="green"
              icon={<UserPlusIcon className="h-6 w-6 text-white" />}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  Total Active Consultants
                </Typography>
              }
            />
            <StatisticsCard
              title="Inactive Consultants"
              value={data.deactiveConsultants}
              color="blue-gray"
              icon={<UserPlusIcon className="h-6 w-6 text-white" />}
              footer={
                <Typography className="font-normal text-blue-gray-600">
                  Total Inactive Consultants
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
                    Today Consultants
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
                      {data?.totalConsultantsAnalytics?.length} consultants
                    </strong>
                  </Typography>
                </div>
              </CardHeader>
              <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full min-w-[640px] table-auto">
                  <thead>
                    <tr>
                      {["Consultant", "preffered Dest..", "Bookings"].map(
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
                    {data?.totalConsultantsAnalytics?.map((consultant, key) => {
                      const className = `py-3 px-5 ${
                        key === data.totalConsultantsAnalytics.length - 1
                          ? ""
                          : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={consultant.id}>
                          <td className={className}>
                            <div className="flex items-center gap-4">
                              <Avatar
                                src={"/img/man.png"}
                                alt={consultant.firstName}
                                size="sm"
                              />
                              <div>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-bold capitalize"
                                >
                                  {consultant.firstName +
                                    " " +
                                    consultant.lastName}
                                </Typography>
                                <Typography className="text-xs font-normal text-blue-gray-500">
                                  {consultant.email}
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
                                {consultant.jobType}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {consultant.country}
                              </Typography>
                            </div>
                          </td>
                          <td className={className}>
                            <div className="grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                              <div className="flex flex-col items-center justify-center rounded-lg bg-green-500 p-2 shadow-lg">
                                <Typography
                                  variant="small"
                                  color="white"
                                  className="font-bold capitalize"
                                >
                                  {consultant.completedCount}
                                </Typography>
                                <Typography className="text-xs font-normal text-white">
                                  Complete
                                </Typography>
                              </div>

                              <div className="flex flex-col items-center justify-center rounded-lg bg-orange-500 p-2 shadow-lg">
                                <Typography
                                  variant="small"
                                  color="white"
                                  className="font-bold capitalize"
                                >
                                  {consultant.pendingCount}
                                </Typography>
                                <Typography className="text-xs font-normal text-white">
                                  Pending
                                </Typography>
                              </div>

                              <div className="flex flex-col items-center justify-center rounded-lg bg-red-500 p-2 shadow-lg">
                                <Typography
                                  variant="small"
                                  color="white"
                                  className="font-bold capitalize"
                                >
                                  {consultant.rejectCount}
                                </Typography>
                                <Typography className="text-xs font-normal text-white">
                                  Reject
                                </Typography>
                              </div>

                              <div className="flex flex-col items-center justify-center rounded-lg bg-blue-500 p-2 shadow-lg">
                                <Typography
                                  variant="small"
                                  color="white"
                                  className="font-bold capitalize"
                                >
                                  {consultant.todayCount}
                                </Typography>
                                <Typography className="text-xs font-normal text-white">
                                  Today
                                </Typography>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
