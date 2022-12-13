import { useContext, useState } from "react";
import './styles.css';
import { AuthContext } from "../../contexts/auth";
import avatar from '../../assets/avatar.png';
import { Link } from "react-router-dom";
import { UserCircle, PhoneCall, Gear } from "phosphor-react";
 const Header = () =>{
    const {user} = useContext(AuthContext);
    const [sidebar, setSideBar] = useState(false);
    const showSidebar = () => setSideBar(!sidebar);
    
   
    return(
        
        <div className='sidebar-show'
        onMouseOver={() => showSidebar}>
        <span className="nome">Joana</span>
       {showSidebar &&
           <div className="container">
           
           <div className ='avatar'>
            <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt='avatar'/>
           </div>
           
            <div className='icones'>
            
           <Link to='/dashboard'>
            <div className='bt-icone1'>
           <PhoneCall className='icon1' color="#fff" size={20} />
           <span>Chamados</span>
           </div>
           </Link>

           <Link to='/customers'>
           <div className='bt-icone2'>
           <UserCircle className='icon2' color="#fff" size={20} />
           <span>Clientes</span>
           </div>
           </Link>

           <Link to='/profile'>
           <div className='bt-icone3'>
           <Gear className='icon3' color="#fff" size={20} />
          <span>Configurações</span>
          </div>
           </Link>
           </div>
           </div>
         
         }
        </div>
    )
}
export default Header