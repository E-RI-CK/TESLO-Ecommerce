'use client';

import { useForm, SubmitHandler } from "react-hook-form"
import Link from "next/link";
import { clsx } from "clsx";
import { login, registerUser } from "@/actions";
import { useState } from "react";


type FormInputs = {
    name: string,
    email: string,
    password: string
}


export const RegisterForm = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {

        const { name, email, password } = data;
        const res = await registerUser(name, email, password);

        if (!res.ok) {
            setErrorMessage(res.message);
            return;
        }

        await login(email.toLowerCase(), password);

        window.location.replace('/');

    }

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

            {/* Input Nombre */}
            {
                errors.name?.type === 'required' && (
                    <span className="text-red-500">* El nombre es obligatorio</span>
                )
            }

            <label htmlFor="name">Nombre completo</label>
            <input
                className={clsx(
                    "px-5 py-2 border bg-gray-200 rounded mb-5",
                    {
                        "border-red-500": errors.name
                    }
                )}
                type="text"
                autoFocus
                {...register('name', { required: true })}
            />

            {/* Input email */}

            {
                errors.email?.type === 'required' && (
                    <span role="alert" className="text-red-500">* {errors.email.message}</span>
                )
            }
            {
                errors.email?.type === 'pattern' && (
                    <span role="alert" className="text-red-500">* El formato del correo electrónico no es válido</span>
                )
            }
            <label htmlFor="email">Correo Electrónico</label>
            <input
                className={clsx(
                    "px-5 py-2 border bg-gray-200 rounded mb-5",
                    {
                        "border-red-500": errors.email
                    }
                )}
                type="text"
                {...register('email', { required: "El correo es obligatorio", pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })}
            />

            {/* Input Password */}

            {
                errors.password?.type === 'required' && (
                    <span role="alert" className="text-red-500">* La contraseña es requerida</span>
                )
            }

            {
                errors.password?.type === 'minLength' && (
                    <span role="alert" className="text-red-500">* La contraseña debe contener 6 caracteres</span>
                )
            }

            <label htmlFor="password">Contraseña</label>
            <input
                className={clsx(
                    "px-5 py-2 border bg-gray-200 rounded mb-5",
                    {
                        "border-red-500": errors.password
                    }
                )}
                type="password"
                {...register('password', { required: true, minLength: 6 })}
            />

            {
                <span role="alert" className="text-red-500">{errorMessage}</span>
            }

            <button

                className="btn-primary">
                Crear cuenta
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                Ingresar
            </Link>

        </form>
    )
}
