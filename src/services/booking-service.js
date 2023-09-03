import HttpService from "./http.service";

const SUB_URL = "api/v1/booking/";
class BookingService {
  getAll = async (status) => {
    const getAllEndPoint = SUB_URL + `get-all?status=${status}`;
    return await HttpService.get(getAllEndPoint, status);
  };

  acceptBooking = async (payload) => {
    const acceptBooingEndPoint = SUB_URL + "accept-booking";
    return await HttpService.post(acceptBooingEndPoint, payload);
  };

  rejectBooking = async (payload) => {
    const rejectBooingEndPoint = SUB_URL + "reject-booking";
    return await HttpService.delete(rejectBooingEndPoint, payload);
  };

  completeBooking = async (id) => {
    const completeBookingEndPoint = SUB_URL + `complete-booking?id=${id}`;
    return await HttpService.put(completeBookingEndPoint);
  };
}

export default new BookingService();
