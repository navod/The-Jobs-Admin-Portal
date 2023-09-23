import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import moment from "moment";
import BookingReject from "@/components/Bookings/BookingReject";
import BookingAccept from "@/components/Bookings/BookingAccept";
import { BookingDetails } from "@/components/Bookings/BookingDetails";
import { Pagination } from "@/components/Utility/Pagination";
import LoadingSpinner from "@/components/Utility/CustomSpinner/CustomSpinner";
import consultantService from "@/services/consultant-service";

export function MyBookings() {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  const [bookingStatus, setBookingStatus] = useState("All");

  useEffect(() => {
    getAll();
  }, [bookingStatus]);

  const getAll = async () => {
    setLoading(true);
    const response = await consultantService
      .getMyBookings(localStorage.getItem("user_id"), bookingStatus)
      .then((data) => setBookings(data.data))
      .finally(() => setLoading(false));
  };

  const getColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "green";
      case "COMPLETED":
        return "blue";
      case "PENDING":
        return "blue-gray";
      case "REJECTED":
        return "red";
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Bookings
          </Typography>
        </CardHeader>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <div className="mr-4 flex flex-row justify-end p-2">
              <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  class="rounded-l-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
                  onClick={() => setBookingStatus("All")}
                >
                  All
                </button>
                <button
                  type="button"
                  class="border-t border-b border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
                  onClick={() => setBookingStatus("APPROVED")}
                >
                  Approved
                </button>
                <button
                  type="button"
                  class="border-t border-b border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
                  onClick={() => setBookingStatus("REJECTED")}
                >
                  Rejected
                </button>
                <button
                  type="button"
                  class="border-t border-b border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
                  onClick={() => setBookingStatus("COMPLETED")}
                >
                  Completed
                </button>

                <button
                  type="button"
                  class="rounded-r-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
                  onClick={() => setBookingStatus("PENDING")}
                >
                  Pending
                </button>
              </div>
            </div>

            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["name", "job detail", "status", "created", ""].map((el) => (
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
                {bookings.map(({ consultant, jobSeeker, booking }, key) => {
                  const className = `py-3 px-5 ${
                    key === bookings.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={key}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar
                            src={"/img/man.png"}
                            alt="profile"
                            size="sm"
                          />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold capitalize"
                            >
                              {jobSeeker?.firstName} {jobSeeker?.lastName}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {jobSeeker?.email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {jobSeeker?.preferJobType}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {jobSeeker?.preferDestination}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={getColor(booking?.status)}
                          value={booking?.status}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {moment(jobSeeker?.createdDate).format("YY/MM/DD")}
                        </Typography>
                      </td>
                      <td
                        className={
                          className +
                          " mt-1 flex w-full flex-row items-center justify-center gap-4"
                        }
                      >
                        {booking?.status == "PENDING" && (
                          <>
                            <BookingAccept
                              size="sm"
                              consultantId={consultant?.id}
                              bookingId={booking?.id}
                              getAll={getAll}
                            />
                            <BookingReject
                              size="sm"
                              consultantId={consultant?.id}
                              bookingId={booking?.id}
                              getAll={getAll}
                            />
                          </>
                        )}

                        <BookingDetails
                          consultantDetails={consultant}
                          bookingDetails={booking}
                          jobSeekerDetails={jobSeeker}
                          getAll={getAll}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        )}
      </Card>

      <Pagination />
    </div>
  );
}

export default MyBookings;
