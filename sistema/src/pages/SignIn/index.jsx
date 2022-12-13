import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './signIn.css';
import logo from '../../assets/logo.png';
import {GoogleLogo, Envelope, LockKey, Eye} from 'phosphor-react';
import { AuthContext } from "../../contexts/auth";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn, loadingAuth} = useContext(AuthContext);

  const handleSubmit = (e) =>{
    e.preventDefault();
   if(email !== '' && password !== ''){
      signIn(email, password);
      setEmail('');
      setPassword('');
   }
    
  }
    return (
      <div className='container-center' >
        <div className='logo-sistema'>
         <img src={logo} alt='logo-sistema' />
         <h2>Faça seu Login <br/> no sistema</h2>
         
         </div>
         
        <div className='login'>
          <div className='logo-area'>           
          </div>

          <form onSubmit={handleSubmit}>
          <Envelope className='envelope' size={20} />
          <LockKey className='cadeado' size={20} />
          <Eye className='eye'size={20} />
          <input type='text' placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='Senha*' value={password} onChange={(e) => setPassword(e.target.value)}  />
          <button type='submit'>{loadingAuth ? 'Carregando... ': 'Logar'}</button>
          </form>

          <Link className='register' to='/register'>Não tem uma conta? <strong> Registre-se</strong></Link>
        <span className='auth'>
        <GoogleLogo className='google' size={25} /> Logar com Google
          </span>
        </div>
      </div>
    )
  }
  
  export default SignIn