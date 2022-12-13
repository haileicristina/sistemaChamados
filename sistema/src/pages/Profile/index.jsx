import { useState, useContext } from 'react';

import firebase from '../../services/firebaseConfig';
import { AuthContext } from '../../contexts/auth';

import './styles.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';
import {Gear,UploadSimple } from "phosphor-react";

const Profile = () =>{
    const {user, signOut, setUser, storageUser} = useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);

    // preview da imagem de avatar
    function handleFile(e){

        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpg' || image.type === 'image/png'){
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(e.target.files[0]));
            }else{
                alert('Envie uma imagem do tipo PNG ou JPG');
                setImageAvatar(null);
                return null;
            }
        }      
       
    }

    //Envio para o firebase storage da iamgem do avatar
    async function handleUpload(){
        const currentUid = user.uid;
        const upLoadTask = await firebase.storage()
        .ref(`images/${currentUid}/${imageAvatar.name}`)
        .put(imageAvatar)
        .then(async() =>{
            console.log('FOTO enviada com SUCESSO')

            await firebase.storage().ref(`images/${currentUid}`)
            .child(imageAvatar.name).getDownloadURL()
            .then(async(url) =>{
                let urlFoto = url;

                await firebase.firestore().collection('users')
                .doc(user.id)
                .set({
                    avatarUrl: urlFoto,
                    nome: nome
                })
                .then(() => {
                    //altera os dados no context e no localStorage
                    let data = {
                        ...user,
                        avatarUrl: urlFoto,
                        nome: nome
                    };
                    setUser(data);
                    storageUser(data);
                    console.log(data)
                })
            })
        })
    }

    async function handleSave(e){
        e.preventDefault();
        if(imageAvatar === null && nome !== ''){
            await firebase.firestore().collection('users')
            .doc(user.uid)
            .update({
                nome: nome
            })
            .then(() => {
                let data = {
                    ...user,
                    nome: nome
                };
                setUser(data);
                storageUser(data);
                console.log(data);
            })
        }
        else if(nome !== '' && imageAvatar !== null){
            handleUpload()
        }
        
    }

    return(
        <div>
            <Header />
            <div className='content-profile'>
                <Title name='Meu perfil'>
                <Gear className='icon3' color="#fff" size={20} />
                </Title>
                <div className='container-profile'>
                    <form className='form-profile' onSubmit={handleSave}>
                        <label className='label-avatar'>
                            <span>
                            <UploadSimple color='#fff' size={32} />
                            </span>

                            <input type='file' accept='image/*' onChange={handleFile}/>
                            { avatarUrl === null ?
                                <img src={avatar} width='100%' height='100%' alt='avatar usuário'/>
                                :
                                <img src={avatarUrl} width='250' height='250' alt='avatar usuário'/>
                            }
                        </label>

                        <div className='label-nome'>
                        <label className='texto-label'>Nome</label>
                        <input className='dados' type='text' value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>

                        <div className='label-email'>
                        <label className='texto-label'>E-mail</label>
                        <input className='dados' type='text' value={email} disabled={true}  />
                        </div>
                        
                        <button className='bt-profile' type='submit'>Salvar</button>
                    </form>
                </div>
                <div className="container-botao">
                <button className='btn-sair' onClick={() => signOut()}>
                        Sair
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Profile