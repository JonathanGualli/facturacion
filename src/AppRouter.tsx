import { BrowserRouter, Navigate, Route } from "react-router-dom"
import { RoutesWithNotFound } from "./components/RoutersWithNotFound/RoutersWithNotFound"
import { AppRoutes } from "./models/routes.models"
import { PrivateGuard } from "./guard/PrivateGuard"
import { LoginPage } from "./pages/public/LoginPage/LoginPage"
import { PrivateRouter } from "./pages/private/PrivateRouter"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <RoutesWithNotFound>
                <Route path="/" element={<Navigate to={AppRoutes.private.root} />}/>
                <Route path={AppRoutes.login} element={<LoginPage />} />
                <Route element={< PrivateGuard />}>
                    <Route path={`${AppRoutes.private.root}/*`} element={<PrivateRouter/>}/>
                </ Route>
             </RoutesWithNotFound>
        </BrowserRouter>
    )
}