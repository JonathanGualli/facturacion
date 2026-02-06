import {  Menu, Receipt } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../models/routes.models";
import { useEffect, useMemo, useState } from "react";
import logo from '../../assets/logo_lared.png';

interface Props {
    collapsed: boolean,
    toggle: () => void,
    isMobile: boolean,
}

interface handleButtonProps {
    value: string,
    path: string,
}

export const Sidebar = ({ collapsed, toggle, isMobile }: Props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [valueSelected, setValueSelected] = useState("");

    const items = useMemo(() => [
        /* { icon: <Rocket />, text: "Inicio Rápido", value: "quickStart", path: `${AppRoutes.private.root}/${AppRoutes.private.quickStart}` },
        { icon: <Home />, text: "Dashboard", value: "dashboard", path: `${AppRoutes.private.root}/${AppRoutes.private.dashboard}` }, */
        { icon: <Receipt/>, text: "Facturas", value: "facturas", path: `${AppRoutes.private.root}/${AppRoutes.private.facturas}`}
    ], []);

    const handleButton = ({ value, path }: handleButtonProps) => {
        setValueSelected(value);
        navigate(path);
    }

    useEffect(() => {
        const currentItem = items.find(item => location.pathname === item.path);
        if(currentItem) {
            setValueSelected(currentItem.value);
        }
    }, [location.pathname, items]); 

    return (
        <div
            className={`bg-white border-r shadow h-screen transition-all ${collapsed ? "w-15" : "w-58"}
                    ${isMobile ? "fixed top-0 left-0 z-50 h-full" : "relative"}
                    ${isMobile && collapsed ? "-translate-x-full" : "translate-x-0"}
                    duration-300
            `}>

            <div className="flex items-center justify-between p-2">
                {!collapsed && <span className="font-bold"><img src={logo} className="h-auto w-12"/></span>}
                <button onClick={toggle}>
                    <Menu size={20} />
                </button>
            </div>

            <nav className="mt-4">
                {items.map(({ icon, text, value, path }) => (
                    <SidebarItem
                        key={value}
                        icon={icon}
                        text={text}
                        collapsed={collapsed}
                        onTap={() => handleButton({ value, path })}
                        isSelected={valueSelected === value}
                    />
                ))}
            </nav>
        </div>
    );
};