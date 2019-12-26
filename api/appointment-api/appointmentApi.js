import axios from "axios";
import { Env } from "../../environment";
let stt = 1;
const appointmentApi = {
    getListAppointmentById: async (id, state) => {
        try {
            let res = await axios.get(
                `http://api.yteso.vn/api/schedule/patient/${id}`,
                {
                    params: {
                        state: state,
                    },
                }
            );
            // console.log(
            //     `http://api.yteso.vn/api/schedule/patient/${id}?state=${state}`
            // );

            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
};

export default appointmentApi;
