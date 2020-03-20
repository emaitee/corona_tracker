import React from 'react';
import { apiKey } from '../util';
import moment from 'moment';
import AffectedCountries from '../AffectedCountries';

function Item({ title, value }) {
  return (
    <div className="card m-1" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {value === '' ? 0 : value}
        </h6>
      </div>
    </div>
  );
}

function Summary({ stat, title, updateTime }) {
  return (
    <div className="mt-5">
      <div className="d-flex flex-row justify-content-between pr-5 pl-5">
        <h5>{title}</h5>
        <div className="hr-text hr-text-right text-right mb-2">
          Updated <span>{moment(updateTime).fromNow()}</span>
        </div>
      </div>
      <div className="d-flex pr-5 pl-5">
        <Item title="Total Cases" value={stat.total_cases} />
        <Item title="Total Deaths" value={stat.total_deaths} />
        <Item title="Total Recovered" value={stat.total_recovered} />
        <Item title="New Cases" value={stat.new_cases} />
        <Item title="New Death" value={stat.new_deaths} />
      </div>
    </div>
  );
}

class Dashboard extends React.PureComponent {
  state = {
    imgUrl: 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/masks.php',
    globalStat: {
      total_cases: 0,
      total_deaths: 0,
      total_recovered: 0,
      new_cases: 0,
      new_deaths: 0,
      statistic_taken_at: 0,
    },
    nigerianStat: {
      id: '63425',
      country_name: 'Nigeria',
      total_cases: 0,
      new_cases: 0,
      active_cases: 0,
      total_deaths: 0,
      new_deaths: 0,
      total_recovered: 0,
      serious_critical: '',
      region: null,
      total_cases_per1m: '0.06',
      record_date: '2020-03-20 13:40:02.543',
    },
  };
  componentDidMount() {
    this.getImage();
    this.getGlobalStat();
    this.getNigerianStat();
  }

  getGlobalStat = () => {
    fetch(
      'https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
      }
    )
      .then(data => data.json())
      .then(response => this.setState({ globalStat: response }))
      .catch(err => {
        console.log(err);
      });
  };

  getNigerianStat = () => {
    fetch(
      'https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=Nigeria',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
          'x-rapidapi-key': apiKey,
        },
      }
    )
      .then(data => data.json())
      .then(response =>
        this.setState({ nigerianStat: response.latest_stat_by_country[0] })
      )
      .catch(err => {
        console.log(err);
      });
  };

  getImage = () => {
    fetch('https://coronavirus-monitor.p.rapidapi.com/coronavirus/masks.php', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
        'x-rapidapi-key': apiKey,
      },
    })
      .then(data => this.setState({ imgURL: data.url }))
      //   .then(response => console.log(response))
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { globalStat, nigerianStat, imgURL } = this.state;
    return (
      <div className="row m-0">
        <div className="col-md-4 col-lg-2">
          <AffectedCountries />
        </div>
        <div className="col-md-8 col-lg-8">
          {/* <img alt="info" src={imgURL} style={{ height: 200, width: 200 }} /> */}
          <Summary
            title="Global Stat"
            updateTime={globalStat.statistic_taken_at}
            stat={globalStat}
          />
          <Summary
            title="Nigerian Stat"
            updateTime={nigerianStat.record_date}
            stat={nigerianStat}
          />

          {/* <div>
            <button type="button" class="btn btn-outline-dark">
              View list of affected countries
            </button>
            <button type="button" class="btn btn-outline-dark">
              View list of affected countries
            </button>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Dashboard;
