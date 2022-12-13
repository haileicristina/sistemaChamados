import Title from '../../components/Title';
import Header from '../../components/Header';

import firebase from '../../services/firebaseConfig';

import './styles.css';
import {FiUser} from 'react-icons/fi';
import { useState } from 'react';
import {toast} from 'react-toastify';

export default function Customers(){

    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    async function handleAdd(e){
        e.preventDefault();
        if(nomeFantasia !== '' && cnpj !== '' && endereco !== ''){
            await firebase.firestore().collection('customers')
            .add({
                nomeFantasia: nomeFantasia,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(() => {
                setNomeFantasia('');
                setCnpj('');
                setEndereco('');
                toast.info('Empresa cadastrada com sucesso!')
            })
            .catch((error) => {
                console.log(error);
                toast.error('Erro ao cadastrar essa empresa.')
            })
        } else{
            toast.error('Preencha todos os campos!');
        }
    }
    return(
        <div>
            <Header />
            
            <div className="content-profile">
                <Title name="Clientes">
                    <FiUser size={25} color="#fff" />
                </Title>

                <div className="container-customers">
                   <form className="form-customers" onSubmit={handleAdd}>

                    <div className='label-nomeFantasia'>
                    <label className='texto-label'>Nome Fantasia</label>
                    <input className='dados-customers nomeFantasia' type="text"
                    value={nomeFantasia}
                    placeholder='Nome Fantasia'
                    onChange={(e)=>{setNomeFantasia(e.target.value)}} />
                    </div>

                    <div className='label-cnpj'>
                    <label className='texto-label'>CNPJ</label>
                    <input className='dados-customers cnpj'type='text'
                    value={cnpj}
                    placeholder='xxx.xxx.xxx-xx'
                    onChange={(e)=>{setCnpj(e.target.value)}} />
                    </div>

                    <div className="label-endereco">
                    <label className='texto-label'>Endereço</label>
                    <input className='dados-customers endereco'type="text"
                    value={endereco}
                    placeholder='Digite endereço da empresa'
                    onChange={(e)=>{setEndereco(e.target.value)}} />
                   </div>

                   <button className='bt-customers' type='submit'>Cadastrar</button>
                   
                   </form>
                </div>
            </div>
        </div>
    )
}