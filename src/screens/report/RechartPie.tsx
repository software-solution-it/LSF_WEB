import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['rgba(123, 220, 181, 1)', 'rgba(247, 141, 167, 1)'];

interface RechartPieProps {
  totalExpenses: number;
  netProfit: number;
}

interface RechartPieState {
  hasData: boolean;
}

export default class RechartPie extends PureComponent<RechartPieProps, RechartPieState> {
  constructor(props: RechartPieProps) {
    super(props);
    this.state = {
      hasData: props.totalExpenses !== 0 || props.netProfit !== 0,
    };
  }

  componentDidUpdate(prevProps: RechartPieProps) {
    if (prevProps.totalExpenses !== this.props.totalExpenses || prevProps.netProfit !== this.props.netProfit) {
      this.setState({
        hasData: this.props.totalExpenses !== 0 || this.props.netProfit !== 0,
      });
    }
  }

  render() {
    const { totalExpenses, netProfit } = this.props;
    const { hasData } = this.state;

    const data = [
      { name: 'Despesas', value: totalExpenses },
      { name: 'Lucro Líquido', value: netProfit },
    ];

    if (!hasData) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '200px',
          height: '200px',
          backgroundColor: 'rgba(200, 200, 200, 0.5)',
          backdropFilter: 'blur(5px)',
          textAlign: 'center',
          margin: '20px',
          borderRadius: '10px',
        }}>
          <p>Sem dados disponíveis</p>
        </div>
      );
    }

    return (
      <PieChart width={250} height={200}>
        <Pie
          data={data}
          cx={80}
          cy={100}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  }
}
