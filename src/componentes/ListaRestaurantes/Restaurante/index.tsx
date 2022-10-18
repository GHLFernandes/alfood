import axios from 'axios';
import { useEffect, useState } from 'react';
import IPrato from '../../../interfaces/IPrato';
import IRestaurante from '../../../interfaces/IRestaurante';
import Prato from '../Prato';
import estilos from './Restaurante.module.scss';

interface RestauranteProps {
  restaurante: IRestaurante
}

const Restaurante = ({ restaurante }: RestauranteProps) => {

  const [ pratos, setPratos ] = useState<IPrato[]>();
  const [ proximaPagina, setProximaPagina] = useState('');

  useEffect(() => {
    axios.get<IPrato[]>(`http://0.0.0.0:8000/api/v1/restaurantes/${restaurante.id}/pratos/`)
      .then((resp) => {
        console.log(resp.data);
        setPratos(resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [restaurante.id]);

  return (<section className={estilos.Restaurante}>
    <div className={estilos.Titulo}>
      <h2>{restaurante.nome}</h2>
    </div>
    <div>
      {pratos?.map(item => <Prato prato={item} key={item.id} />)}
    </div>
  </section>)
}

export default Restaurante