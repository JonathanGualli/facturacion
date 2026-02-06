import { Navigate, Route } from "react-router-dom";
import { PrivateLayout } from "../../components/Layout/PrivateLayout";
import { RoutesWithNotFound } from "../../components/RoutersWithNotFound/RoutersWithNotFound";
import { AppRoutes } from "../../models/routes.models";
import { DashboardPage } from "./DashboardPage/DashboardPage";
import { QuickStart } from "./QuickStart/QuickStart";
import { FacturasPage } from "./Facturas/FacturasPage";

export const PrivateRouter = () => {
    return (
        <PrivateLayout>
            <RoutesWithNotFound>
                <Route path="/" element={<Navigate to={AppRoutes.private.dashboard} />} />
                <Route path={AppRoutes.private.dashboard} element={<DashboardPage />} />
                <Route path={AppRoutes.private.quickStart} element={<QuickStart />} />
                <Route path={AppRoutes.private.facturas} element={<FacturasPage />}/>
            </RoutesWithNotFound>
        </PrivateLayout>
    );
}