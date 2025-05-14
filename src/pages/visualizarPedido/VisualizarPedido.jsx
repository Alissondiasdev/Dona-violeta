import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router";
import Mainlayout from "../../Componentes/Layout/Mainlayout";

import {
    Row,
    Col,
    Typography,
    Divider,
    Button,
    Space,
    Tag,
    Image
} from "antd";
import {
    PrinterOutlined,
    EyeOutlined,
    ShoppingOutlined
} from "@ant-design/icons";
import { buscarPedidoPorId } from "../../services/FireBaseService";

const { Title, Text } = Typography;

const VizualizarPedido = () => {
    const [pedido, setPedido] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const carregarPedido = async () => {
            const result = await buscarPedidoPorId(id); // PASSA o id aqui
            setPedido(result);
            console.log(result);
        };

        if (id) {
            carregarPedido(); // Agora não precisa passar o id aqui
        }
    }, [id]); // adiciona id como dependência

    if (!pedido) return <Mainlayout titulo="Visualizar Pedido"><p>Carregando pedido...</p></Mainlayout>;

    return (
        <Mainlayout titulo="Visualizar Pedido">
            {/* Cabeçalho com Ações */}
            <Row justify="space-between" align="middle" style={{ padding: 24 }}>
                <Title level={3}>Pedido #{pedido.id}</Title>
                <Space>
                    <NavLink to={`/pedidos/conferencia/${pedido.id}`}>
                        <Button type="primary" icon={<EyeOutlined />} size="large">
                            Conferir Pedido
                        </Button>
                    </NavLink>
                    <Button icon={<PrinterOutlined />} size="large">
                        Imprimir
                    </Button>
                </Space>
            </Row>

            {/* Dados Gerais do Pedido */}
            <Row gutter={[32, 16]} style={{ padding: "0 24px" }}>
                <Col xs={24} md={8}>
                    <Title level={5}>👤 Cliente</Title>
                    <Text>{pedido.nomeCliente}</Text><br />
                    <Text type="secondary">Telefone: {pedido.telefone}</Text>
                </Col>
                <Col xs={24} md={8}>
                    <Title level={5}>🏠 Endereço</Title>
                    <Text>Rua Exemplo, 123</Text><br />
                    <Text type="secondary">Bairro: Centro</Text>
                </Col>
                <Col xs={24} md={8}>
                    <Title level={5}>📅 Compra</Title>
                    <Text>Data: 11/05/2025</Text><br />
                    <Text type="secondary">Entrega: Retirar na loja</Text><br />
                    <Text type="secondary">Pagamento: Na retirada</Text>
                </Col>
            </Row>

            <Divider />

            {/* Informações financeiras */}
            <Row gutter={[32, 16]} style={{ padding: "0 24px" }}>
                <Col xs={24} md={8}>
                    <Title level={5}>💰 Valores</Title>
                    <Text>Subtotal: <strong>preço</strong></Text><br />
                    <Text>Custo: <strong>R$ 80,00</strong></Text><br />
                    <Text>Lucro: <strong>R$ 112,50</strong></Text>
                </Col>
                <Col xs={24} md={8}>
                    <Title level={5}>📦 Itens</Title>
                    <ul style={{ paddingLeft: 16 }}>
                        <li>nome - variação</li>
                    </ul>
                    <Text type="secondary">Total de Itens: 12</Text>
                </Col>
            </Row>

            <Divider />

            {/* Itens do Pedido com imagem */}
            <Row style={{ padding: "0 24px", marginBottom: 16 }}>
                <Title level={4}><ShoppingOutlined /> Itens do Pedido</Title>
            </Row>

            <Row gutter={[24, 24]} style={{ padding: "0 24px 48px" }}>
                <Col xs={24} sm={12} md={8}>
                    <div style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "center",
                        border: "1px solid #f0f0f0",
                        borderRadius: 12,
                        padding: 16,
                        background: "#fafafa",
                    }}>
                        <Image
                            src='{pedido.imagem}'
                            alt='{pedido.nome}'
                            width={80}
                            height={80}
                            style={{ objectFit: "cover", borderRadius: 8 }}
                            preview={false}
                        />
                        <div>
                            <Title level={5} style={{ margin: 0 }}>{pedido.itens.nome}</Title>
                            <Tag color="blue">variação</Tag><br />
                            <Text>Qtd: 12</Text><br />
                            <Text strong>12,50</Text>
                        </div>
                    </div>
                </Col>
            </Row>
        </Mainlayout>
    );
};

export default VizualizarPedido;
