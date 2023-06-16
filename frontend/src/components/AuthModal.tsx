import {  register } from '../services/APIServices'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthModal () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate()

  function handleRegister (e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      //message to say password must match
    } else {
      try{
        register(email,password).then((res) => {
          if(res.username) {
            navigate('/dashboard')
          } else {
            //flash a message saying failed
          }
        })
      } catch(e) {
        console.log('OMEGA LUL your function failed')
      }
    }
  }
}

export default AuthModal