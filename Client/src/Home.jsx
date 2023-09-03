import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function Home() {
  const [covid, setCovid] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredCovid, setFilteredCovid] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [filteredByDateRangeCovid, setFilteredByDateRangeCovid] = useState([]);

  const getCovidRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5000");
      setCovid(response.data);

      const firstDate = response.data[0]?.Date || "";
      const lastDate = response.data[response.data.length - 1]?.Date || "";
      setStartDate(firstDate);
      setEndDate(lastDate);
    } catch (error) {
      console.error("Error fetching COVID-19 data:", error);
    }
  };

  useEffect(() => {
    getCovidRecords();
  }, []);

  const handleFilterByCountry = () => {
    const filteredData = covid.filter(
      (entry) =>
        entry["Country/Region"].toLowerCase() === selectedCountry.toLowerCase()
    );
    setFilteredCovid(filteredData);
  };

  const handleStartDateChange = (event) => {
    const dateValue = event.target.value;
    setStartDate(dateValue);
    filterDataByDateRange(dateValue, endDate);
  };

  const handleEndDateChange = (event) => {
    const dateValue = event.target.value;
    setEndDate(dateValue);
    filterDataByDateRange(startDate, dateValue);
  };

  const filterDataByDateRange = (start, end) => {
    const filteredData = covid.filter(
      (entry) => entry["Date"] >= start && entry["Date"] <= end
    );
    setFilteredByDateRangeCovid(filteredData);
  };

  return (
    <main className="main-container">
      <div className="main-title">
        <h1>Covid Status</h1>
      </div>

      <div className="filters">
        <div className="filter-by-country">
          <label style={{ color: "black" }} htmlFor="countryInput">
            Filter by Country:{" "}
          </label>
          <input
            type="text"
            id="countryInput"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            placeholder="Enter country name"
            className="country-input"
          />
          <button onClick={handleFilterByCountry} className="filter-button">
            Filter
          </button>
        </div>

        <div className="date-filters">
          <div className="date-filter">
            <label style={{ color: "black" }} htmlFor="startDatePicker">
              Start Date:{" "}
            </label>
            <input
              type="date"
              id="startDatePicker"
              value={startDate}
              onChange={handleStartDateChange}
              className="date-picker-input"
            />
          </div>

          <div className="date-filter">
            <label style={{ color: "black" }} htmlFor>
              End Date:{" "}
            </label>
            <input
              type="date"
              id="endDatePicker"
              value={endDate}
              onChange={handleEndDateChange}
              className="date-picker-input"
            />
          </div>
        </div>
      </div>

      <div className="charts">
        <ResponsiveContainer width="100%" height={600}>
          <BarChart
            data={filteredCovid.length > 0 ? filteredCovid : covid}
            margin={{
              top: 0,
              right: 30,
              left: 20,
              bottom: 50,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="Date"
              type="category"
              tick={{ fontSize: 12, unique: true }}
              tickCount={15}
            />
            <YAxis
              label={{ value: "Count", angle: -90, position: "insideLeft" }}
              tick={{ fontSize: 12 }}
              tickCount={15}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="Country/Region" fill="#4682B4" />
            <Bar dataKey="Deaths" fill="#008080" name="Deaths" />
            <Bar dataKey="Recovered" fill="#00FF7F" name="Recovered" />
            <Bar dataKey="Active" fill="#FFA500" name="Active" />
            <Bar dataKey="New cases" fill="#4B0082" name="New cases" />
            <Bar dataKey="New deaths" fill="#800080" name="New deaths" />
            <Bar dataKey="New recovered" fill="#2E8B57" name="New recovered" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={600}>
          <LineChart data={filteredCovid.length > 0 ? filteredCovid : covid}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="Date"
              type="category"
              tick={{ fontSize: 12, unique: true }}
            />
            <YAxis
              label={{ value: "Counts", angle: -90, position: "insideLeft" }}
              tick={{ fontSize: 12 }}
              tickCount={15}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Country/Region"
              name="Country/Region"
            />
            <Line
              type="monotone"
              dataKey="Confirmed"
              stroke="#FF6347"
              name="Confirmed"
            />
            <Line
              type="monotone"
              dataKey="Deaths"
              stroke="#008080"
              name="Deaths"
            />
            <Line
              type="monotone"
              dataKey="Recovered"
              stroke="#00FF7F"
              name="Recovered"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default Home;
