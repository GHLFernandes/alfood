import axios, { AxiosRequestConfig } from 'axios';
import { memo, useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import { IPaginacao } from '../../interfaces/IPaginacao';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { Button, Container, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';

interface IParametrosBusca {
  ordering?: string
  search?: string
};
const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ListaRestaurantes = () => {

  const [ restaurantes, setRestaurantes ] = useState<IRestaurante[]>([]);
  const [ proximaPagina, setProximaPagina] = useState('');
  const [ paginaAnterior, setPaginaAnterior] = useState('');

  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState('');

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {

    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(resposta => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch(erro => {
        console.log(erro);
      })
  }
  
  const buscar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const opcoes = {
      params: {

      } as IParametrosBusca
    };

    if (busca) {
      opcoes.params.search = busca;
    }

    if (ordenacao) {
      opcoes.params.ordering = ordenacao;
    }

    carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes);
  };
  
  useEffect(() => {
    carregarDados('http://localhost:8000/api/v1/restaurantes/');
  }, []);

  return (
    <Container>
      <section className={style.ListaRestaurantes}>
        <h1>Os restaurantes mais <em>bacanas</em>!</h1>
        <form onClick={buscar}>
        <TextField 
            value={busca} 
            onChange={e => setBusca(e.target.value)} 
            id="standard-basic" 
            label="Nome do Restaurante" 
            variant="standard" 
        />
        <Select sx={{height: 48, marginLeft: 3,  marginRight: 3}}
          displayEmpty
          name="select-ordenacao"
          id="select-ordenacao"
          value={ordenacao}
          input={<OutlinedInput />}
          onChange={e => setOrdenacao(e.target.value)}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Ordenação</em>;
            }

            return selected;
          }}
        >
          <MenuItem disabled value="">
            <em>Ordenação</em>
          </MenuItem>
          <MenuItem key={1} value="id">Por ID</MenuItem>
          <MenuItem key={2} value="nome">Por Nome</MenuItem>
        </Select>

        <Button type='submit' variant="outlined">Buscar</Button>
      </form>
        {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
        {
          <button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>
            Página Anterior
          </button>
        }
        {
          <button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>
            Próxima página
          </button>
        }
      </section>
    </Container>
  );

}

export default memo(ListaRestaurantes)