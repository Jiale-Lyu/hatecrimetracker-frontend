import moment from 'moment';
import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload[0] && payload[0].value) {
    return (
      <div className='recharts-custom-tooltip'>
        <span>{`${payload[0].value} cases`}</span>
      </div>
    )
  }

  return null
}

const SimpleBarChart = ({ warning, chart_data }) => {
  const formatXAxis = (tickVal) => { //yyyy-mm-dd to mm/dd/2021
    const d = moment(tickVal, "YYYY-MM-DD")
    return d.format("M/D/YY");
  }
  const [ticks, setTicks] = useState([]);
  useEffect(() => {
    const newTicks = [];
    for( let i = 0; i < chart_data.length; i++ ) {
      const d = moment(chart_data[i].key, "YYYY-MM-DD")
      if (d.date() == 1) {
        newTicks.push(chart_data[i].key);
      }
    }
    setTicks(newTicks);
  }, [chart_data]);
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle tag='h4'>United States Hate Crime Incident Count</CardTitle>
        </div>
      </CardHeader>

      <CardBody>
        <div className='recharts-wrapper'>
          <ResponsiveContainer>
            <BarChart height={300} data={chart_data}>
            <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey='key' tickFormatter={formatXAxis}  ticks={ticks} />
              <YAxis />
              <Tooltip />
              <Bar dataKey='value' stroke={warning} strokeWidth={3}  />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  )
}
export default SimpleBarChart