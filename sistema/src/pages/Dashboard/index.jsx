import {useState, useEffect } from "react";


import Header from '../../components/Header';
import Title from '../../components/Title';
import Modal from "../../components/Modal";

import './styles.css';
import {FiMessageSquare, FiPlus, FiPlusCircle, FiSearch, FiEdit2} from 'react-icons/fi';

import { Link } from "react-router-dom";
import firebase from '../../services/firebaseConfig';
import { format } from "date-fns";

const Dashboard = () =>{
    
    const [chamados, setChamados] = useState([]);
    const[loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();
    const [showPostModal, setShowPostModal] = useState(false);
    const [detail, setDetail] = useState();
    const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc')


   

    async function updateState(snapshot){
        const isCollectionEmpty = snapshot.size === 0;

        if(!isCollectionEmpty){
            let list = [];

            snapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created:doc.data().created,
                    createdFormated:format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento
                })
            })

            const lastDoc = snapshot.docs[snapshot.docs.length -1]; //pegando o último documento buscado
            setChamados(chamados => [chamados, ...list]);
            setLastDocs(lastDoc);
        }else{
            setIsEmpty(true);
        }
        setLoadingMore(false);
    }
    async function loadChamados(){
        await listRef.limit(5)
        .get()
        .then((snapshot) => {
            updateState(snapshot)
        })
        .catch((error)=>{
            console.log('Deu um erro: ', error)
            setLoadingMore(false)
        })
        setLoading(false)
    }
   

    useEffect(() => {

        loadChamados()

        return () => {

        }
    },[])

    async function handleMore(){
        setLoadingMore(true);
        await listRef.startAfter(lastDocs).limit(5)
        .get()
        .then((snapshot) => {
            updateState(snapshot)
        })
    }

    function togglePostModal(item){
       setShowPostModal(!showPostModal);
       setDetail(item);
    }

    if(loading){
        return(
            <div>
                <Header />
                <div className="content-profile">
                    <Title name='Atendimentos'>
                        <FiMessageSquare size={25} />
                    </Title>
                    <div className="container">
                        <strong style={{color: '#111'}}>Buscando chamados...</strong>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div>
            <Header />
            <div className="content-profile">
                <Title name='Atendimentos'>
                    <FiMessageSquare size={25} color='#fff' />
                </Title>

                {chamados.length === 0 ? (
                    
                    <div className="container dashboard">
                        <span>Nenhum chamado registrado...</span>

                        <Link to='/new' className='new'>
                            <FiPlus size={25}/>
                                Novo Chamado
                        </Link>
                    </div>
                ) : (

                   <>
                    <Link to='/new' className='new'>
                        <FiPlus size={25}/>
                            Novo Chamado
                    </Link>

                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Cliente</th>
                                <th scope="col">Assunto</th>
                                <th scope="col">Cadastro em</th>
                                <th scope="col">Status</th>
                                <th scope="col">#</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {chamados.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <td data-label='Cliente'>{item.cliente}</td>
                                        <td data-label='Assunto'>{item.assunto}</td>
                                        
                                        <td data-label='Cadastrado'>{item.createdFormated}</td>
                                        
                                        <td data-label='Status'>
                                            <span
                                            className='badge'
                                            style={{backgroundColor: item.status === 'Aberto' ? '#EBBE23' : '#0C1D9E'}}
                                            >
                                                {item.status}
                                            </span>
                                        </td>

                                        <td data-label='#'>
                                        <button className="action"
                                        style={{backgroundColor:' #9D109E'}}
                                        onClick={() => togglePostModal(item) }
                                        >
                                                <FiSearch size={18} color='#fff'/>
                                        </button>

                                        <Link className="action" style={{backgroundColor:'#4A148C'}} to={`/new/${item.id}`}>
                                                <FiEdit2 size={18} color='#fff'/> 
                                        </Link>

                                        </td>
                                
                                    </tr>
                                )
                            })}
                            
                        </tbody>
                    </table>

                    {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15}}>Buscando dados...</h3>}

                      {  !loadingMore && !isEmpty &&
                        <div className="bt-mais" onClick={handleMore}>
                        <FiPlusCircle size={25} />
                        <strong className="plus">Mais Chamados</strong>
                        </div>
                      }
                    </>  
                )}
             
            </div>
           
           {showPostModal && (
                <Modal
                    conteudo={detail}
                    close={togglePostModal}
                />
           )}
          
        </div>
        
    )
}
export default Dashboard