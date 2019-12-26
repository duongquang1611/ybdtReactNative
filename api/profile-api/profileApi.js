import axios from "axios";
import { Env } from "../../environment";

export const profileApi = {
  getProfile: async username => {
    return await axios.get(`${Env.appUrl}/${Env.domain}/hsyt/benhnhans/${username}`);
  }
};
