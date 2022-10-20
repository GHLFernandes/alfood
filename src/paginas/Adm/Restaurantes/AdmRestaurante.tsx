import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Container } from "@mui/material";
import { Box } from "@mui/system";
import { memo, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";
import FormRestaurante from "./FormRestaurante";

function AdmRestaurante() {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    useEffect(() => {
        http.get<IRestaurante[]>('restaurantes/')
        .then(res => setRestaurantes(res.data))
        .catch(err => console.log(err))
    }, [restaurantes]);

    const deletar = (restauranteDelete: IRestaurante) => {
        http.delete(`restaurantes/${restauranteDelete.id}/`)
        .then(() => {
            const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteDelete.id);
            setRestaurantes([...listaRestaurante]);
            alert('Restaurante deletado com sucesso!')
        })
        .catch((err) => console.log(err));
    }

  return (
    <Container>
        <FormRestaurante />
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography sx={{marginBottom: 2, marginTop: 5}} component='h2' variant='h6'>Lista de Restaurantes</Typography>
            <TableContainer sx={{ margin: '0 auto', width: 400}} component={Paper}>
                <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Restaurantes</TableCell>
                        <TableCell align="center">Ações</TableCell>
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
        </Box>
    </Container>
  )
}

export default memo(AdmRestaurante)