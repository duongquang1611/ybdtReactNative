import axios from 'axios';
import {Env} from '../../environment';
const healthyBooksApi = {
    getPhieuKhamTheoUsername: async username => {
        try {
          let res =  await axios.get(`${Env.appUrl}/${Env.domain}/hsyt/benhnhans/${username}/lankhams?pageIndex=1&pageSize=100`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },

    getChiTietLanKhamTheoIdPhieuKham: async idPhieuKham => {
        try {
          let res =  await  axios.get(`${Env.appUrl}/${Env.domain}/hsyt/lankhams/${idPhieuKham}`);
          return res.data;
        } catch (error) {
            console.log(error);
        }
    },
    getHTMLPhieuCLSTheoIdPhieuIn: async idPhieuIn => {
        try {
          let res =  await axios.get(`${Env.appUrl}/${Env.domain}/HSPhieuIn/${idPhieuIn}`);
            return res.data.ViewData;
        } catch (error) {
            console.log(error);
        }
    }

}

export default healthyBooksApi;