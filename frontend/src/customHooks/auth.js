//trying to make a custom hook as it is apparently the best way to handle auth with a JWT since it is seperate and may be used in many places so its safe for scalability


import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const readableToken = token.split(" ")[1]; // Makes the token readable as it starts with bearer
                const decodedToken = jwtDecode(readableToken); //decodeeeeee
                const currentTime = Date.now() / 1000; //token may be expired so check taht
                if (decodedToken.exp > currentTime) {
                    setUser(decodedToken);
                    setLoggedIn(true);
                } else{
                    //Clear expired token
                    localStorage.removeItem("token");
                    setUser(null);
                    setLoggedIn(false);
                }
            }
            
        } catch (error) {
            console.error("invalid or no token", error);
            localStorage.removeItem("token");
            setUser(null);
            setLoggedIn(false);
        }
    }, []);
    return { user, isLoggedIn };
}

export default useAuth;