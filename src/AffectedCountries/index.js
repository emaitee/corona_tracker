import React from 'react';
import { apiKey } from '../util';
import Scrollbars from 'react-custom-scrollbars';

class AffectedCountries extends React.PureComponent {
  state = {
    data: {
      affected_countries: [],
      statistic_taken_at: '2020-03-20 14:20:08',
    },
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
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div class="card">
        <div class="card-body">
          <h6>Affected Countries</h6>
          <input className="form-control" placeholder="search" />
          <Scrollbars style={{ height: '85vh' }} autoHide>
            <ul class="list-group list-group-flush">
              {this.state.data.affected_countries.map((item, index) => (
                <li key={index} class="list-group-item">
                  {item}
                </li>
              ))}
            </ul>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export default AffectedCountries;
