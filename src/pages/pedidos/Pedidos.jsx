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
import { Link, NavLink, useLocation, useNavigate } from 'react-router';

import { useState } from 'react';
import Mainlayout from '../../Componentes/Layout/Mainlayout';



const Pedidos = () => {
    const location = useLocation();
    const [mostrarBuscaAvancada, setMostrarBuscaAvancada] = useState(false);
    const [buscaNome, setBuscaNome] = useState('');
    const [buscaTitulo, setBuscaTitulo] = useState('');
    const [buscaApoiador, setBuscaApoiador] = useState('');
    const liderancaSelecionada = location.state?.liderancaSelecionada || null;
    const [eleitores, setEleitores] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idParaExcluir, setIdParaExcluir] = useState(null);



    const pedidos = [
        { key: '0',id:'12458784', codigo: 'P000', data: '12/08/2005', nome: 'Roberta aquino', watzapp: '85991-535026', entrega: 'Retirar na loja', pagamento: 'Pagamento na retirada', subtotal: 'R$ 192,50', valor: 39.90, status: 'Separando' },

    
        { key: '1',id:'89521457', codigo: 'P001', data: '12/08/2005', nome: 'Geovana fontenele', watzapp: '85991-535026', entrega: 'Retirar na loja', pagamento: 'Pagamento na retirada', subtotal: 'R$ 192,50', valor: 39.90, status: 'Separando' },

        // ... demais produtos
    ]



    const toggleBuscacavancada = () => {
        setMostrarBuscaAvancada(!mostrarBuscaAvancada);

    }
    const excluirEleitor = async (id) => {
        const resultado = await deletarEleitor(id);

        if (resultado.sucesso) {
            message.success(resultado.mensagem || "Eleitor excluído com sucesso.");
            await carregarLiderancas(); // Atualiza a lista
        } else {
            message.error(resultado.mensagem || "Erro ao excluir o eleitor.");
        }
    };

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
            dataIndex: 'codigo',
            key: 'codigo',
        },
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Watzapp',
            dataIndex: 'watzapp',
            key: 'watzapp',

        },
        {
            title: 'Entrega',
            dataIndex: 'entrega',
            key: 'entrega',

        },
        {
            title: 'Pagamento',
            dataIndex: 'pagamento',
            key: 'pagamento',

        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal',
            key: 'subtotal',

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
    const dadosFiltrados = eleitores.filter(item =>
        item.nome.toLowerCase().includes(buscaNome.toLowerCase()) &&
        item.titulo.toLowerCase().includes(buscaTitulo.toLowerCase()) &&
        item.bairro.toLowerCase().includes(buscaApoiador.toLowerCase())
    );

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
                                <Input value={buscaTitulo}
                                    onChange={(e) => setBuscaTitulo(e.target.value)} />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item name="buscarpornome" label="Nome">
                                <Input value={buscaNome}
                                    onChange={(e) => setBuscaNome(e.target.value)} />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item name="buscargrupo" label="Grupo">
                                <Input value={buscaApoiador}
                                    onChange={(e) => setBuscaApoiador(e.target.value)} />
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
