import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { memo, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import FormRestaurante from "./FormRestaurante";

function AdmRestaurante() {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
        axios.get<IRestaurante[]>('http://0.0.0.0:8000/api/v2/restaurantes/')
        .then(res => setRestaurantes(res.data))
        .catch(err => console.log(err))
    }, [restaurantes]);

    const deletar = (restauranteDelete: IRestaurante) => {
        axios.delete(`http://0.0.0.0:8000/api/v2/restaurantes/${restauranteDelete.id}/`)
        .then(() => {
            const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteDelete.id);
            setRestaurantes([...listaRestaurante]);
            alert('Restaurante deletado com sucesso!')
        })
        .catch((err) => console.log(err));
    }

  return (
    <>
        <div>AdmRestaurante</div>
        <FormRestaurante />
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell align="left">Restaurantes</TableCell>
                    <TableCell align="left">Ações</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {restaurantes.map((restaurante) => (
                    <TableRow
                        key={restaurante.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">{restaurante.nome}</TableCell>
                    <TableCell>
                        [ <Button variant="text" color="error"><Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link></Button> ]
                        [ <Button variant="text" color="error" onClick={() => deletar(restaurante)}>Deletar</Button>]
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
  )
}

export default memo(AdmRestaurante)