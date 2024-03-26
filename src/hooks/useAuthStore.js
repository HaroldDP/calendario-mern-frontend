import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { clearErrorMessage, onLogin, onLogout, onchecking } from "../store/auth/authSlice";

export const useAuthStore = () =>{
    // Recordemos que useselector se comunica con nuestro store y nuestro store 
    // tiene toda nuestra informacion
    const {status,user,errorMessage} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const startLogin = async({email , password})=>{
        dispatch(onchecking())
        try {
            const {data} = await calendarApi.post('/auth',{email,password});        
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid:data.uid}));
            
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    // startRegister

    const startRegister = async({email , password, name})=>{
        dispatch(onchecking())
        try {
            const {data} = await calendarApi.post('/auth/new',{email,password,name});        
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid:data.uid}));
            
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async() =>{
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {

            const {data} = await calendarApi.post('/auth/new');        
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({name: data.name, uid:data.uid}))
            
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

     const startLogout = () =>{
        // Limpia todo el storage y lo deja en blanco
        localStorage.clear();
        dispatch(onLogout());
     } 



    return {
        //* Propiedades
        errorMessage,
        status,
        user,

        //* Metodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }

  }
  

