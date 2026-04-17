import React, { useEffect, useState } from 'react';
import { CustomButton } from '../../../components/Button/Button';
import { CustomInput } from '../../../components/Input/Input';
import { useAuthContext } from '../../../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../models/routes.models';
import { useModalContext } from '../../../components/Modal/context/UseModalContext';

export const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, errors, isAuthenticated, isLoading, companies} = useAuthContext();
    const { setState, setContent } = useModalContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated){
            navigate(`${AppRoutes.private.root}/${AppRoutes.private.facturas}`);
        }
    }, [isAuthenticated, navigate]);

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        signIn(email, password);
    }

    const handleSelectCompany = (companyId: number) => {
        signIn(email, password, companyId);
    }

    useEffect(() => {
        if(errors.length > 0) {
            setContent( 
            <div className="text-red-500">
                {errors.map((err, i) => (
                <p key={i}>{err}</p>
                ))}
            </div>)
            setState(true);
        }
    }, [errors, setContent, setState]);

    return (
        /* Fondo con degradado azul profesional */
        <div className='min-h-screen w-screen bg-linear-to-br from-slate-800 via-blue-900 to-slate-900 flex justify-center items-center p-4'>
            
            {/* Contenedor principal*/}
            <div className='flex flex-col lg:flex-row w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl min-h-150'>
                
                {/* Lado Izquierdo: Branding "Solventyc" */}
                <div className='hidden lg:flex lg:basis-3/5 bg-blue-600 flex-col justify-center items-center p-12 text-white relative overflow-hidden'>
                    {/* Decoración sutil de fondo */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
                    </div>

                    <div className='relative z-10 text-center'>
                        <h2 className='text-6xl font-black tracking-tighter mb-2'>
                            Solventyc<span className='text-blue-300'>.</span>
                        </h2>
                        <div className='h-1 w-20 bg-blue-300 mx-auto mb-6 rounded-full'></div>
                        <p className='text-xl font-light text-blue-100 max-w-md'>
                            Soluciones inteligentes para la gestión de tu facturación electrónica.
                        </p>
                    </div>
                </div>
                
                {/* Lado Derecho: Formulario - Siempre visible y ocupa el 100% en móvil */}
                <div className='basis-full lg:basis-2/5 p-8 sm:p-12 md:p-16 lg:p-12 flex justify-center flex-col bg-white'>
                    
                    {/* Logo/Nombre*/}
                    <div className='lg:hidden text-center mb-8'>
                        <h2 className='text-4xl font-black tracking-tighter text-blue-600'>
                            Solventyc<span className='text-blue-400'>.</span>
                        </h2>
                        <p className='text-sm text-slate-400 uppercase tracking-widest'>Facturación</p>
                    </div>

                    <h1 className='text-2xl font-bold text-slate-800 mb-2'>Bienvenido</h1>
                    <p className='text-slate-500 mb-10'>Ingresa a tu panel de control</p>

                    {companies.length > 0 ? ( 
                    <div className='flex flex-col gap-3'>
                        <p className='text-sm text-gray-500 mb-4 text-center'>
                            Selecciona una Empresa para continuar
                        </p>
                        {companies.map((company) => (
                            <CustomButton 
                                key={company.id}
                                onClick={() => handleSelectCompany(company.id)}
                                isLoading={isLoading}>
                                    {company.legalName}
                            </CustomButton>
                        ))}
                    </div>) : 
                    (<form onSubmit={handleLogin} className='flex flex-col'>

                        <div className='pb-4'>
                            <CustomInput 
                                label='Correo electrónico'
                                required={true}
                                type='email' 
                                placeholder='usuario@solventyc.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>                    
                        
                        <div className='pb-2'>
                            <CustomInput 
                                label='Contraseña'
                                required={true}
                                type='password' 
                                placeholder='********'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        
                        <p className='text-right text-sm text-blue-600 hover:underline cursor-pointer mb-8'>
                            ¿Olvidaste tu contraseña?
                        </p>

                        <div className='h-12'>
                            <CustomButton type='submit' isLoading={isLoading}>
                                {isLoading ? "Cargando..." : "Iniciar sesión"}
                            </CustomButton>
                        </div>

                        <div className='flex items-center my-8'>
                            <hr className='grow border-gray-200'/>
                            <span className='px-3 text-gray-400 text-[10px] sm:text-xs uppercase'>Sistema de Facturación</span>
                            <hr className='grow border-gray-200'/>
                        </div>
                    </form>)
                    }
                </div>
            </div>        
        </div> 
    );
}