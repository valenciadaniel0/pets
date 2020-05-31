import { axiosInstance } from "../config/axios.config";

const limit = (count: number, p: number) =>
  `limit=${count}&offset=${p ? p * count : 0}`;

export const PetRepository = {
  getByPage: (page: number) => axiosInstance.get(`/pets?${limit(10, page)}`),
  findPet: (id: number) => axiosInstance.get(`/pets/${id}`),
  savePet: (formValues: any) =>
    axiosInstance.post(`/pets`, { ...formValues, vaccines: [] }),
  deletePet: (id: number) => axiosInstance.delete(`/pets/${id}`),
};
