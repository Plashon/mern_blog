import { useState, useContext, createContext, useEffect } from "react";
import AuthService from "../services/auth.service";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getUser);

  const login = (user) => setUser(user);

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };
  
  function getUser() {
    const savedUser = cookies.get("user") || null;
    return savedUser;
  }

  useEffect(() => {
    console.log(user);
    cookies.set("user", JSON.stringify(user), {
      path: "/",
      expires: new Date(Date.now() + 86400),
    });
  }, [user]);

  return (
    //ไม่ต้องมีวงเล็บซ้อนไว้
    <UserContext.Provider value={{user,login ,logout}} >
        
        {children}
    </UserContext.Provider>
  )
};

export const useUserContext = () => useContext(UserContext)