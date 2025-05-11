import {  useParams } from "react-router";
import Mainlayout from "../../Componentes/Layout/Mainlayout";




const VizualizarPedido = () => {
    const { id } = useParams();
    return (
        <Mainlayout titulo={"Visualizar Pedido"}>
            <h1>{id}</h1>
            

        </Mainlayout>
        
        
    );
}


export default VizualizarPedido;