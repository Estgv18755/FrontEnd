import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import logo from '../../images/Logo_Softinsa.png';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import '../../scss/LoginPage.scss';
import { Link, Navigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = "https://softinsa.herokuapp.com";

function Login(SetUser, ...rest) {

  const[loggedIn,SetloggedIn] = useState(false);
  const[email,SetEmail] = useState("");
  const[passe,SetPasse] = useState("")

    if(loggedIn){
      <Navigate to="/home/dasboard"/>
    }else{
      return(
          <Container fluid className='Login'>
            <Row >
              <Col className='d-flex justify-content-center col-12'>
                  <Link to='/'><Image src={logo} className="logo_Login"/></Link>
              </Col>
            </Row>
            <Row>
              <Col className='d-flex justify-content-center col-12 '>
                <p className='Login'>Insira as suas credenciais</p>
              </Col>
              <Col className='d-flex justify-content-center'>
                <hr className='linha' />
              </Col>
            </Row>
            <Row>
              <Col className='d-flex justify-content-center col-12'>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>E-mail</Form.Label>
                      <Form.Control type="email" placeholder="Insira o seu e-mail" className='inputLogin rounded' value={email} onChange={(value)=>SetEmail(value.target.value)}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" className='inputLogin rounded' value={passe} onChange={
                        (value)=>SetPasse(value.target.value)}/>
                    </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row className='my-3'>
              <Col className='d-flex justify-content-center'>
                <Button variant="primary" size="lg" type="submit" className='py-0 px-5' onClick={()=>onLogin()}>
                      Login
                  </Button>
              </Col>
            </Row>
          </Container>)
    }

    function onLogin(){
      if (email==="") {
          alert("Insira um email!")
      }
      else if (passe==="") {
          alert("Insira uma palavra passe!")
      }
      else{
        const data={
          email: email,
          password: passe
        }
        const url = baseUrl + "utilizadores/login"
        axios.post(url,data)
        .then(response=>{
            if(response.data.sucesso){
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('id',response.data.id);
              localStorage.setItem('centro', response.data.centro);
              SetloggedIn(true)
              SetUser(response.data.data)
              Swal.fire(
                  'Sucesso!',
                  'Log in feito com sucesso',
                  'success'
              );
              <Navigate to="/home/dasboard" />
            }else{
              Swal.fire(
                    'Oops..Não foi possível fazer o log in!',
                    'Dados inválidos',
                    'error'
                )
            }
        })
        .catch(error=>{
          alert("Erro: "+error)
        })
      }    
    }
}

export default Login