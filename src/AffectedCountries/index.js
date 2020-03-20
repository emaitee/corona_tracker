import React from 'react';
import { apiKey } from '../util';

class AffectedCountries extends React.PureComponent {
  state = {
    affected_countries: [
      'China',
      'Italy',
      'Spain',
      'Iran',
      'Germany',
      'USA',
      'France',
      'S. Korea',
      'Switzerland',
    ],
    statistic_taken_at: '2020-03-20 14:20:08',
  };

  componentDidMount() {
    fetch(
      'https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
      }
    )
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div class="card">
        <div class="card-body">
          <h6>Affected Countries</h6>
          <ul class="list-group">
            {this.state.affected_countries.map((item, index) => (
              <li key={index} class="list-group-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default AffectedCountries;
