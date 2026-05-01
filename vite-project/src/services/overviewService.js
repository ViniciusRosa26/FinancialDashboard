import api from "./api";

export const getOverviewByUserId = async (userId) => {
    const response = await api.get(`/overviews/${userId}`);
    return response.data;
};
