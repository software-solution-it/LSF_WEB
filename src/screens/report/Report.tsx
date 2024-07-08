import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '../../components/Menu';
import userService from '../../services/userService';
import { User } from '../../interface/userInterface';
import productService from '../../services/productService';
import Rechart from './Rechart';
import RechartPie from './RechartPie';
import salesService from '../../services/salesService';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, differenceInCalendarDays } from 'date-fns';
import { SalesReport } from '../../interface/salesInterface';
import DatePicker, { registerLocale } from "react-datepicker";
import '../home/home.css';
import 'react-datepicker/dist/react-datepicker.css'
import loadingGif from '../../assets/loadingnew.gif';
import { ptBR } from 'date-fns/locale';
registerLocale('pt-BR', ptBR);
const Report: React.FC = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<User | any>(null);
    const [refresh, setRefresh] = useState(false);
    const [currentDate, setCurrentDate] = useState<any>(new Date());
    const [salesData, setSalesData] = useState<SalesReport[] | null>(null)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);;
    const [daysCount, setDaysCount] = useState(0);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [maxWashDate, setMaxWashDate] = useState<string | null>(null);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [netProfit, setNetProfit] = useState(0);
    const [todayCycles, setTodayCycles] = useState(0);
    const [todayEarnings, setTodayEarnings] = useState(0);
    const [date, setDate] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await userService.getCurrentUser();
                if (userResponse) {
                    setCurrentUser(userResponse.user);
                    await fetchSalesData(currentDate);
                } else {
                    navigate('/login');
                }
            } catch (e) {
                navigate('/login');
            }
        };

        fetchData();
    }, [navigate, currentDate, refresh]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            handleUpload(event.target.files[0])
        }
    };

    const handleUpload = async (file: any) => {
        setMessage('');
        if (file) {
            try {
                setLoading(true);
                await salesService.createSales(file);
                setMessage('Arquivo importado com sucesso!');
                setRefresh(!refresh);
                setLoading(false);
            } catch (e) {
                console.error('File upload failed', e);
                setMessage('Falha ao importar o arquivo.');
                setLoading(false);
            }
        }
    };

    const fetchSalesData = async (date: Date) => {
        setLoading(true);
        const startDate = format(startOfMonth(date), 'yyyy-MM-dd');
        const endDate = format(endOfMonth(date), 'yyyy-MM-dd');
        const data = await salesService.getSales(startDate, endDate);
        setSalesData(data);

        if (data && data.length > 0) {
            const salesStartDate = data.reduce((min:any, p:any) => new Date(p.sellDate) < min ? new Date(p.sellDate) : min, new Date(data[0].sellDate));
            const salesEndDate = data.reduce((max:any, p:any) => new Date(p.sellDate) > max ? new Date(p.sellDate) : max, new Date(data[0].sellDate));
            setStartDate(salesStartDate);
            setEndDate(salesEndDate);
            setDaysCount(differenceInCalendarDays(salesEndDate, salesStartDate) + 1);

            const dateCounts = data.reduce((acc:any, item:any) => {
                const date = item.sellDate.slice(0, 10); // Mantém apenas a parte da data
                acc[date] = (acc[date] || 0) + 1;
                return acc;
            }, {});

            const maxWashDateString = Object.keys(dateCounts).reduce((max, date) => dateCounts[date] > dateCounts[max] ? date : max, Object.keys(dateCounts)[0]);
            setMaxWashDate(maxWashDateString);

            // Calculando o total dos ganhos, despesas e lucro líquido
            const total = data.reduce((sum:any, item:any) => sum + item.value, 0);
            const expenses = data.reduce((sum:any, item:any) => sum + (item.valueWithNoDiscount || 0), 0);
            const netProfit = total - expenses;

            setTotalEarnings(total);
            setTotalExpenses(expenses);
            setNetProfit(netProfit);

            // Calculando informações do dia atual
            const today = format(date, 'yyyy-MM-dd');
            const todayData = data.filter((item:any) => item.sellDate.startsWith(today));
            const todayCycles = todayData.length;
            const todayEarnings = todayData.reduce((sum:any, item:any) => sum + item.value, 0);

            setTodayCycles(todayCycles);
            setTodayEarnings(todayEarnings);
            setLoading(false);
        } else {
            setStartDate(null);
            setEndDate(null);
            setDaysCount(0);
            setMaxWashDate(null);
            setTotalEarnings(0);
            setTotalExpenses(0);
            setNetProfit(0);
            setTodayCycles(0);
            setTodayEarnings(0);
            setLoading(false);
        }
    };

    const handleDateChange = async (date: any) => {
        setCurrentDate(date);
        await fetchSalesData(date);
    };

    const handlePreviousMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const handleButtonClick = () => {
            document.getElementById('fileInput')?.click();
    };

    return (
        <div>
            {salesData ?
            <>
                      <Menu user={currentUser} projectId={currentUser?.projects[0]?.id} setRefresh={setRefresh} menuProject={true} />
                <main className="main-content">
                    <div className='w-75 mb-3' style={{ marginTop: 100 }}>
                        <div className="d-flex w-100 justify-content-between">
                            <h3>Relatório de vendas</h3>
                            <div>
                                <input
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={handleFileChange}
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={handleButtonClick}
                                    disabled={loading}
                                >
                                    Importar arquivo
                                </button>
                            </div>
                        </div>
                    </div>
                    {message && (
                        <div className={`alert ${message.includes('sucesso') ? 'alert-success' : 'alert-danger'}`} role="alert">
                            {message}
                        </div>
                    )}
                    <div className='w-75'>
                        <div className="project-info-report mb-3 row px-5 mx-1">
                            <div className="col-12 d-flex justify-content-between">
                                <span style={{ cursor: 'pointer' }} className='d-flex justify-content-center align-items-center' onClick={handlePreviousMonth}><i className="fa-solid fa-arrow-left"></i></span>
    <div className="datepicker-container">
    <DatePicker 
      dateFormat="dd/MM/yyyy" 
      locale="pt-BR" 
      todayButton="Hoje" 
      selected={currentDate} 
      onChange={(date) => handleDateChange(date)} 
      customInput={<CustomInput />} // Adicione um input personalizado
    />
    <i style={{cursor:'pointer'}} className="fas fa-calendar-alt datepicker-icon"></i>
  </div>
                                <span style={{ cursor: 'pointer' }} className='d-flex justify-content-center align-items-center' onClick={handleNextMonth}><i className="fa-solid fa-arrow-right"></i></span>
                            </div>
                        </div>
                        {loading ? (
                            <div className="mt-5 h-100 loading-spinner d-flex justify-content-center align-items-center">
                                <img style={{ width: 250 }} src={loadingGif} alt="Loading" className="loading-gif" />
                            </div>
                        ) : (
                            salesData ?
                                <div className='d-flex'>
                                    <div className='me-4'>
                                        <div className='d-flex'>
                                            <div className='col mb-3 me-2'>
                                                <div className='bg-white p-3'>
                                                    <h3>{daysCount} dias</h3>
                                                    <p>Desde {startDate ? format(startDate, 'dd/MM/yyyy') : format(new Date(), 'dd/MM/yyyy')}</p>
                                                </div>
                                            </div>
                                            <div className='col mb-3 ms-2 '>
                                                <div className='bg-white p-3'>
                                                    <h3>{salesData?.length} ciclos</h3>
                                                    <p>Recorde em: {maxWashDate ? maxWashDate : format(new Date(), 'dd/MM/yyyy')}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>
                                                <div style={{ minWidth: 475, maxWidth: 475 }} className='bg-white p-4'>
                                                    <h3>Receitas do mês</h3>
                                                    <div className='d-flex mb-4'>
                                                        <div>
                                                            <RechartPie totalExpenses={totalExpenses} netProfit={netProfit} />
                                                        </div>
                                                        <div className='d-flex justify-content-end align-items-center w-100 me-4'>
                                                            <div className='flex-column'>
                                                                <div className=''>
                                                                    <p className='mb-1' style={{ color: 'rgba(0, 1, 78, 1)', fontSize: 24, fontWeight: 'bold' }}>R$ {totalEarnings.toFixed(2)}</p>
                                                                </div>
                                                                <div>
                                                                    <p style={{ color: 'rgba(0, 1, 78, 1)', fontSize: 16 }} className='text-end'>Total receitas</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex justify-content-between'>
                                                        <div className='d-flex'>
                                                            <div className='mt-1 me-2' style={{ width: 15, height: 15, backgroundColor: 'rgba(247, 141, 167, 1)', borderRadius: 5 }}></div>
                                                            <p className='me-1'>Despesas</p>
                                                            <p className='ms-1'>{((totalExpenses - totalEarnings) * 100).toFixed(2)}%</p>
                                                        </div>
                                                        <div className='d-flex'>
                                                            <p className='me-1'>R$ {(totalExpenses - totalEarnings).toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex justify-content-between'>
                                                        <div className='d-flex'>
                                                            <div className='mt-1 me-2' style={{ width: 15, height: 15, backgroundColor: 'rgba(123, 220, 181, 1)', borderRadius: 5 }}></div>
                                                            <p className='me-1 text-center'>Lucro Líquido</p>
                                                            <p className='ms-1 text-center'>{totalExpenses ? ((totalExpenses / totalEarnings) * 100).toFixed(2) : 0}%</p>
                                                        </div>
                                                        <div className='d-flex'>
                                                            <p className='me-1'>R$ {((totalEarnings)).toFixed(2)}%</p>
                                                        </div>
                                                    </div>
                                                    <div style={{ borderRadius: 5, backgroundColor: 'rgba(142, 209, 252, 1)' }} className='row justify-content-center align-items-center py-1'>
                                                        <div className='col-auto'>
                                                            <span style={{ fontWeight: 'bold' }} className='me-2'>Margem de lucro</span>
                                                        </div>
                                                        <div className='col-auto'>
                                                            <span style={{ fontWeight: 'bold' }}>{totalExpenses ? ((totalExpenses / totalEarnings) * 100).toFixed(2) : 0}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row my-4'>
                                            <div className='col'>
                                                <div style={{ minWidth: 475, maxWidth: 475 }} className='bg-white p-4'>
                                                    <h3 className='mb-4'>Informações do dia</h3>
                                                    <div className='d-flex justify-content-between'>
                                                        <div>
                                                            <p className='me-1'>Ciclos pagos</p>
                                                        </div>
                                                        <div className='d-flex justify-content-center align-items-center' style={{ backgroundColor: 'rgba(123, 220, 181, 1)', width: 100, height: 30 }}>
                                                            <span className=''>{todayCycles}</span>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex justify-content-between'>
                                                        <div className=''>
                                                            <p className='me-1'>Recebimentos</p>
                                                        </div>
                                                        <div className='d-flex justify-content-center align-items-center' style={{ backgroundColor: 'rgba(123, 220, 181, 1)', width: 100, height: 30 }}>
                                                            <span className='text-center'>R$ {todayEarnings.toFixed(2)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-100'>
                                        <div className='row mb-4'>
                                            <div className='col'>
                                                <div className='bg-white p-4'>
                                                    <div className='my-3 row' style={{ height: 500 }}>
                                                        <Rechart salesData={salesData} selectedDate={currentDate} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row mb-5'>
                                            <div className='col'>
                                                <div className='bg-white p-4'>
                                                    <h3 className='mb-4'>Informações gerais</h3>
                                                    <div className='row'>
                                                        <div className='d-flex justify-content-between'>
                                                            <p className=''>Total de ciclos pagos</p>
                                                            <p className='me-5'>{salesData?.length}</p>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='d-flex justify-content-between'>
                                                            <p className=''>Total de despesas</p>
                                                            <p className='me-5'>R$ {totalExpenses.toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='d-flex justify-content-between'>
                                                            <p className=''>Média de ciclos completos</p>
                                                            <p className='me-5'>{daysCount ? (salesData!.length / daysCount).toFixed(2) : 0}</p>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='d-flex justify-content-between'>
                                                            <p className=''>Média de faturamento</p>
                                                            <p className='me-5'>R$ {totalEarnings ? (totalEarnings / daysCount).toFixed(2) : 0}</p>
                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className='d-flex justify-content-between'>
                                                            <p className=''>Ticket médio/ciclo</p>
                                                            <p className='me-5'>R$ {(totalEarnings / (salesData?.length || 1)).toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='d-flex justify-content-between'>
                                                            <p className=''>Previsão 30 dias</p>
                                                            <p className='me-5'>R$ {daysCount ? (totalEarnings / daysCount * 30).toFixed(2) : 0}</p>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='d-flex justify-content-between'>
                                                            <p className=''>Quantidade de clientes</p>
                                                            <p className='me-5'>{salesData?.filter((value, index, self) => self.findIndex(v => v.nameClient === value.nameClient) === index).length}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : <></>
                        )}
                    </div>
                    
                </main>
                </>
                : <></>}
        </div>
    );
};

const CustomInput = React.forwardRef(({ value, onClick }:any, ref) => (
    <input
      value={value}
      onClick={onClick}
      readOnly
      style={{ cursor: 'pointer', width: '100%' }}
    />
  ));

export default Report;
