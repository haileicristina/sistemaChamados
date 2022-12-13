import {useState,createContext, useEffect} from 'react'
import firebase from '../services/firebaseConfig';
import {toast} from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);
          
    useEffect(() => {
        function loadStorage (){
            const storageUser = localStorage.getItem('SistemaUser');
            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }
        loadStorage();
    },[])

    //fazer login do usuário
    const signIn = async (email, password) => {
        setLoadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then( async (value)=>{
            let uid = value.user.uid;
            //buscando usuário no firebase
            const userProfile = await firebase.firestore().collection('users')
            .doc(uid).get();

            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                avatarUrl: userProfile.data().avatarUrl
            };
            setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success(`Bem vindo (a) de volta, ${data.nome}`);
        })
        .catch((error) =>{
            console.log(error);
            setLoadingAuth(false);
            toast.error('Ops...Algo deu errado!!!');
        })
    }


    //cadastrar usuário
    const cadastrarUser = async (email, password, nome) =>{
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async(value) => {
            let uid = value.user.uid;

            await firebase.firestore().collection('users')
            .doc(uid).set({
                nome: nome,
                avatarUrl: null,
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                    avatarUrl: null
                };
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success(`Bem vindo (a), ${data.nome}`);
            })
        })
        .catch((error) =>{
            console.log(error);
            setLoadingAuth(false);
            toast.error('Ops...Algo deu errado!!!');
        })
        
    }

    //salvando os dados no localStorage
    const storageUser = (data) =>{
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    //Logout do usuário
    const signOut = async () =>{
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }
    return(
        <AuthContext.Provider
        value={{
            signed: !!user,
            user,
            loading,
            cadastrarUser,
            signOut,
            signIn,
            loadingAuth,
            setUser,
            storageUser
            }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;