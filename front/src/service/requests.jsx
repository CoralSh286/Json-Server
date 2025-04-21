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

const checkIsUserNameExist = async ({username}) => {
    try {
        const response = await apiRequest({ url: `/users?username=${username}`, method: 'get', });
        return response;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
}
const registerUser = async (user) => {
    try {
        const response = await apiRequest({ url: '/users', method: 'post', body: user  });
        return response;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
}
export { login, checkIsUserNameExist,registerUser };