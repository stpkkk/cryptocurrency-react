import React from "react";
import millify from "millify"; //round numbers
import { Link } from "react-router-dom";
import { Typography, Row, Col, Statistic, Spin } from "antd";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery();
  //   const { data } = useGetCryptosQuery();
  const globalStats = data?.data?.stats;

  if (isFetching) return <Spin size="large" />;

  console.log(data);
  return (
    <>
      <div align="middle">
        <Title level={2} className="heading" align="start">
          Global Crypto Stats:
        </Title>
        <Row gutter={[32, 32]}>
          <Col span={12} align="middle">
            <Statistic
              title="Total Coins:"
              value={millify(globalStats.total)}
            />
          </Col>
          <Col span={12} align="middle">
            <Statistic
              title="Total Exchanges:"
              value={millify(globalStats.totalExchanges)}
            />
          </Col>
          <Col span={12} align="middle">
            <Statistic
              title="Total Market Cap:"
              value={millify(globalStats.totalMarketCap)}
            />
          </Col>
          <Col span={12} align="middle">
            <Statistic
              title="Total 24h Volume:"
              value={millify(globalStats.total24hVolume)}
            />
          </Col>
          <Col span={12} align="middle">
            <Statistic
              title="Total Markets:"
              value={millify(globalStats.totalMarkets)}
            />
          </Col>
        </Row>
      </div>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptos In The World:
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News:
        </Title>
        <Title level={3}>
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <News />
    </>
  );
};

export default Homepage;
