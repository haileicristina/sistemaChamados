
import firebase from '../../services/firebaseConfig';
import { AuthContext } from '../../contexts/auth';

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';


import { toast } from 'react-toastify';
import Header from '../../components/Header';
import Title from '../../components/Title';
import {FiPlusCircle } from 'react-icons/fi';
import './styles.css';


export default function NewCadastro() {

    const {id} = useParams();
    const history = useNavigate();
    

    const [loadCustomers, setLoadCustomers] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [customerSelected, setCustomerSelected] = useState(0);

    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [complemento, setComplemento] = useState('');
    const [idCustomer, setIdCustomer] = useState(false);

    const{user} = useContext(AuthContext);


    useEffect(() => {
        async function loadCustomers(){
            await firebase.firestore().collection('customers')
            .get()
            .then((snapshot) =>{
                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                })

                if(lista.length ===0){
                    console.log('NENHUMA EMPRESA ENCONTRADA');
                    setCustomers([{id: '1', nomeFantasia:'FREELA'}]);
                    setLoadCustomers(false);
                    return;
                }

                setCustomers(lista);
                setLoadCustomers(false);

                if(id){
                    loadId(lista)
                }
            })
            .catch((error) =>{
                console.error('ALGO DEU ERRADO', error);
                setLoadCustomers(false);
                setCustomers([{id: '1', nomeFantasia:''}]);
            })
        }
        loadCustomers();
    }, [id])


    async function loadId(lista){
        await firebase.firestore().collection('chamados').doc(id)
        .get()
        .then((snapshot) => {
            setAssunto(snapshot.data().assunto);
            setStatus(snapshot.data().status);
            setComplemento(snapshot.data().complemento);

            let index = lista.findIndex(item => item.id === snapshot.data().clienteId)
            setCustomerSelected(index);
            setIdCustomer(true);
        })
        .catch((error) => {
            console.log('Erro no Id passado', err);
            setIdCustomer(false);
        })
    }

    async function handleRegister(e){
        e.preventDefault();

        if(idCustomer){
            await firebase.firestore().collection('chamados')
            .doc(id)
            .update({
              //  cliente: customers[customerSelected].nomeFantasia,
                clienteId: customers[customerSelected].id,
                assunto,
                status,
                complemento,
                userId: user.uid
            })
            .then(() => {
                toast.success('Chamado editado com sucesso!');
                setCustomerSelected(0);
                setComplemento('');
                history('/dashboard');
                
            })
            .catch((err)=>{
                toast.error('Ops erro ao editar, favor tente mais tarde...');
                console.error(err);
            })

            return;
        }
       
        await firebase.firestore().collection('chamados')
        .add({
            created: new Date(),
            cliente: customers[customerSelected].nomeFantasia,
            clienteId: customers[customerSelected].id,
            assunto,
            status,
            complemento,
            userId: user.uid
        })
        .then(() => {
            toast.success('Chamado criado com sucesso')
            setComplemento('');
            setCustomerSelected(0);
            setAssunto('');
        })
        .catch((err) => {
            toast.error('Ops erro ao registrar, tente mais tarde')
            console.log(err)
        })
    }

    function handleChangeSelect(e){
        setAssunto(e.target.value);       
    }
    function handleOptionChange(e){
        setStatus(e.target.value);
    }

    //Chamado quando troca de cliente
    function handleChangeCustomers(e){
        setCustomerSelected(e.target.value);
    }
       
  return (
    <div>
        <Header />
        <div className='content-profile'>
            <Title name='Novo Chamado'>
                <FiPlusCircle size={25} />
            </Title>

            <div className="container-cadastro">
                <form className="form-cadastro" onSubmit={handleRegister}>
                    
                    <label style={{color:'#fff'}}>Cliente</label>
                    {loadCustomers ? (
                     <input type="text" disabled={true} value="Carregando clientes..." />
            ) : (
                <select value={customerSelected} onChange={handleChangeCustomers} >
                {customers.map((item, index) => {
                  return(
                    <option key={item.id} value={index} >
                      {item.nomeFantasia}
                    </option>
                  )
                })}
              </select>
            )}
                    

                    <label style={{color:'#fff'}}>Assunto</label>
                    <select value={assunto} onChange={handleChangeSelect}>
                        <option value='Suporte'>Suporte</option>
                        <option value='Visita Tecnica'>Visita Técnica</option>
                        <option value='Financeiro'>Financeiro</option>
                    </select>

                    <label style={{color:'#fff'}}>Status</label>
                   <div className="status" style={{color:'#fff'}}>
                    <input
                    type="radio"
                    name='radio'
                    value='Aberto'
                    onChange={handleOptionChange}
                    checked={status === 'Aberto'}
                    />
                    <strong>Em aberto</strong>

                    <input
                    type="radio"
                    name='radio'
                    value='Progresso'
                    onChange={handleOptionChange}
                    checked={status === 'Progresso'}
                    />
                    <strong>Em Progresso</strong>

                    <input
                    type="radio"
                    name='radio'
                    value='Atendido'
                    onChange={handleOptionChange}
                    checked= {status === 'Atendido'}
                    />
                    <strong>Atendido</strong>
                   </div>

                   <label>Complemento</label>
                   <textarea
                   type='text'
                   placeholder='Descreva seu problema (opcional)'                   
                   value={complemento}
                   onChange={(e) => setComplemento(e.target.value)}
                   />

                   <button className='registrar' type='submit'>Registrar</button>
                </form>
            </div>
        </div>
    </div>
  );
}