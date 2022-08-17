import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export const GlobalContextProvider = ({children}) => {
    const { isAuthenticated, user } = useAuth0();
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [questionCollection, setQuestionCollection] = useState(null);
    const [status, setStatus] = useState("loading");
    const [updateCollection, setUpdateCollection] = useState(false);
    const [subjectList, setSubjectList] = useState(null)

    // get a list of unique subjects
    const getSubjects = (data) => {
        let subjects = [...new Set(data.map(item => item.subject))];
        setSubjectList(subjects);
    }

    // when user signed in, get all questions saved for this user
    useEffect(() => {
        if (userId) {
            setStatus("loading");
            fetch(`/api/all-questions/${userId}`)
            .then(res => res.json())
            .then(data => {
                setQuestionCollection(data.data);
                getSubjects(data.data)
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

    // set userId and username after login
    useEffect(() => {
        if (isAuthenticated) {
            setUserId(user.sub);
            (user.given_name !== "" && user.given_name)  ?
                setUserName(user.given_name):
                setUserName(user.nickname)

            // add user if doesn't exist in database
            fetch(`/api/patch-user`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    _id: user.sub,
                    email: user.email,
                    name: user.name,
                    nickname: user.nickname,
                })
            })
            .then(response => response.json())
            .then(data => {
            })
            .catch((error) => {
                console.log(error);
            });
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
            setUpdateCollection,
            userName,
            setUserName,
            subjectList,
            setSubjectList,
        }}
        >
        {children}
        </GlobalContext.Provider>
    )
}