import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import { IPaginacao } from '../../interfaces/IPaginacao';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { Button, TextField } from '@mui/material';

interface IParametrosBusca {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {

  const [ restaurantes, setRestaurantes ] = useState<IRestaurante[]>([]);
  const [ proximaPagina, setProximaPagina] = useState('');
  const [ paginaAnterior, setPaginaAnterior] = useState('');
  const [ busca, setBusca] = useState('');


  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(res => {
        setRestaurantes(res.data.results)
        setProximaPagina(res.data.next)
        setPaginaAnterior(res.data.previous)
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  useEffect(() => {
    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const opcoes = {
      params: {

      } as IParametrosBusca
    }
    if (busca) {
      opcoes.params.search = busca
    }
    carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes)
  }

  return (
    <>
         <form onSubmit={submitForm}>
                <TextField 
                    value={busca} 
                    onChange={e => setBusca(e.target.value)} 
                    id="standard-basic" 
                    label="Nome do Restaurante" 
                    variant="standard" 
                />
                <Button type='submit' variant="outlined">Buscar</Button>
            </form>

      <section className={style.ListaRestaurantes}>
        <h1>Os restaurantes mais <em>bacanas</em>!</h1>
        {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
        {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>
          Página Anterior
        </button>}
        {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>
        Próxima página
        </button>}
      </section>
    </>
  )

}

export default ListaRestaurantes