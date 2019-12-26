import axios from "axios";
import { Env } from "../../environment";

export const doctorApi = {
    getDoctorByRoom: async idRoom => {
        return await axios.get(`${Env.nodeUrl}/doctor/byRoom/${idRoom}`);
    },
};
