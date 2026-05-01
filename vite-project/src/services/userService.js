import api from "./api";

// Cria um usuário usando o contrato do backend exposto em /users.
export const createUser = async (payload) => {
    const response = await api.post("/users", payload);
    return response.data;
};

// Lista usuários para uso em formulários e telas futuras.
export const getUsers = async () => {
    const response = await api.get("/users");
    return response.data;
};
