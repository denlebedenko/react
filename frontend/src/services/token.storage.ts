import decode from 'jwt-decode';

const tokenKey = 'token';


export default class TokenStorage { 

    getToken = () => {
        const token  = localStorage.getItem(tokenKey);
        return token;
    }

    setToken = (token: string) => {
        localStorage.setItem(tokenKey, token);
    }

    isTokenExpired = (token:string) => {
        if (token) {
            const decodedToken:any = decode(token);
            if(decodedToken.exp < Date.now() / 1000){
                return true;
            } else return false;
        }
    }

    getData = (token:string) => {
        const decodedToken:any = decode(token);
        return decodedToken
    }    

    getUserRole = (token:string) => {
        const decodedToken:any = decode(token);
        const userRole = decodedToken.role;
        return userRole;
    }

    loggedIn = (token:string) => {
        return !!token && !this.isTokenExpired(token);
    };

    removeToken = () => {
        return localStorage.removeItem(tokenKey);
    }
}   