import { axiosIntance } from "../config/axios.config";

const limit = (count: number, p: number) =>
  `limit=${count}&offset=${p ? p * count : 0}`;

export const PetRepository = {
  getByPage: (page: number) => axiosIntance.get(`/pets?${limit(10, page)}`),
  findPet: (id: number) => axiosIntance.get(`/pets/${id}`),
  savePet: (formValues: any) =>
    axiosIntance.post(`/pets`, { ...formValues, vaccines: [] }),
};
