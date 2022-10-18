//? count
//? count
import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/coinRankingApi";
import Loader from "../components/Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

//   console.log(cryptos);

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (//err search (? after cryptoList)
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24} //antd width at extra-small devices, 24 is full width
            sm={12} //2 rows with width 12
            lg={4} // 4 colons width 6
            className="crypto-card"
            key={currency.id} //id in api data
          >
            {/* Note: Change currency.id to currency.uuid  */}
            <Link key={currency.id} to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.name}`}
                // title={`${currency.id}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.image.small}
                    alt="crypto"
                  />
                }
                hoverable
              >
                <p>
                  Price:{" "}
                  {millify(currency.market_data.current_price.usd, {
                    precision: 4,
                    decimalSeparator: ",",
                  })}
                </p>
                <p>
                  Market Cap:{" "}
                  {millify(currency.market_data.market_cap.usd, {
                    precision: 2,
                    decimalSeparator: ",",
                  })}
                </p>
                <p>
                  Daily Change:{" "}
                  {currency.market_data.market_cap_change_percentage_24h}%
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
