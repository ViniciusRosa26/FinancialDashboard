import { useEffect, useState } from "react";
import {
    createExpense,
    getExpenseTypeOptions
} from "../services/expenseService.js";
import { getUsers } from "../services/userService";

// Estado inicial baseado no ExpenseDTO do backend.
const initialExpenseForm = {
    expenseTipes: "AGUA",
    name: "",
    value: "",
    enable: true,
    userId: ""
};

function ExpensePage({ navigate }) {
    // Mantém o formulário de despesa alinhado ao DTO usado pelo backend.
    const [formData, setFormData] = useState(initialExpenseForm);
    const [users, setUsers] = useState([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Carrega os usuários para popular o vínculo obrigatório da despesa.
        const loadUsers = async () => {
            try {
                const userList = await getUsers();
                setUsers(userList);
            } catch (error) {
                console.error("Erro ao carregar usuários:", error);
                alert("Não foi possível carregar os usuários para a despesa.");
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

    // Converte os campos para o formato esperado pelo ExpenseDTO antes do envio.
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await createExpense({
                ...formData,
                value: Number(formData.value),
                userId: Number(formData.userId)
            });

            alert("Despesa criada com sucesso.");
            setFormData(initialExpenseForm);
        } catch (error) {
            console.error("Erro ao criar despesa:", error);
            alert("Não foi possível criar a despesa.");
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

                <h1>Cadastrar despesa</h1>
                <p className="lead">
                    Preencha os campos abaixo para criar uma nova despesa. Todos os campos são obrigatórios.
                </p>

                <form className="form-layout" onSubmit={handleSubmit}>
                    <label className="field">
                        <span>Tipo de despesa</span>
                        <select
                            name="expenseTipes"
                            value={formData.expenseTipes}
                            onChange={handleChange}
                            required
                        >
                            {getExpenseTypeOptions().map((option) => (
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
                            placeholder="Ex.: Conta de energia matriz"
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
                        <span>Despesa ativa</span>
                    </label>

                    <button
                        type="submit"
                        className="button button--primary button--full"
                        disabled={isSubmitting || isLoadingUsers || users.length === 0}
                    >
                        {isSubmitting ? "Salvando..." : "Criar despesa"}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default ExpensePage;
