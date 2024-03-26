import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';



export const AppRouter = () => {
    // colocamos el  checkAuthToken porque queremos determinar si queremos
    // mostrar  la pantalla de login
    const{status, checkAuthToken} = useAuthStore();
    // const authStatus = 'not-authenticated'; // 'authenticated'; // 'not-authenticated';

    // Antes de cualquier condicion  el useeffect debe estar hacia arriba
    useEffect(() => {
     checkAuthToken();
    
    }, [/*No necesitamos dependencia a qui*/])
    

    if ( status === 'checking'){
        return(
            <h3>Cargando...</h3>
        )
    }


    

    return (
        <Routes>
            {
                ( status === 'not-authenticated')  
                    ? (
                        <>
                            <Route path="/auth/*" element={ <LoginPage /> } />
                            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={ <CalendarPage /> } />
                            <Route path="/*" element={ <Navigate to="/" /> } />
                        </>
                    )
            }

        </Routes>
    )
}
