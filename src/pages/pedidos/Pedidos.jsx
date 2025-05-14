import { Link, NavLink, useLocation, useNavigate } from 'react-router';

import { useEffect, useState } from 'react';
import Mainlayout from '../../Componentes/Layout/Mainlayout';
import { buscarPedidos } from '../../services/FireBaseService';
import {
    Space, Table, Col, Modal, Button, Input, Row, Tooltip,
    Form,
    Dropdown,
    message, Tabs
} from 'antd';

import {
    EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined,
    DownOutlined,
    FileExcelOutlined,
    SettingOutlined,
    FilterOutlined,

} from '@ant-design/icons';



const Pedidos = () => {
    const location = useLocation();
    const [mostrarBuscaAvancada, setMostrarBuscaAvancada] = useState(false);
    const [pedidos, setPedidos] = useState('')
    
    
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idParaExcluir, setIdParaExcluir] = useState(null);

    useEffect(() => {
  const carregarPedidos = async () => {
    const result = await buscarPedidos();
    setPedidos(result);
    // Aqui você pode atualizar um estado se quiser exibir os pedidos
  };

  carregarPedidos(); // Executa a função uma vez ao montar o componente
}, []);





    const toggleBuscacavancada = () => {
        setMostrarBuscaAvancada(!mostrarBuscaAvancada);

    }
    

    const handleOk = () => {
        excluirEleitor(idParaExcluir);
        setIsModalOpen(false);
        setIdParaExcluir(null);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIdParaExcluir(null);
    };




    const items = [
        {
            label: (
                <Link to='/importar_cadastro'>
                    Importar de uma planilha
                </Link>

            ),
            icon: <FileExcelOutlined style={{ color: 'green' }} />,
            key: '0',
        },
        {
            label: (
                <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
                    Exportar cadastro
                </a>

            ),
            icon: <FileExcelOutlined style={{ color: 'green' }} />,
            key: '1',
        },
        {
            label: (
                <a href="https://docs.google.com/spreadsheets/d/1jhyx3i0mXYM-v6HRI2lEjBCus9vXIFq-PH2L81_e0tw/export?format=xlsx" target="_blank" rel="noopener noreferrer">
                    Baixar modelo de importação
                </a>

            ),
            icon: <FileExcelOutlined style={{ color: 'green' }} />,
            key: '2',
        },

    ];

    const onChange = key => {
        console.log(key);
    };
    const itemfiltro = [
        {
            key: '1',
            label: 'Todos',

        },
        {
            key: '2',
            label: 'Realizados',

        },
        {
            key: '3',
            label: 'Pagos',

        },
        {
            key: '4',
            label: 'Em separação',

        },
        {
            key: '5',
            label: 'Separados',

        },
        {
            key: '6',
            label: 'Despachados',

        },
    ];




    const columns = [
        {
            title: 'Código',
            dataIndex: 'clienteId',
            key: 'clienteId',
        },
        {
            title: 'Data',
            dataIndex: 'dataPedido',
            key: 'dataPedido',
        },
        {
            title: 'Nome cliente',
            dataIndex: 'nomeCliente',
            key: 'nomeCliente',
        },
        {
            title: 'Whatsapp',
            dataIndex: 'telefone',
            key: 'telefone',
        },
        {
            title: 'Entrega',
            dataIndex: 'formaEntrega',
            key: 'formaEntrega',
        },
        {
            title: 'Pagamento',
            dataIndex: 'formaPagamento',
            key: 'formaPagamento',
        },
         {
            title: 'Subtotal',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
       
        


        {
            title: 'Ações',
            key: 'acoes',

            render: (_, record) => (
                <Space >

                    <Tooltip title="Ver pedido">
                        <NavLink to={`/pedidos/${record.id}`}>
                            <Button icon={<SearchOutlined />} type="primary" size="small" />
                        </NavLink>
                    </Tooltip>
                    <Tooltip title="Editar">
                        <NavLink to={`/cadastroeleitor/${record.id}`}>
                            <Button icon={<EditOutlined />} type="primary" size="small" style={{ backgroundColor: '#faad14', borderColor: '#faad14' }} />
                        </NavLink>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <Button
                            icon={<DeleteOutlined />}
                            danger
                            size="small"
                            type="primary"
                            onClick={() => {
                                setIsModalOpen(true);
                                setIdParaExcluir(record.id);

                            }}
                        />
                    </Tooltip>


                </Space>
            ),
        },
    ];
    
    return (
        <Mainlayout titulo="Pedidos">


            <Row style={{ padding: '16px' }} gutter={[0, 16]}>
                {/* Linha dos botões e input */}
                <Col span={24}>
                    <Space wrap>
                        <Button >Hoje</Button>
                        <Button>Ontem</Button>
                        <Button>Últimos 7 dias</Button>
                        <Button>Últimos 30 dias</Button>

                        

                        <Button
                            onClick={toggleBuscacavancada}
                            type="primary"
                            icon={<FilterOutlined />}
                        >
                            Filtrar pedidos
                        </Button>
                    </Space>
                </Col>

                {/* Linha dos Tabs */}
                <Col span={24}>
                    <style>
                        {`.ant-tabs-tab { border-left: 2px solid #1890ff !important; padding: 0 16px !important; }`}
                    </style>
                    <Tabs defaultActiveKey="1" items={itemfiltro} onChange={onChange} />
                </Col>
            </Row>
            {mostrarBuscaAvancada && (

                <Form layout="vertical" style={{ padding: '16px', }}>
                    <Row
                        gutter={[16, 16]}
                        style={{
                            borderRadius: '8px', border: '1px solid #d9d9d9', padding: '16px', marginLeft: 0,
                            marginRight: 0, backgroundColor: '#fff'
                        }}>


                        <Col span={8}>
                            <Form.Item name="buscarporcodigo" label="Código">
                                <Input 
                                    onChange={(e) => setBuscaTitulo(e.target.value)} />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item name="buscarpornome" label="Nome">
                                <Input 
                                    onChange={(e) => setBuscaNome(e.target.value)} />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item name="buscargrupo" label="Grupo">
                                <Input 
                                    />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Space>

                                <Button type="primary" htmlType="submit">
                                    Buscar

                                </Button>

                                <Button httptype="primary" htmlType="submit">
                                    Limpar

                                </Button>
                            </Space>
                        </Col>

                    </Row>


                </Form>
            )}







            <Table
                columns={columns}
                dataSource={pedidos}
                rowKey="key"
                pagination={{ pageSize: 10 }}
                bordered
            />

            <Modal
                open={isModalOpen}
                title="Confirmar exclusão"
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Sim"
                cancelText="Não"
            >
                Tem certeza que deseja excluir este eleitor?
            </Modal>
        </Mainlayout>
    );
};

export default Pedidos;
