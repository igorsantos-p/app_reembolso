import axios, { AxiosError } from "axios"
type ApiErrorResponse = {
    message?: string;
    status?: string;
}

export interface CustomAxiosError extends AxiosError<ApiErrorResponse> {
    messageFriendly?: string;
}

export const api = axios.create({
    baseURL: "http://localhost:3333"
})

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: CustomAxiosError) => {
        let mensagemAmigavel = "Ocorreu um erro inesperado. Tente novamente mais tarde.";

        if (error.response) {
            const status = error.response.status;
            const data = error.response.data;
            
            if (status === 500) {
                mensagemAmigavel = "Erro interno no servidor. Nossa equipe já foi notificada.";
            } else if (data && data.message) {
                mensagemAmigavel = data.message;
            }
        } else if (error.request) {
            mensagemAmigavel = "Não foi possível conectar ao servidor. Verifique sua conexão.";
        }

        error.messageFriendly = mensagemAmigavel;

        return Promise.reject(error);
    }
);
