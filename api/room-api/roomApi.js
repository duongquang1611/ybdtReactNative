import axios from "axios";
import { Env } from "../../environment";

export const roomApi = {
    getRooms: async (size, page) => {
        return await axios.get(
            `${Env.nodeUrl}/room/all?size=${size}&page=${page}`
        );
    },
};
