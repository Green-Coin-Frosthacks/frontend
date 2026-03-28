import { useEffect, useState } from "react";
import { Authcontext } from "./Context/Authcontext";
import { getMe } from "./services/auth.service";

function AuthContextProvider({ children }){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    async function fetchUser(){
        try{
            const res = await getMe();
            setUser(res.user);
        }catch(err){
            setUser(null);
            console.log(err);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        fetchUser();
    }, []);
    return(
        <Authcontext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </Authcontext.Provider>
    )
}
export default AuthContextProvider;