
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "../pages/login/Login";
import Painel from "../pages/painel/Painel";


import Produtos from "../pages/produtos/Produtos";
import Pedidos from "../pages/Pedidos/Pedidos";
import Clientes from "../pages/clientes/Clientes";
import Configuracao from "../pages/configuracao/Configuracao";
import Home from "../pages/home/Home";
import VizualizarPedido from "../pages/visualizarPedido/VisualizarPedido";






const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/painel" element={<Painel />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/pedidos" element={<Pedidos />} />
                <Route path="/pedidos/:id" element={<VizualizarPedido />} />
                <Route path="/clientes" element={<Clientes />} />
                <Route path="/configuracao" element={<Configuracao />} />
                
            
            </Routes>
        </BrowserRouter>

    );
}

export default AppRoutes;