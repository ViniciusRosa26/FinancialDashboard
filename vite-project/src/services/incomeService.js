import api from "./api";

// Espelha o enum incomeTipes do backend para alimentar o select do formulário.
const incomeTypeOptions = [
    { value: "SALARY", label: "Salario" },
    { value: "FREELANCE", label: "FreeLance" },
    { value: "ALUGUEL", label: "Aluguel" },
    { value: "BENEFICIOS", label: "Beneficios" },
    { value: "OUTROS", label: "Outros" }
];

// Expõe as opções do enum sem duplicar a lista nas páginas.
export const getIncomeTypeOptions = () => incomeTypeOptions;

// Cria um patrimônio usando o IncomeDTO aceito pelo backend.
export const createIncome = async (payload) => {
    const response = await api.post("/incomes", payload);
    return response.data;
};
