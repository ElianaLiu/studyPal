import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({children}) => {
    const { isAuthenticated, user } = useAuth0();
    const [userId, setUserId] = useState(null);
    const [questionCollection, setQuestionCollection] = useState(null);
    const [status, setStatus] = useState("loading");
    const [updateCollection, setUpdateCollection] = useState(false);

    useEffect(() => {
        if (userId) {
            setStatus("loading");
            fetch(`/api/all-questions/${userId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setQuestionCollection(data.data);
                setStatus("idle")
            })
            .catch((err)=>{
                setStatus("error");
                throw new Error(err.stack);
            });
        } else {
            setQuestionCollection(null)
        }
    }, [userId, updateCollection]);

    useEffect(() => {
        if (isAuthenticated) {
            console.log(user)
            setUserId(user.sub);
        } else {
            setUserId(null)
        }
    }, [isAuthenticated]);

    return (
        <GlobalContext.Provider
        value={{
            status,
            setStatus,
            userId,
            setUserId,
            questionCollection,
            setQuestionCollection,
            updateCollection,
            setUpdateCollection
        }}
        >
        {children}
        </GlobalContext.Provider>
    )
}