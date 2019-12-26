
import { Env } from "../../environment"

export const LoginAPI = {
    LoginTo: async (username, password) => {
        let params = {
            username: username,
            password: password,
            grant_type: Env.grant_type,
            client_id: Env.client_id
        };

        var data = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            data.push(encodedKey + "=" + encodedValue);
        }

        data = data.join("&");

        return await fetch(Env.auth, {
            method: "Post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data
        });

    }
}