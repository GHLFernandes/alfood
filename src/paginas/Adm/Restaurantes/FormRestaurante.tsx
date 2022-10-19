import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

function FormRestaurante() {
    
    const params = useParams();
    
    const [ nomeRestaurante, setNomeRestaurante ] = useState('');

    useEffect(() => {
        if(params.id){
            axios.get<IRestaurante>(`http://0.0.0.0:8000/api/v2/restaurantes/${params.id}/`)
            .then((res) => {
                console.log(res.data.nome)
                setNomeRestaurante(res.data.nome);
            })
            .catch((err) => console.log(err));
        }
    }, [params]);
    
    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(params.id){
            axios.put(`http://0.0.0.0:8000/api/v2/restaurantes/${params.id}/`, {
                nome: nomeRestaurante
            })
            .then(() => alert('Restaurante atualizado com sucesso!'))
            .catch((err) => console.log(err));
        }else{
            axios.post('http://0.0.0.0:8000/api/v2/restaurantes/', {
                nome:nomeRestaurante
            })
            .then(() => alert('Restaurante cadastrado com sucesso!'))
            .catch((err) => console.log(err));
            setNomeRestaurante('');
        }
    }

    return (
        <>
            <form onSubmit={submitForm}>
                <TextField 
                    value={nomeRestaurante} 
                    onChange={e => setNomeRestaurante(e.target.value)} 
                    id="standard-basic" 
                    label="Nome do Restaurante" 
                    variant="standard" 
                />
                <Button type='submit' variant="outlined">{params.id?'Editar':'Cadastrar'}</Button>
            </form>
        </>
    )
}

export default memo(FormRestaurante);
