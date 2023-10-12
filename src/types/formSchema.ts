import { object, string } from "yup";

export const formValidSchema = object({
    email: string().required("Поле не может быть пустым").email("Некорректный e-mail"),
    name: string().required("Поле не может быть пустым").min(3, "Слишком короткое имя"),
    phone: string().required("Поле не может быть пустым").min(16, "Некорректный номер"),
    category: string().required("Поле не может быть пустым")
});