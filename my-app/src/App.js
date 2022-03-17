import React from 'react';
import logo from './logo.svg';
import './App.css';
import Survey from './components/questions/Survey';
import DisplayTable from './components/questions/displayTable';
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: [],
      flagg : false,
    }
  }
  handleAnswer = (x) => {
    this.setState({
      answer: x,
      flagg : true
    });

  }


  render() {
    return (
      <Router>
      <Routes>
        <Route path="/survey" element=
        {this.state.flagg ? 
          <DisplayTable answer={this.state.answer}/>
          :
          <Survey  handleAnswer={this.handleAnswer}/>
        }
        ></Route>
        {/* <Route path="/table" element={<DisplayTable answer={this.state.answer} />}></Route> */}
      </Routes>
    </Router>

    );
  }
}

export default App;







