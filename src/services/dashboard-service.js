import HttpService from "./http.service";

const SUB_URL = "api/v1/dashboard/";
class dashboardService {
  getConsultantAnalytics = async (consultantId) => {
    const getAllEndPoint =
      SUB_URL + `get-consultant-analytics?id=${consultantId}`;
    return await HttpService.get(getAllEndPoint, consultantId);
  };

  getDashboardAnalytics = async (consultantId) => {
    const getAllEndPoint = SUB_URL + `get-main-analytics`;
    return await HttpService.get(getAllEndPoint);
  };
}

export default new dashboardService();
