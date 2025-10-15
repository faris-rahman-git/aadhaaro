import api from "@/configs/axios";
const PATH = "/ocr";

export const scanDocApi = async (formData: FormData) => {
  const res = await api.post(PATH + "/scandoc", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
