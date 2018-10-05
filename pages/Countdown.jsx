import moment from 'moment'
import React, { Component } from 'react'

class Countdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      now: moment(),
      dateTo: moment(this.props.dateTo),
      day: 0,
      hour: 0,
      min: 0,
      sec: 0
    };
    this.timer = this.timer.bind(this);
  }
  componentDidMount() {
    this.countdown = setInterval(this.timer, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.countdown);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dateTo !== this.props.dateTo) {
      this.setState({
        dateTo: moment(this.props.dateTo)
      })
    }
  }
  timer() {
    var now = moment();
    var sec = this.state.dateTo.diff(now, "seconds") % 60;
    var min = this.state.dateTo.diff(now, "minutes") % 60;
    var hour = this.state.dateTo.diff(now, "hours") % 24;
    var day = this.state.dateTo.diff(now, "days");
    this.setState({
      now: now,
      //clock format style
      // day: day < 10 ? "0" + day : day,
      // hour: hour < 10 ? "0" + hour : hour,
      // min: min < 10 ? "0" + min : min,
      // sec: sec < 10 ? "0" + sec : sec
      //longform style
      day: day,
      hour: hour,
      min: min,
      sec: sec
    });
  }
  renderDays() {
    if (this.state.day > 1) {
      return this.state.day + " days ";
    } else if (this.state.day === 1) {
      return this.state.day + " day ";
    } else {
      return "";
    }
  }
  renderHours() {
    if (this.state.hour > 1) {
      return this.state.hour + " hours ";
    } else if (this.state.hour === 1) {
      return this.state.hour + " hour ";
    } else {
      return "";
    }
  }
  renderMins() {
    if (this.state.min > 1) {
      return this.state.min + " minutes ";
    } else if (this.state.min === 1) {
      return this.state.min + " minute ";
    } else {
      return "";
    }
  }
  renderSecs() {
    if (this.state.sec > 1) {
      return this.state.sec + " seconds ";
    } else if (this.state.sec === 1) {
      return this.state.sec + " second ";
    } else {
      return "";
    }
  }
  render() {
    return (
      <div>
        Liftoff in T - {this.renderDays()} {this.renderHours()} {this.renderMins()} {this.renderSecs()}
      </div>
    );
  }
}

export default Countdown
