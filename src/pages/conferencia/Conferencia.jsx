import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Mainlayout from "../../Componentes/Layout/Mainlayout";
import {
  Typography,
  Row,
  Col,

  Button,
  Input,
  Space,
  Divider,
  Empty,
  Card,
} from "antd";
import {

  CheckOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const Conferencia = () => {
  const { id } = useParams();
  const [pedido, setPedido] = useState();

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




  return (
    <Mainlayout titulo={`Conferência do Pedido #${id}`}>


      <Space direction="vertical" size="large" style={{ width: "100%", padding: '16px' }}>
        <Input.Search
          placeholder="Clique aqui e escaneie o código de barras"
          enterButton="Separar"
          size="large"
        />


        <Row gutter={32}>
          {/* Não separados */}
          <Col span={12}>
            <Title level={4}>🛒 Produtos não separados </Title>

            <Empty description="Todos os produtos foram separados" />

          </Col>

          {/* Separados */}
          <Col span={12}>
            <Title level={4}>✅ Produtos separados</Title>
            <Empty description="Nenhum produto separado" />

            <Divider />

            <Button
              type="primary"
              icon={<CheckOutlined />}
              block
              size="large"
              style={{ borderRadius: 8 }}
            >
              Finalizar Conferência
            </Button>
          </Col>
        </Row>
      </Space>
    </Mainlayout>
  );
};

export default Conferencia;
