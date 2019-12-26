import axios from "axios";
import { Env } from "../../environment";
export const ViewClsDetailApi = {
  getRawHtml: async IdPhieuIn => {
    return await axios.get(`${Env.appUrl}/${Env.domain}/HSPhieuIn/${IdPhieuIn}`);
  }
};
