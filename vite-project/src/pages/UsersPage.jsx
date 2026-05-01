import { useState } from "react";
import { createUser } from "../services/userService";

// Estado inicial usado para limpar o formulário sem duplicar estrutura.
const initialUserForm = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    enable: true
};

function UsersPage({ navigate }) {
    // Agrupa os campos do DTO de usuário em um único estado controlado.
    const [formData, setFormData] = useState(initialUserForm);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Atualiza qualquer campo textual ou booleano com a mesma função.
    const handleChange = ({ target }) => {
        const value = target.type === "checkbox" ? target.checked : target.value;

        setFormData((currentData) => ({
            ...currentData,
            [target.name]: value
        }));
    };

    // Envia o formulário para o backend e reseta a tela em caso de sucesso.
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await createUser(formData);
            alert("Usuário criado com sucesso.");
            setFormData(initialUserForm);
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            alert("Não foi possível criar o usuário.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="page-shell">
            <section className="card">
                <button
                    type="button"
                    className="button button--ghost"
                    onClick={() => navigate("/")}
                >
                    Voltar
                </button>

                <h1>Cadastrar usuário</h1>
                <p className="lead">
                    Esta tela envia o `UserDTO` para o endpoint `/users`.
                </p>

                <form className="form-layout" onSubmit={handleSubmit}>
                    <label className="field">
                        <span>Nome</span>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Informe o nome"
                            required
                        />
                    </label>

                    <label className="field">
                        <span>Sobrenome</span>
                        <input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Informe o sobrenome"
                            required
                        />
                    </label>

                    <label className="field">
                        <span>E-mail</span>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="email@dominio.com"
                            required
                        />
                    </label>

                    <label className="field">
                        <span>Senha</span>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Informe a senha"
                            required
                        />
                    </label>

                    <label className="checkbox-field">
                        <input
                            name="enable"
                            type="checkbox"
                            checked={formData.enable}
                            onChange={handleChange}
                        />
                        <span>Usuário ativo</span>
                    </label>

                    <button
                        type="submit"
                        className="button button--primary button--full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Salvando..." : "Criar usuário"}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default UsersPage;
