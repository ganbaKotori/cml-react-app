import React, {Component} from "react"
import {QuizData} from "../QuizData"
import './App.css';
import firebase from "../firebase"


export class Quiz extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userAnswer: null,
            currentIndex: 0,
            options: [],
            quizEnd: false,
            score: 0,
            disabled: true,
            quiz: [],
            pointsRef: firebase.database().ref('points'),
        }
    }

    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }

      updatePoints = points => {
        return this.state.pointsRef.child("test").set({
            points: points
        });
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

    generateQuiz = count => {
        var list = [];

        for (var counter = 0; counter < count; counter++) { 
            //console.log('Inside the loop:' + counter);
            var options = []
            var num1 = this.getRandomInt(1000) + 1;
            //console.log(num1)
            var num2 = this.getRandomInt(1000) + 1;
            var total = num1 + num2;
            for (var counter2 = 0; counter2 < 3; counter2 ++){
                options.push("" + (this.getRandomInt(total) + 100) + "")
            }
            options.push("" + total + "")
            this.shuffle(options)
            var question = {
                id: counter,
                question: 'What is ' + num1 + ' + ' + num2 + '?',
                options: options,
                answer: "" + total + ""
            }
            list.push(question)
        }
        ////console.log(list)
        this.setState(()=> {
            return {
                quiz: list
            }
        })
    }

    loadQuiz = () => {
        const {currentIndex, quiz} = this.state;
        this.setState(()=> {
            return {
                question: quiz[currentIndex].question,
                options: quiz[currentIndex].options,
                answer: quiz[currentIndex].answer
            }
        })
    }

    nextQuestionHandler = () => {
        const  {
            userAnswer, answer, score
        } = this.state;

        if(userAnswer === answer){
            this.setState({
                score: score + 1
            })
        }

        this.setState({
            currentIndex: this.state.currentIndex + 1,
            userAnswer: null
        })


    }
    componentWillMount(){
        this.generateQuiz(3);
    }

    componentDidMount() {
        
        this.loadQuiz();
        

    }

    checkAnswer = answer => {
        this.setState({
            userAnswer : answer,
            disabled: false
        })
    }

    finishHandler = () => {
        if(this.state.currentIndex === this.state.quiz.length -1){
            const  {
                userAnswer, answer, score
            } = this.state;
    
            if(userAnswer === answer){
                this.setState({
                    score: score + 1
                })
                alert(score)
            }
            
            this.setState({
                quizEnd: true
            })

            //this.updatePoints(this.state.score)
        }
    }

    componentDidUpdate(prevProps, prevState){
        const{currentIndex, quiz} = this.state;
        if(this.state.currentIndex != prevState.currentIndex){
            this.setState(()=> {
                return {
                    question: quiz[currentIndex].question,
                    options: quiz[currentIndex].options,
                    answer: quiz[currentIndex].answer
                }
            })

        }
    }

    render(){
        const {question, options,currentIndex,userAnswer,quizEnd, quiz, score} = this.state;

        if(quizEnd){
            this.updatePoints(score)
            return(
                <div>
                    <h1>Game Over. Final Score is {this.state.score} points</h1>
                    <p>The correct answers for the quiz are</p>
                    <ul>
                        {quiz.map((item,index) => (
                            <li className="options"
                                key={index}>
                                    {item.answer}
                                </li>
                        ))}
                    </ul>
                </div>
            )
            
        }

        return (
            <div>
                <h2>{question}</h2>
        <span>{`Question ${currentIndex+1} of ${quiz.length}`}</span>
            {
                options.map(option => 
                    <p key={option.id} className={`options ${userAnswer===option ? "selected" : null}`} 
                    onClick = {()=> this.checkAnswer(option)}
                    >
                        {option}
                    </p>
                )
            }

            { currentIndex < quiz.length - 1 && 
            <button disabled= {this.state.disabled} onClick={this.nextQuestionHandler}>
                Next Question    
            </button>}
            {currentIndex === quiz.length -1 && 
                <button onClick={this.finishHandler} disabled= {this.state.disabled}>
                    Finish
                </button>
            } 


            </div>
        )
    }
}

export default Quiz;