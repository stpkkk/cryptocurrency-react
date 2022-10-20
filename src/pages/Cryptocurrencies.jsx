import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import millify from "millify";

import { Input, Table, Button } from "antd";

import { useGetCryptosQuery } from "../services/coingeckoApi";

import Loader from "../components/Loader";

const Cryptocurrencies = () => {
  const { data: cryptosList, isFetching } = useGetCryptosQuery();
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [sortedInfo, setSortedInfo] = useState({});
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 100,
    },
  });
  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const clearSorters = () => {
    setSortedInfo({});
  };
  //   console.log(cryptos?.[0].name);

  const columns = [
    {
      title: "#",
      key: "id",
      dataIndex: "id",
      width: "10%",
      ellipsis: true,

      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
    },
    {
      title: "",
      dataIndex: "image",
      key: "image",
      width: "10%",
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ellipsis: true,

      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
    },
    {
      title: "Price $",
      key: "price",
      dataIndex: "price",
      ellipsis: true,
      width: "15%",

      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === "price" ? sortedInfo.order : null,
    },
    {
      title: "1h %",
      key: "one_hour",
      dataIndex: "one_hour",
      ellipsis: true,
      width: "15%",

      sorter: (a, b) => a.one_hour - b.one_hour,
      sortOrder: sortedInfo.columnKey === "one_hour" ? sortedInfo.order : null,
    },
    {
      title: "24h %",
      key: "day",
      dataIndex: "day",
      ellipsis: true,
      width: "15%",

      sorter: (a, b) => a.day - b.day,
      sortOrder: sortedInfo.columnKey === "day" ? sortedInfo.order : null,
    },
    {
      title: "7d %",
      key: "week",
      dataIndex: "week",
      ellipsis: true,
      width: "15%",

      sorter: (a, b) => a.week - b.week,
      sortOrder: sortedInfo.columnKey === "week" ? sortedInfo.order : null,
    },
    {
      title: "Market Cap $",
      key: "market_cap",
      dataIndex: "market_cap",
      ellipsis: true,
      width: "20%",

      sorter: (a, b) => a.market_cap - b.market_cap,
      sortOrder:
        sortedInfo.columnKey === "market_cap" ? sortedInfo.order : null,
    },
  ];

  const data = cryptos?.map((coin, id) => {
    return {
      key: id,
      id: id,
      //   id: id + 1,
      image: (
        <img
          src={`${coin.image.small}`}
          alt={`${coin.image.small}`}
          style={{ height: "25px" }}
        />
      ),

      name: (
        <Link
          to={`/crypto/${coin.uuid}/${coin.name.toLowerCase()}`}
        >{`${coin.name}`}</Link>
      ),
      price: coin.market_data.current_price.usd,
      one_hour: coin.market_data.price_change_percentage_1h_in_currency.usd,
      day: coin.market_data.price_change_percentage_24h_in_currency.usd,
      week: coin.market_data.price_change_percentage_7d_in_currency.usd,
      market_cap: coin.market_data.market_cap.usd,
    };
  });

  useEffect(() => {
    setCryptos(cryptosList);

    const filteredData = cryptosList?.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;
  // console.log(cryptos);

  return (
    <>
      <Input
        placeholder="Search Cryptocurrency"
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        style={{ width: 400 }}
      />

      <Button onClick={clearSorters}>Clear sorters</Button>
      <Table
        pagination={tableParams.pagination}
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        size="middle"
        scroll={{ x: true }}
      />
    </>
  );
};

export default Cryptocurrencies;
