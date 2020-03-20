import React from 'react';
import { apiKey } from '../util';
import Scrollbars from 'react-custom-scrollbars';
import { withRouter } from 'react-router';

class AffectedCountries extends React.PureComponent {
  state = {
    searchTerm: '',
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

  renderList = () => {
    const {
      searchTerm,
      data: { affected_countries },
    } = this.state;
    const rows = [];
    affected_countries.forEach((item, index) => {
      if (item.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) === -1)
        return;

      rows.push(
        <button
          type="button"
          key={index}
          class="list-group-item list-group-item-action"
          onClick={() => this.props.history.push(`/details/${item}`)}
        >
          {item}
        </button>
      );
    });
    return rows;
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <div class="card">
        <div class="card-body">
          <h6>Affected Countries</h6>
          <input
            value={searchTerm}
            onChange={({ target: { value } }) =>
              this.setState({ searchTerm: value })
            }
            className="form-control mb-1"
            placeholder="search"
          />
          <Scrollbars style={{ height: '85vh' }} autoHide>
            <div class="list-group list-group-flush">{this.renderList()}</div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export default withRouter(AffectedCountries);
