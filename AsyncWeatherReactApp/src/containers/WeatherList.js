import React, { Component } from "react";
import { connect } from "react-redux";
import Chart from "../components/Chart";
import GoogleMap from "../components/GoogleMap";

class WeatherList extends Component {
  renderRow = () => {
    return this.props.weather.map(row => {
      const cities = row.list;
      const temps = cities.map(city => city.main.temp - 273);
      const pressures = cities.map(city => city.main.pressure);
      const humidities = cities.map(city => city.main.humidity);
      const {lat, lon} = row.city.coord;
      return (
        <tr key={row.city.name}>
          <td>
            <GoogleMap lat={lat} lon={lon} />
          </td>
          <td>
            <Chart
              height={120}
              width={180}
              data={temps}
              color="blue"
              unit="&deg;C"
            />
          </td>
          <td>
            <Chart
              height={120}
              width={180}
              data={pressures}
              color="red"
              unit="hPa"
            />
          </td>
          <td>
            <Chart
              height={120}
              width={180}
              data={humidities}
              color="green"
              unit="%"
            />
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (&deg;C)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>{this.renderRow()}</tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ weather }) => {
  return { weather };
};

export default connect(mapStateToProps)(WeatherList);
