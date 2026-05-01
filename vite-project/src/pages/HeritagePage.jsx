import { useEffect, useState } from "react";
import {
    createHeritage,
    getHeritageTypeOptions
} from "../services/heritageService";
import { getUsers } from "../services/userService";

// Estado inicial baseado no HeritageDTO do backend.
const initialHeritageForm = {
    heritageTipes: "IMOVEL",
    name: "",
    price: "",
    enable: true,
    userId: ""
};

function HeritagePage({ navigate }) {
    // Mantém o formulário de patrimônio alinhado ao DTO usado pelo backend.
    const [formData, setFormData] = useState(initialHeritageForm);
    const [users, setUsers] = useState([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Carrega os usuários para popular o vínculo obrigatório do patrimônio.
        const loadUsers = async () => {
            try {
                const userList = await getUsers();
                setUsers(userList);
            } catch (error) {
                console.error("Erro ao carregar usuários:", error);
                alert("Não foi possível carregar os usuários para o patrimônio.");
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

    // Converte os campos para o formato esperado pelo HeritageDTO antes do envio.
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            await createHeritage({
                ...formData,
                price: Number(formData.price),
                userId: Number(formData.userId)
            });

            alert("Patrimônio criado com sucesso.");
            setFormData(initialHeritageForm);
        } catch (error) {
            console.error("Erro ao criar patrimônio:", error);
            alert("Não foi possível criar o patrimônio.");
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

                <h1>Cadastrar patrimônio</h1>
                <p className="lead">
                    Esta tela envia o `HeritageDTO` com tipo, nome, preço, status e usuário.
                </p>

                <form className="form-layout" onSubmit={handleSubmit}>
                    <label className="field">
                        <span>Tipo de patrimônio</span>
                        <select
                            name="heritageTipes"
                            value={formData.heritageTipes}
                            onChange={handleChange}
                            required
                        >
                            {getHeritageTypeOptions().map((option) => (
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
                            placeholder="Ex.: Apartamento centro"
                            required
                        />
                    </label>

                    <label className="field">
                        <span>Preço</span>
                        <input
                            name="price"
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.price}
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
                        <span>Patrimônio ativo</span>
                    </label>

                    <button
                        type="submit"
                        className="button button--primary button--full"
                        disabled={isSubmitting || isLoadingUsers || users.length === 0}
                    >
                        {isSubmitting ? "Salvando..." : "Criar patrimônio"}
                    </button>
                </form>
            </section>
        </main>
    );
}

export default HeritagePage;
