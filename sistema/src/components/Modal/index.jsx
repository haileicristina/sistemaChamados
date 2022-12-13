import './styles.css';
import { FiX } from 'react-icons/fi';

export default function Modal({conteudo, close}){
    return(
        <div className='modal'>
           <div className="container">
                <button className='closed' onClick={close}>
                    <FiX size={23} color='fff' />
                    Voltar
                </button>

                <div>
                    <h2>Detalhes do Chamado</h2>

                    <div className="row">
                        <strong>
                            Cliente: <i>{conteudo.cliente}</i>
                        </strong>
                    </div> 

                    <div className="row">
                        <strong>
                            Assunto: <i>{conteudo.assunto}</i>
                        </strong>
                        <strong>
                           Cadastrado em: <i>{conteudo.createdFormated}</i>
                        </strong>
                    </div> 

                    <div className="row">
                        <strong>
                            Status: <i style={{color: '#111' , backgroundColor: conteudo.status === 'Aberto' ? '#EBBE23': 'rgb(74, 20, 140)'}}>{conteudo.status}</i>
                        </strong>
                    </div> 

                    {conteudo.complemento !== '' && (
                        <>
                        <h3>Complemento</h3>
                        <p>{conteudo.complemento}</p>
                        </>
                    )}

                </div>

                
           </div>
        </div>
    )
}