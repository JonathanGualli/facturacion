import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/api.service"

export const useLogin = () => {

    return useMutation({
        mutationFn: ({ email, password, companyId }: { email: string, password: string, companyId?: number }) => loginService(email, password, companyId),
    });
}