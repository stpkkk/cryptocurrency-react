import React from "react";

import { Button, Col, Row, Typography } from "antd";
import { useGetChartDataQuery } from "../services/coingeckoApi";
import { timePeriod } from "../data/timePeriod";

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
import { millify } from "millify";

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

const LineChart = ({
  coinHistory,
  currentPrice,
  coinName,
  id,
  days,
  setDays,
}) => {
  const { data: chartData } = useGetChartDataQuery({
    id,
    days,
  });

  const labels = chartData?.prices.map((coin) => {
    let date = new Date(coin[0]);
    let time =
      date.getHours() > 12
        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        : `${date.getHours()}:${date.getMinutes()} AM`;
    return days === 1 ? time : date.toLocaleDateString();
  });

  const options = {
    responsive: true,
    plugins: {
      legend: false,
	  subtitle: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
    elements: {
      point: {
        radius: 1,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: coinName,
        data: chartData?.prices.map((coin) => coin[1]),
        borderColor: "hsl(308, 69%, 54%)",
        backgroundColor: "#7a77ff",
      },
    ],
  };

  //   console.log(value)
  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            {coinName} Price: ${" "}
            {millify(currentPrice, {
              precision: 4,
              decimalSeparator: ",",
            })}
          </Title>
        </Col>
      </Row>
      {/* <Select
        defaultValue="24H"//?
        className="select-days"
        placeholder="Select Timeperiod"
        onChange={handleChangeChartDays}
      >
        {timePeriod.map((day, index) => (
          <Option key={index} value={day.value}>
            {day.label}
          </Option>
        ))}
		 
      </Select> */}
      <div className="time-period">
        {timePeriod.map((day) => (
          <Button
            type="primary"
			className="time-buttons"
            key={day.value}
            onClick={() => {
              setDays(day.value);
            }}
            selected={day.value === days}
          >
            {day.label}
          </Button>
        ))}
      </div>
      <Line options={options} data={data} />
    </>
  );
};

export default LineChart;
