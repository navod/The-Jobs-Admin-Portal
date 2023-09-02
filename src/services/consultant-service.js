import HttpService from "./http.service";

const SUB_URL = "api/v1/consultant/";

class ConsultantService {
  getAll = async (payload) => {
    const consultantEndPoint = SUB_URL + "get-all";
    return await HttpService.get(consultantEndPoint, payload);
  };

  update = async (payload) => {
    const consultantEndPoint = SUB_URL + "update-consultant";
    return await HttpService.put(consultantEndPoint, payload);
  };

  save = async (payload) => {
    const consultantEndPoint = SUB_URL + "register";
    return await HttpService.post(consultantEndPoint, payload);
  };

  activation = async (payload) => {
    const consultantEndPoint =
      SUB_URL + `activation?id=${payload.id}&status=${payload.status}`;
    return await HttpService.put(consultantEndPoint, payload);
  };

  delete = async (payload) => {
    const consultantEndPoint = SUB_URL + `delete-consultant?id=${payload.id}`;
    return await HttpService.put(consultantEndPoint, payload);
  };

  getAvailableTimeSlot = async (payload) => {
    const getAvailabilityByIdEndPoint =
      SUB_URL +
      `get-availability-by-date?id=${payload.id}&date=${payload.date}`;
    return await HttpService.get(getAvailabilityByIdEndPoint);
  };

  getMyBookings = async (id, status) => {
    const getMyBookingEndPoint =
      SUB_URL + `get-my-booking?id=${id}&status=${status}`;
    return await HttpService.get(getMyBookingEndPoint);
  };

  getConsultant = async (id) => {
    const getConsultant = SUB_URL + `get-consultant?id=${id}`;
    return await HttpService.get(getConsultant);
  };
}

export default new ConsultantService();
