import { axiosInstance } from "../config/axios.config";

const limit = (count: number, p: number) =>
  `limit=${count}&offset=${p ? p * count : 0}`;

export const VaccineRepository = {
  getByPage: (page: number, petId: number) =>
    axiosInstance.get(`/vaccines?${limit(10, page)}&petId=${petId}`),
  saveVaccine: (formValues: any) => axiosInstance.post(`/vaccines`, formValues),
  deleteVaccine:(id:number) => axiosInstance.delete(`/vaccines/${id}`)
};
