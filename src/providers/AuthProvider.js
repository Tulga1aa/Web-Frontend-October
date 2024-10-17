import { useEffect, createContext, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthContext = createContext({
  currentUser: null,
  isLoading: false,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
    }

    setIsLoading(false);
  }, [isLoading]);

  useEffect(() => {
    if (!currentUser && !isLoading) {
      router.push("/signIn");
    }
  }, [isLoading]);

  const signin = async (email, password) => {
    setIsLoading(true);

    try {
      const { data } = await axios.post("http://localhost:8000/user/signin", {
        email: email,
        password: password,
      });

      localStorage.setItem("user", JSON.stringify(data.user));

      setCurrentUser(data.user);

      setIsLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        signin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
