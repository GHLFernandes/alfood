import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

function FormRestaurante() {
    
    const params = useParams();
    
    const [ nomeRestaurante, setNomeRestaurante ] = useState('');

    useEffect(() => {
        if(params.id){
            http.get<IRestaurante>(`restaurantes/${params.id}/`)
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
            http.put(`restaurantes/${params.id}/`, {
                nome: nomeRestaurante
            })
            .then(() => alert('Restaurante atualizado com sucesso!'))
            .catch((err) => console.log(err));
        }else{
            http.post('restaurantes/', {
                nome:nomeRestaurante
            })
            .then(() => alert('Restaurante cadastrado com sucesso!'))
            .catch((err) => console.log(err));
            setNomeRestaurante('');
        }
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography sx={{marginBottom: 2}} component='h1' variant='h6'>{params.id?'Editar':'Cadastrar'} Restaurantes</Typography>
            <Box component='form' onSubmit={submitForm}>
                <TextField 
                    value={nomeRestaurante} 
                    onChange={e => setNomeRestaurante(e.target.value)} 
                    id="standard-basic" 
                    label="Nome do Restaurante" 
                    variant="standard" 
                    fullWidth
                    required
                />
                <Button sx={{marginTop: 1}} type='submit' variant="outlined"  fullWidth>{params.id?'Editar':'Cadastrar'}</Button>
            </Box>
        </Box>
    )
}

export default memo(FormRestaurante);
