import React, { Component } from 'react'
import { questions } from './questions'
import "./questions.css"


export class Survey extends Component {

    constructor(props) {
        super(props)
        this.state = {
            questions: questions,
            currentQuestion: 0,
            answers: [0, 0, 0, 0, 0, 0],
        }

    }
    componentDidMount() {
        console.log(this.state.questions);
    }

    nextQuestionHandler = () => {
        console.log('Next Question', this.state.answers);
        if (this.state.currentQuestion < this.state.questions.length - 1) {
            this.setState({
                currentQuestion: this.state.currentQuestion + 1,
            });
        }


    }
    prevQuestionHandler = () => {
        console.log('Previouus');
        if (this.state.currentQuestion > 0) {
            this.setState({
                currentQuestion: this.state.currentQuestion - 1,
            });
        }
    }
    selectOptions = (index) =>{
        let ob =[...this.state.answers];
        ob[this.state.currentQuestion] = index+1
        this.setState({
            answers : ob
        })
         }

    finishHandler = async () => {
        console.log('finish');
        this.props.handleAnswer(this.state.answers);

    }

    render() {
            let i = this.state.currentQuestion;
        return (
            <div className='surveyContainer'>
                <div className='surverQuestionContainer'>
                    <h2>Question {this.state.currentQuestion+1} of {this.state.questions.length} </h2>
                    <div>
                        <h3>{this.state.questions[i].question}</h3>
                    </div>
                </div>

                <div className='optionsContainer'>
                {this.state.questions[i].options.map((item, index)=>(
                    <div key={index}
                         className={this.state.answers[i] === index+1 ? 'options selected' : 'options'}
                         onClick = {()=>this.selectOptions(index)}
                         > 
                         {item}
                    </div>
                ))}
                </div>

                <button className="button"
                    onClick={this.prevQuestionHandler}>
                    Previous question
                </button>
                { this.state.currentQuestion !== this.state.questions.length - 1 &&
                <button className="button"
                    onClick={this.nextQuestionHandler}>
                    Next question
                </button>
                }
                {this.state.currentQuestion === this.state.questions.length - 1 &&
                    <button className="button"
                        onClick={this.finishHandler}
                    >
                        Submit
                    </button>
                }

            </div>
        )
    }
}

export default Survey;