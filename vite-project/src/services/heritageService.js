import api from "./api";

// Espelha o enum HeritageTipes do backend para alimentar o select do formulário.
const heritageTypeOptions = [
    { value: "IMOVEL", label: "Imóvel" },
    { value: "VEICULO", label: "Veículo" },
    { value: "INVESTIMENTO", label: "Investimento" },
    { value: "JOIAS", label: "Joias" },
    { value: "ARTE", label: "Arte" },
    { value: "OUTROS", label: "Outros" }
];

// Expõe as opções do enum sem duplicar a lista nas páginas.
export const getHeritageTypeOptions = () => heritageTypeOptions;

// Cria um patrimônio usando o HeritageDTO aceito pelo backend.
export const createHeritage = async (payload) => {
    const response = await api.post("/heritages", payload);
    return response.data;
};
