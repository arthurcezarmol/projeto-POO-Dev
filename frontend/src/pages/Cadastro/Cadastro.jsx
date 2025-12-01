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
        <div style={containerStyle}>
            <h2>📝 Criar Nova Conta</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                
                {/* Nome */}
                <div style={inputGroupStyle}>
                    <label>Nome de Usuário:</label>
                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} required style={inputStyle}/>
                </div>

                {/* Senha */}
                <div style={inputGroupStyle}>
                    <label>Senha:</label>
                    <input type="password" name="senha" value={formData.senha} onChange={handleChange} required style={inputStyle}/>
                </div>

                {/* Idade e Gênero (lado a lado) */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={inputGroupStyle}>
                        <label>Idade:</label>
                        <input type="number" name="idade" value={formData.idade} onChange={handleChange} required style={inputStyle}/>
                    </div>
                    <div style={inputGroupStyle}>
                        <label>Gênero:</label>
                        <select name="genero" value={formData.genero} onChange={handleChange} style={inputStyle}>
                            <option value="">Selecione...</option>
                            <option value="M">Masculino</option>
                            <option value="F">Feminino</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>
                </div>

                {/* Cargo e Renda */}
                <div style={inputGroupStyle}>
                    <label>Cargo:</label>
                    <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} style={inputStyle}/>
                </div>
                <div style={inputGroupStyle}>
                    <label>Renda Mensal (R$):</label>
                    <input type="number" step="0.01" name="renda" value={formData.renda} onChange={handleChange} style={inputStyle}/>
                </div>

                {/* Cidade e Corporativa */}
                <div style={inputGroupStyle}>
                    <label>Cidade:</label>
                    <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} style={inputStyle}/>
                </div>
                <div style={inputGroupStyle}>
                    <label>Corporativa (Empresa/Associação):</label>
                    <input type="text" name="corporativa" value={formData.corporativa} onChange={handleChange} required style={inputStyle}/>
                </div>

                <button type="submit" style={buttonStyle}>Registrar-se</button>
            </form>
        </div>
    );
}

// --- Estilos Simples (CSS in JS) ---
const containerStyle = {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif'
};

const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column', textAlign: 'left', width: '100%' };
const inputStyle = { padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '5px' };
const buttonStyle = { padding: '12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' };

export default Cadastro;