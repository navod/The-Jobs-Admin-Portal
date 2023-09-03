import HttpService from "./http.service";

class AuthService {
  login = async (payload) => {
    const loginEndpoint = "api/v1/auth/authenticate";
    return await HttpService.post(loginEndpoint, payload);
  };
  regiser = async (payload) => {
    const regiserEndpoint = "api/v1/main-user/register";
    return await HttpService.post(regiserEndpoint, payload);
  };
  logout = async (payload) => {
    const regiserEndpoint = "api/v1/auth/logout";
    return await HttpService.post(regiserEndpoint, payload);
  };

  getUser = async (id) => {
    const getMainUserId = `api/v1/main-user/get-main-user?id=${id}`;
    return await HttpService.get(getMainUserId, id);
  };
}

export default new AuthService();
