import axios from "axios";
import { Env } from "../../environment";

export const ScheduleApi = {
    getScheduleByDate: async (from, to, state, room, doctor) => {
        return await axios.get(
            `${Env.nodeUrl}/schedule/byDate?from=${from}&to=${to}&iState=${state}&room=${room}&doctor=${doctor}`
        );
    },

    createSchedule: async schedule => {
        return await axios.post(`${Env.nodeUrl}/schedule`, schedule);
    },
};
