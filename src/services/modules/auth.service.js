import { Http } from "../service";
import utils from "../utils";

/**
 * Service extension class
 * @since 1.0.0
 */
export class AuthService {
  /**
   * login service method
   * @param {Object} data
   * @returns {Promise}
   */
  static async login(data) {
    const { email, password } = data;
    try {
      const response = await new Http({ auth: false }).post(utils.url.login, {
        email,
        password,
      });
      this._setSessionValues(response);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * logout service method
   * @returns {Promise}
   */
  static async logout(data) {
    const { refreshToken } = data;
    try {
      const response = await new Http({ auth: true }).post(utils.url.logout, {
        refreshToken,
      });
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * forget pass service method
   * @param {Object} data
   * @returns {Promise}
   */
  static async forgotPass(data) {
    try {
      const response = await new Http({ auth: false }).post(
        utils.url.forgot_pass,
        data
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // ----------------------------------------------------------------------------
  /**
   * @returns {Promise}
   * auto login method
   */
  static async auto_login() {
    const post_body = {
      refresh_token: utils.getLocalStoragevalue("refresh_token"),
    };
    try {
      const response = await new Http({ auth: true }).post(
        utils.url.login,
        post_body
      );
      this._setSessionValues(response);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * storage init wrapper
   * @param {Object} response response from the service call
   */
  static _setSessionValues = (response) => {
    const { access } = response.data.tokens;
    const { refresh } = response.data.tokens;
    const { user } = response.data;

    utils.setLocalStoragevalue("token", access.token);
    utils.setLocalStoragevalue("tokenExpires", access.expires);
    utils.setLocalStoragevalue("refreshToken", refresh.token);
    utils.setLocalStoragevalue("refreshTokenExpires", refresh.expires);
    utils.setLocalStoragevalue("name", user.name);
    utils.setLocalStoragevalue("email", user.email);
    utils.setLocalStoragevalue("role", user.role);
    utils.setLocalStoragevalue("isConditionAccepted", user.isConditionAccepted);
    utils.setLocalStoragevalue("isChangePassword", user.isChangePassword);
  };
}
