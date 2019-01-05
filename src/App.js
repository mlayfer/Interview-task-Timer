import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.startCountDown = this.startCountDown.bind(this);
        this.stopCountDown = this.stopCountDown.bind(this);
        this.resetCountDown = this.resetCountDown.bind(this);

        this.state = {
            defaultValue: '10',
            value: 10,
            tempValue: ''
        };
    }

    handleChange(e) {
        this.setState({value: e.target.value});
        document.getElementById("progressCounter").innerText = e.target.value;
    }

    stopCountDown() {
        clearInterval(window.timer);
    }

    startCountDown() {
        document.getElementById("timeInput").disabled = true;
        let timeLeft;
        if (this.state.tempValue) timeLeft = this.state.tempValue;
        else timeLeft = this.state.value;
        console.log(timeLeft);
        if (timeLeft < 0 || isNaN(timeLeft)) {
            alert('Please enter a positive number of seconds');
        } else {
            let _this = this;
            window.timer = setInterval(function () {
                if (--timeLeft >= 0) {
                    document.getElementById("progressCounter").innerText = timeLeft;
                    document.getElementById("progressBar").value = _this.state.value - timeLeft;
                    _this.setState({tempValue: timeLeft});
                } else {
                    alert('Time\'s up. Happy new year!');
                    _this.stopCountDown();
                }
            }, 1000);
        }
    }

    resetCountDown() {
        document.getElementById("timeInput").disabled = false;
        clearInterval(window.timer);
        document.getElementById("progressCounter").innerText = this.state.defaultValue;
        document.getElementById("progressBar").value = 0;
        this.setState({value: this.state.defaultValue});
        this.setState({tempValue: ''});

    }

    render() {
        return (
            <div className="App">
                <FormGroup>
                    <div className="inputContainer">
                        <ControlLabel>Seconds:</ControlLabel>
                        <FormControl
                            id="timeInput"
                            type="number"
                            min="0"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="actionsContainer">
                        <div>
                            <Button bsStyle="success" onClick={this.startCountDown}>Start Count</Button>
                            <Button bsStyle="danger" onClick={this.stopCountDown}>Stop Count</Button>
                        </div>
                    </div>
                </FormGroup>

                <div className="indicatorsContainer">
                    <div>Seconds Left: <span id="progressCounter">{this.state.defaultValue}</span></div>
                    <progress value="0" max={this.state.value} id="progressBar"></progress>
                </div>

                <FormGroup>
                    <div>
                        <Button bsStyle="primary" onClick={this.resetCountDown}>Reset Count</Button>
                    </div>
                </FormGroup>

            </div>
        );
    }
}

export default App;
