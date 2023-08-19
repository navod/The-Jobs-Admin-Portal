import HttpService from "./http.service";

class AuthService {
  login = async (payload) => {
    const loginEndpoint = "api/v1/auth/authenticate";
    return await HttpService.post(loginEndpoint, payload);
  };
}

export default new AuthService();
