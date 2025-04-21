import { apiRequest } from "./api";
 
const login = async ({username, password}) => {
    try {
        const response = await apiRequest({ url: `/users?username=${username}&website=${password}`, method: 'get', initialData: null });
        return response;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

const register = async ({username, password}) => {
    try {
        const response = await apiRequest({ url: '/users', method: 'post', body: { username, website: password } });
        return response;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
}
export { login, register };