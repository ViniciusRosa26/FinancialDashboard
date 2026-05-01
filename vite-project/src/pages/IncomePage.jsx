import { useEffect, useState } from "react";
import {
    createIncome,
    getIncomeTypeOptions
} from "../services/incomeService.js";
import { getUsers } from "../services/userService";

// Estado inicial baseado no IncomeDTO do backend.
const initialIncomeForm = {
    incomeTipes: "SALARY",
    name: "",
    value: "",
    enable: true,
    userId: ""
};

function IncomePage({ navigate }) {
    // Mantém o formulário de renda alinhado ao DTO usado pelo backend.
    const [formData, setFormData] = useState(initialIncomeForm);
    const [users, setUsers] = useState([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Carrega os usuários para popular o vínculo obrigatório da renda.
        const loadUsers = async () => {
            try {
                const userList = await getUsers();
                setUsers(userList);
            } catch (error) {
                console.error("Erro ao carregar usuários:", error);
                alert("Não foi possível carregar os usuários para a renda.");
            } finally {
                setIsLoadingUsers(false);
            }
        };

        loadUsers();
    }, []);

    // Atualiza qualquer campo do formulário com tratamento especial para checkbox.
    const handleChange = ({ target }) => {
        const value = target.type === "checkbox" ? target.checked : target.value;

        setFormData((currentData) => ({
            ...currentData,
            [target.name]: value
        }));
    };

    // Converte os campos para o formato esperado pelo IncomeDTO antes do envio.
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await createIncome({
                ...formData,
                value: Number(formData.value),
                userId: Number(formData.userId)
            });

            alert("Renda criada com sucesso.");
            setFormData(initialIncomeForm);
        } catch (error) {
            console.error("Erro ao criar renda:", error);
            alert("Não foi possível criar a renda.");
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

                <h1>Cadastrar renda</h1>
                <p className="lead">
                    Preencha os campos abaixo para criar uma nova renda. Todos os campos são obrigatórios.
                </p>

                <form className="form-layout" onSubmit={handleSubmit}>
                    <label className="field">
                        <span>Tipo de Renda</span>
                        <select
                            name="incomeTipes"
                            value={formData.incomeTipes}
                            onChange={handleChange}
                            required
                        >
                            {getIncomeTypeOptions().map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="field">
                        <span>Nome</span>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ex.: Salario Empresa"
                            required
                        />
                    </label>

                    <label className="field">
                        <span>Valor</span>
                        <input
                            name="value"
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.value}
                            onChange={handleChange}
                            placeholder="0.00"
                            required
                        />
                    </label>

                    <label className="field">
                        <span>Usuário responsável</span>
                        <select
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            disabled={isLoadingUsers}
                            required
                        >
                            <option value="">
                                {isLoadingUsers ? "Carregando usuários..." : "Selecione um usuário"}
                            </option>

                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name} {user.lastName}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="checkbox-field">
                        <input
                            name="enable"
                            type="checkbox"
                            checked={formData.enable}
                            onChange={handleChange}
                        />
                        <span>Renda ativa</span>
                    </label>

                    <button
                        type="submit"
                        className="button button--primary button--full"
                        disabled={isSubmitting || isLoadingUsers || users.length === 0}
                    >
                        {isSubmitting ? "Salvando..." : "Criar renda"}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default IncomePage;
