import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import _ from 'lodash';

interface Training {
  date: string;
  duration: number;
  activity: string;
  customer: string;
}

const Statistics = () => {
  const [data, setData] = useState<Training[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings')
      .then(res => res.json())
      .then(trainings => {
        setData(trainings);
        const grouped = _.groupBy(trainings, 'activity');
        const summed = Object.keys(grouped).map(activity => ({
          activity,
          minutes: _.sumBy(grouped[activity], 'duration'),
        }));
        setChartData(summed);
      });
  }, []);

  return (
    <div>
      <h2>Training Minutes by Activity</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" />
          <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="minutes" fill="#fc6c85" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;
