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

const { Title, Text } = Typography;

const VizualizarPedido = () => {
    const { id } = useParams();
    const [pedido, setPedido] = useState(null);

    useEffect(() => {
        // Simulação de dados
        const itens = [
            {
                id: '12458784',
                nome: 'Roberta aquino',
                variacao: 'Código P000',
                imagem: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                preco: 'R$ 192,50',
                quantidade: 1,
            },
            {
                id: '89521457',
                nome: 'Geovana fontenele',
                variacao: 'Código P001',
                imagem: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                preco: 'R$ 192,50',
                quantidade: 1,
            },
        ];

        const encontrado = itens.find(p => p.id === id);
        setPedido(encontrado);
    }, [id]);

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
                    <Text>{pedido.nome}</Text><br />
                    <Text type="secondary">Telefone: (85) 99999-9999</Text>
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
                    <Text>Subtotal: <strong>{pedido.preco}</strong></Text><br />
                    <Text>Custo: <strong>R$ 80,00</strong></Text><br />
                    <Text>Lucro: <strong>R$ 112,50</strong></Text>
                </Col>
                <Col xs={24} md={8}>
                    <Title level={5}>📦 Itens</Title>
                    <ul style={{ paddingLeft: 16 }}>
                        <li>{pedido.nome} - {pedido.variacao}</li>
                    </ul>
                    <Text type="secondary">Total de Itens: {pedido.quantidade}</Text>
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
                            src={pedido.imagem}
                            alt={pedido.nome}
                            width={80}
                            height={80}
                            style={{ objectFit: "cover", borderRadius: 8 }}
                            preview={false}
                        />
                        <div>
                            <Title level={5} style={{ margin: 0 }}>{pedido.nome}</Title>
                            <Tag color="blue">{pedido.variacao}</Tag><br />
                            <Text>Qtd: {pedido.quantidade}</Text><br />
                            <Text strong>{pedido.preco}</Text>
                        </div>
                    </div>
                </Col>
            </Row>
        </Mainlayout>
    );
};

export default VizualizarPedido;
