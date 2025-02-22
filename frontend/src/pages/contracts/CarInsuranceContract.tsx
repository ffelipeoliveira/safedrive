import MetamaskHook from "../../hooks/MetamaskHook";
import Navbar from '../../components/navbar/NavBar';

import React, { useState } from 'react';
import axios from 'axios';

import { FaArrowRight } from "react-icons/fa";

import './CarInsuranceContract.css';


// Interface do formulário
interface FormData {
  nome: string;
  cpf: string;
  marca: string;
  modelo: string;
  ano: string;
  placa: string;
  valor: string;
  tipoSeguro: string;
}

function FormularioSegurado({ account } ) {
	const [formData, setFormData] = useState<FormData>({
	  nome: '',
	  cpf: '',
	  marca: '',
	  modelo: '',
	  ano: '',
	  placa: '',
	  valor: '',
	  tipoSeguro: 'completo',
	});

  const [status, setStatus] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const cadastrarSegurado = async () => {
	  if (!account) {
		setStatus('Conecte sua MetaMask antes de continuar.');
		return;
	  }
  
	  try {
		const response = await axios.post('http://localhost:3000/api/segurados', {
		  endereco: account,
		  nome: formData.nome,
		  documento: formData.cpf,
		  veiculo: {
			marca: formData.marca,
			modelo: formData.modelo,
			ano: formData.ano,
			placa: formData.placa,
			valor: formData.valor,
		  },
		  tipoSeguro: formData.tipoSeguro,
		});
		console.log(response);
		setStatus('Cadastrado com sucesso!');
	  } catch (error) {
		console.error('Erro ao cadastrar segurado:', error);
		setStatus('Erro: ' + error);
	  }
	};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    cadastrarSegurado(); 
  };

  return (
    <div className="form-horizontal insurance-form">
      {/*Title and message*/}
      <div className="title">
        <h3>FORMULÁRIO DO SEGURO</h3>
      </div>
      <form className="flex" onSubmit={handleSubmit}>
        {/*Fields*/}
        
        <div className="wrapper-right">
          {/* Vehicle Info */}
          <fieldset>
            <legend>Informações do Veículo</legend>
            <div className="input">
              <input className="input-field"
                type="text" 
                name="marca" 
                value={formData.marca} 
                onChange={handleChange} 
                required
              />
              <label className="input-label">Marca</label>
            </div>

            <div className="input">
              <input className="input-field"
                type="text" 
                name="modelo" 
                value={formData.modelo} 
                onChange={handleChange} 
                required
              />
              <label className="input-label">Modelo</label>
            </div>

            <div className="input">
              <input className="input-field"
                type="number"
                name="ano"
                value={formData.ano}
                onChange={handleChange}
                min="1900"
                max="2025"
                required
              />
              <label className="input-label">Ano de Fabricação</label>
            </div>

            <div className="input">
              <input className="input-field"
                type="text"
                name="placa"
                value={formData.placa}
                onChange={handleChange}
                pattern="[A-Z]{3}[0-9][A-Z][0-9]{2}"
                required
              />
              <label className="input-label">Placa</label>
            </div>

            <div className="input">
              <input className="input-field"
                type="number" 
                name="valor" 
                value={formData.valor} 
                onChange={handleChange} 
                step="0.01" 
                required 
              />
              <label className="input-label">Valor (R$)</label>
            </div>
          </fieldset>
        </div>

        <div className="wrapper-left">
          <fieldset>
            <legend>Proprietário</legend>
            
            <div className="input">
              <input className='input-field'
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
              <label className="input-label">Nome Completo</label>
            </div>

            <div className="input">
              <input className='input-field'
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                required
              />
              <label className="input-label">CPF</label>
            </div>
          </fieldset>

          {/* Insurance type */}
          <fieldset>
            <legend>Tipo do seguro</legend>
            <select className="select"
              tabIndex={1}
              name="tipoSeguro" 
              value={formData.tipoSeguro} 
              onChange={handleChange} 
              required
            >
              <option value="completo">Completo</option>
              <option value="roubo">Roubo/Furto</option>
              <option value="terceiros">Terceiros</option>
            </select>
          </fieldset>

          <div className="buttons">
            <button type="submit" className="button-oneline"><FaArrowRight className="oneline-icon"/></button>
          </div>
        </div>
      </form>
      <p className="status">{status}</p>
    </div>
  );
}

function CarInsurance() {
  const { account, isMetaMaskInstalled, connectMetaMask } = MetamaskHook();

  return (
    !isMetaMaskInstalled ? (
      <p>Por favor instale MetaMask.</p>
    ) : (
      <div>
        {account ? (
          <div>
            <iframe className="background" src="https://my.spline.design/untitled-e072489ddd620938751f5db77e7233f1/" width={100}></iframe>
            <Navbar/>
            <FormularioSegurado account={account}/>
            <button className="metamask connected" disabled>Conectado: {account} </button>
          </div>
        ) : (
          <div>
            <iframe className="background" src="https://my.spline.design/untitled-e072489ddd620938751f5db77e7233f1/" width={100}></iframe>
            <Navbar/>
            <FormularioSegurado account={account}/>
            <button className="metamask" onClick={connectMetaMask}>Conectar MetaMask</button>
          </div>
        )}
      </div>
    )
  );
};

export default CarInsurance;
