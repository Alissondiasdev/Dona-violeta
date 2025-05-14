
import { collection, addDoc, query, getDocs, where, doc, getDoc, updateDoc,deleteDoc   } from "firebase/firestore";
import { db } from "./Firebaseconfig"; // ajuste o caminho conforme seu projeto

export const buscarPedidos = async () => {
  try {
    const q = query(collection(db, "pedidos")); // Consulta à coleção "pedidos"
    const querySnapshot = await getDocs(q);

    const pedidos = [];
    querySnapshot.forEach((doc) => {
      pedidos.push({ id: doc.id, ...doc.data() });
    });

    return pedidos;
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    throw error;
  }
};




export const buscarPedidoPorId = async (id) => {
    try {
        // Acessa o documento com o id fornecido
        const pedidoRef = doc(db, "pedidos", id);
        const pedidoSnapshot = await getDoc(pedidoRef);

        // Verifica se o documento existe
        if (pedidoSnapshot.exists()) {
            const pedidoData = pedidoSnapshot.data();
            console.log(pedidoData)
            return {
                id: pedidoSnapshot.id,
                ...pedidoData,
            };
        } else {
            console.log("Eleitor não encontrado!");
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar eleitor:", error);
        return null;
    }
};