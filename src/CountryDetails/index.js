import React from 'react';
import { apiKey } from '../util';
import { withRouter } from 'react-router';

class CountryDetails extends React.PureComponent {
  componentDidMount() {
    // const { country } = this.props;
    fetch(
      'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=Nigeria',
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
      <div>
          {this.props.match.params.country}
        <h3>Details</h3>
      </div>
    );
  }
}

export default withRouter(CountryDetails);
