import api from "./api";

// Espelha o enum expenseTipes do backend para alimentar o select do formulário.
const expenseTypeOptions = [
    { value: "AGUA", label: "Agua" },
    { value: "LUZ", label: "Luz" },
    { value: "ALIMENTACAO", label: "Alimentacao" },
    { value: "IMPOSTO", label: "Imposto" },
    { value: "OUTROS", label: "Outros" }
];

// Expõe as opções do enum sem duplicar a lista nas páginas.
export const getExpenseTypeOptions = () => expenseTypeOptions;

// Cria uma despesa usando o ExpenseDTO aceito pelo backend.
export const createExpense = async (payload) => {
    const response = await api.post("/expenses", payload);
    return response.data;
};
