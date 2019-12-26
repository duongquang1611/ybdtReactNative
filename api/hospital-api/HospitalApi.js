import axios from "axios";
import { Env } from "../../environment";

export const hospitalApi = {
  getAllHospital: async () => {
    return await axios.get(`${Env.nodeUrl}/hospital`);
  },
  getHospitalById: async id => {
    return await axios.get(`${Env.nodeUrl}/hospital/${id}`);
  }
};
