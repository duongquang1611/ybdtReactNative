
import axios from "axios";
import { Env } from "../../environment";
export const ListHealthyBooksApi =  {
    getListHealthyBooks : async username => {
 //     return await axios.get("https://bvdkdongda.hosoyte.com/api/01004/hsyt/benhnhans/" + username + "/lankhams?pageIndex=1&pageSize=100");
      return await axios.get(`${Env.appUrl}/${Env.domain}/hsyt/benhnhans/${username}/lankhams?pageIndex=1&pageSize=100`);
    }
};