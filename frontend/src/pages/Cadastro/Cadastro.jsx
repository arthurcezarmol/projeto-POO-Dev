import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para redirecionar após o cadastro

import './Cadastro.css';

function Cadastro() {
    const navigate = useNavigate();

    // Estado único para guardar todos os campos do formulário
    const [formData, setFormData] = useState({
        nome: '',
        senha: '',
        idade: '',
        genero: '',
        cargo: '',
        renda: '',
        cidade: '',
        corporativa: ''
    });

    // Função genérica que atualiza qualquer campo que o usuário digitar
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita recarregar a página

        // Envia para o Backend
        axios.post('http://localhost:8080/api/registrar', formData)
            .then(response => {
                alert("Usuário cadastrado com sucesso!");
                // Redireciona o usuário para a tela de Login
                navigate('/login');
            })
            .catch(error => {
                console.error("Erro ao cadastrar:", error);
                alert("Erro ao cadastrar. Verifique se o nome já existe ou se os dados estão corretos.");
            });
    };

    return (
        <div className='containerOutside'>
            <div className='containerStyle'>
                <h2 className='titulo'>📝 Criar Nova Conta</h2>
                <form onSubmit={handleSubmit} className='formStyle'>
            
                    {/* Nome */}
                    <div className='inputGroupStyle'>
                        <label>Nome de Usuário:</label>
                        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className='inputStyle'/>
                    </div>

                    {/* Senha */}
                    <div className='inputGroupStyle'>
                        <label>Senha:</label>
                        <input type="password" name="senha" value={formData.senha} onChange={handleChange} required className='inputStyle'/>
                    </div>

                    {/* --- MUDANÇA AQUI: Usamos a classe 'form-row' em vez de style inline --- */}
                    <div className='form-row'>
                        <div className='inputGroupStyle'>
                            <label>Idade:</label>
                            <input type="number" name="idade" value={formData.idade} onChange={handleChange} required className='inputStyle'/>
                        </div>
                        <div className='inputGroupStyle'>
                            <label>Gênero:</label>
                            <select name="genero" value={formData.genero} onChange={handleChange} className='inputStyle'>
                                <option value="">Selecione...</option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>
                    </div>

                    {/* Cargo */}
                    <div className='inputGroupStyle'>
                        <label>Cargo:</label>
                        <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} className='inputStyle'/>
                    </div>

                    {/* Renda */}
                    <div className='inputGroupStyle'>
                        <label>Renda Mensal (R$):</label>
                        <input type="number" step="0.01" name="renda" value={formData.renda} onChange={handleChange} className='inputStyle'/>
                    </div>

                    {/* Cidade */}
                    <div className='inputGroupStyle'>
                        <label>Cidade:</label>
                        <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} className='inputStyle'/>
                    </div>

                    {/* Corporativa */}
                    <div className='inputGroupStyle'>
                        <label>Corporativa (Empresa/Associação):</label>
                        <input type="text" name="corporativa" value={formData.corporativa} onChange={handleChange} required className='inputStyle'/>
                    </div>

                    <button type="submit" className='buttonStyle'>Registrar-se</button>
                </form>
            </div>
        </div>
    );
}

export default Cadastro;