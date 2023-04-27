import React, { useState } from 'react';

import { InputNumber } from 'primereact/inputnumber';

import { Button } from 'primereact/button';

export default function BasicDemo() {
    const [dni, setDni] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [estado, setEstado] = useState(false);
    const [showDNI, setShowDNI] = useState(true);

    const buscarDNI = () => {
        fetch(
            `https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InBhcmFpbXByZXNpb25pbXByZXNpb25lc2NsYWpAZ21haWwuY29tIn0.fzAAg1GFZAgUQjp67YvSCzWAVTjcJbZn_JjW6xhImPg`
        )
            .then((response) => response.json())
            .then((data) => {
                setNombres(data.nombres);
                setApellidos(data.apellidoPaterno + ' ' + data.apellidoMaterno);
                setEstado(true);
                setEmoji(
                    <>
                        <p>🧐</p>
                        <p>🍷</p>
                    </>
                );
                handleClickEmoji();
            })
            .catch((error) => {
                console.error(error);
                setEstado(false);
                setNombres('');
                setApellidos('');
                setDni('');
                setEmoji('🤡');
                handleClickEmoji();
            });
    };

    const buscarRUC = async () => {
        fetch(
            `https://dniruc.apisperu.com/api/v1/ruc/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InBhcmFpbXByZXNpb25pbXByZXNpb25lc2NsYWpAZ21haWwuY29tIn0.fzAAg1GFZAgUQjp67YvSCzWAVTjcJbZn_JjW6xhImPg`
        )
            .then((response) => response.json())
            .then((data) => {
                setNombres(data.razonSocial);
                setApellidos(data.direccion);
                if (data?.success == false) {
                    setEstado(false);
                    setNombres('');
                    setApellidos('');
                    setDni('');
                    setEmoji('🤡');
                    handleClickEmoji();
                } else {
                    setEstado(true);
                    setEmoji('🧐🍷');
                    handleClickEmoji();
                }
            })
            .catch((error) => {
                console.error(error);
                setEstado(false);
                setNombres('');
                setApellidos('');
                setDni('');
                setEmoji('🤡');
                handleClickEmoji();
            });
    };

    const handleClick = () => {
        if (showDNI) {
            setShowDNI(false);
        } else {
            setShowDNI(true);
        }
        setNombres('');
        setApellidos('');
        setDni('');
        setEstado(false);
    };

    //EMOJI
    const [visible, setVisible] = useState(false);
    const [emoji, setEmoji] = useState('');

    function handleClickEmoji() {
        setVisible(true);
        setTimeout(() => setVisible(false), 2000);
    }

    return (
        <div className="m-auto xl:w-6 lg:w-6 md:w-6 sm:w-6 w-9">
            {visible && (
                <div className="emoji absolute flex gap-1">{emoji}</div>
            )}
            <div className="flex flex-column bg-white border-round-lg p-4 gap-3">
                <p className="text-center">
                    {showDNI ? 'Consultar DNI' : 'Consultar RUC'} con Negan
                </p>
                <div className="flex gap-1 justify-content-between">
                    <InputNumber
                        className="w-full p-inputtext-sm"
                        useGrouping={false}
                        value={dni}
                        onValueChange={(e) => setDni(e.target.value)}
                    />
                    {showDNI ? (
                        <Button
                            className="xl:flex lg:flex md:flex sm:hidden hidden"
                            icon="pi pi-search"
                            onClick={buscarDNI}
                        />
                    ) : (
                        <Button
                            className="xl:flex lg:flex md:flex sm:hidden hidden"
                            icon="pi pi-search"
                            onClick={buscarRUC}
                        />
                    )}
                </div>

                {showDNI ? (
                    <Button
                        className="xl:hidden lg:hidden md:hidden sm:flex flex"
                        label="Consultar DNI"
                        icon="pi pi-search"
                        onClick={buscarDNI}
                    />
                ) : (
                    <Button
                        className="xl:hidden lg:hidden md:hidden sm:flex flex"
                        label="Consultar RUC"
                        icon="pi pi-search"
                        onClick={buscarRUC}
                    />
                )}
                <div className="flex flex-column gap-2 text-white text-xs">
                    {showDNI ? (
                        <>
                            <p
                                className={`bg-${
                                    estado ? `green` : `gray`
                                }-400 border-round-lg p-2`}
                            >
                                Nombres: {nombres}
                            </p>
                            <p
                                className={`bg-${
                                    estado ? `green` : `gray`
                                }-400 border-round-lg p-2`}
                            >
                                Apellidos: {apellidos}
                            </p>
                            <p
                                className={`bg-${
                                    estado ? `green` : `gray`
                                }-400 border-round-lg p-2`}
                            >
                                DNI: {dni}
                            </p>
                        </>
                    ) : (
                        <>
                            <p
                                className={`bg-${
                                    estado ? `green` : `gray`
                                }-400 border-round-lg p-2`}
                            >
                                Razón social: {nombres}
                            </p>
                            <p
                                className={`bg-${
                                    estado ? `green` : `gray`
                                }-400 border-round-lg p-2`}
                            >
                                Dirección: {apellidos}
                            </p>
                            <p
                                className={`bg-${
                                    estado ? `green` : `gray`
                                }-400 border-round-lg p-2`}
                            >
                                RUC: {dni}
                            </p>
                        </>
                    )}
                </div>

                <Button
                    className=""
                    label={showDNI ? 'Consultar RUC' : 'Consultar DNI'}
                    onClick={handleClick}
                />
            </div>
        </div>
    );
}
