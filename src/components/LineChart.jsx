import React from "react";

import { Col, Row, Typography } from "antd";
import { useGetChartDataQuery } from "../services/coingeckoApi";

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName, timeperiod, id }) => {
  const { data: chartData } = useGetChartDataQuery({
    id,
    timeperiod,
  });

//   const { day, week, year, detail } = dataTime;

//   const determineTimeFormat = () => {
//     switch (timeperiod) {
//       case "24h":
//         return day;
//       case "7d":
//         return week;
//       case "1y":
//         return year;
//       default:
//         return day;
//     }
//   };

  const chartAxis = chartData?.prices.map((value) => ({
    x: value[0], //date
    y: value[1].toFixed(2), //price
  }));

  const labels = chartAxis?.map((value) =>
    moment(value.x).format("YYYY-MM-DD HH:mm")
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: coinName,
        data: chartAxis?.map((val) => val.y),
        borderColor: "rgb(53, 162, 50)",
        backgroundColor: "rgb(53, 50, 235)",
      },
    ],
  };
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} 24h Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            {coinName} Price: ${currentPrice}
          </Title>
        </Col>
      </Row>
      <Line options={options} data={data} />
    </>
  );
};

export default LineChart;
