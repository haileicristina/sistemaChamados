import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './signUp.css';
import logo from '../../assets/logo.png';
import {IdentificationBadge, Envelope, LockKey, Eye} from 'phosphor-react';
import {AuthContext} from '../../contexts/auth';


function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {cadastrarUser, loadingAuth} = useContext(AuthContext);

  const handleSubmit = (e) =>{
    e.preventDefault();
   if(nome !== '' && email !== '' && password !== ''){
    cadastrarUser(email, password, nome)
   }
    setNome('');
    setEmail('');
    setPassword('');
  }
    return (
      <div className='container-center-cadastro' >
        <div className='logo-sistema-cadastro'>
                
         </div>
         
        <div className='login-cadastro'>
          <div className='logo-area-cadastro'> 
          <img src={logo} alt='logo-sistema-cadastro' />
          <h2>Cadastro</h2>          
          </div>

          <form onSubmit={handleSubmit}>
          <IdentificationBadge className='identify' size={20} />
          <Envelope className='envelope-cadastro' size={20} />
          <LockKey className='cadeado-cadastro' size={20} />
          <Eye className='eye-cadastro'size={20} />
          <input type='text' placeholder='Nome Completo' value={nome} onChange={(e) => setNome(e.target.value)} />
          <input type='text' placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='Senha*' value={password} onChange={(e) => setPassword(e.target.value)}  />
          <button className='button-cadastro'type='submit'>{loadingAuth ? 'Carregando... ': 'Cadastrar'}</button>
          </form>

          <Link className='cadastro' to='/'>Já tem uma conta? <strong> Entrar</strong></Link>
          </div>
      </div>
    )
  }
  
  export default SignUp