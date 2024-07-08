import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SalesReport } from '../../interface/salesInterface';
import { format, subDays } from 'date-fns';

const Example = ({ salesData, selectedDate }: any) => {
  const [last7DaysData, setLast7DaysData] = React.useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        generateLast7DaysData(salesData, selectedDate);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [salesData, selectedDate]);

  const generateLast7DaysData = (data: SalesReport[] | null, endDate: Date) => {
    const daysData = [];
    for (let i = 30; i >= 0; i--) {
      const currentDate = subDays(endDate, i);
      const formattedDate = format(currentDate, 'dd/MM/yyyy');
      const dayData = {
        name: formattedDate,
        faturamento: 0,
      };
      if (data) {
        data.forEach(item => {
          if (format(new Date(item.sellDate), 'dd/MM/yyyy') === formattedDate) {
            dayData.faturamento += item.value;
          }
        });
      }
      daysData.push(dayData);
    }
    setLast7DaysData(daysData);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const currentDate = payload[0].payload.name;
      const cycles = salesData.filter((item:any) => format(new Date(item.sellDate), 'dd/MM/yyyy') === currentDate).length;

      return (
        <div className="custom-tooltip p-3" style={{width:200, height:130, backgroundColor:'white', borderColor:'gray', border:'2px solid', borderRadius:5}}>
          <p className="label" style={{fontWeight:'bold'}}>{`Data: ${label}`}</p>
          <p className="intro" style={{fontWeight:'bold'}}>{`Faturamento: R$${payload[0].value}`}</p>
          <p className="desc" style={{fontWeight:'bold'}}>{`Ciclos: ${cycles}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={last7DaysData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="faturamento" fill="rgba(0, 1, 78, 1)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Example;
