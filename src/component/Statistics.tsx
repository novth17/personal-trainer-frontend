import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import _ from 'lodash';
import { fetchTrainingsWithCustomers } from '../utils/fetch';

const Statistics = () => {
  const [chartData, setChartData] = useState<any[]>([]);

/*   fetch the trainings from the backend
  and group them by activity by groupBy
  sum the duration of each activity by sumBy */
  useEffect(() => {
    fetchTrainingsWithCustomers()
      .then(trainings => {
        const grouped = _.groupBy(trainings, 'activity');
        const summed = Object.keys(grouped).map(activity => ({
          activity,
          totalDuration: _.sumBy(grouped[activity], 'duration'),
        }));
        setChartData(summed);
      });
  }, []);

  return (
    <div>
      <h2>Total Training Duration by Activity</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="activity" />
          <YAxis label={{ value: 'Minute', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="totalDuration" fill="#fc6c85" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;
