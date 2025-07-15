import {auth} from "../../firebase/firebaseConfig";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = React.useState(null);
    const [userLoggedIn, setUserLoggedIn] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    useEffect(() =>{
        const unsubscirbe = onAuthStateChanged(auth, initializeUser);
    }, [])

    async function initializeUser(user){
        if (user){
            setCurrentUser({ ...user});
            setUserLoggedIn(true);
        }else{
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }    
    const value = {
        currentUser,
        userLoggedIn,
        loading
    }
    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}
