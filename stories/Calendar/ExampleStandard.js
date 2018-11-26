import React from 'react';
import Calendar from '../../src/Calendar';
import ToggleSwitch from 'wix-style-react/ToggleSwitch';
import Label from 'wix-style-react/Label';

class ControlledCalendarExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date('2017/05/01'),
      excludePastDates: true,
    };
  }

  onChange(date) {
    this.setState({ date });
  }

  toggleExclude() {
    this.setState(({ excludePastDates }) => ({
      excludePastDates: !excludePastDates,
    }));
  }

  render() {
    return (
      <div>
        <Calendar
          excludePastDates={this.state.excludePastDates}
          onChange={date => this.onChange(date)}
          value={this.state.date}
        />
        <div style={{ display: 'flex' }}>
          <ToggleSwitch
            checked={this.state.excludePastDates}
            onChange={() => this.toggleExclude()}
          />
          <Label>Exclude Past Days</Label>
        </div>
      </div>
    );
  }
}

export default () => <ControlledCalendarExample />;
