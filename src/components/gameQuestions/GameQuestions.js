import { Typography, Button } from '@material-ui/core';
import './GameQuestions.scss';
import React from "react";
class GameQuestion extends React.Component {

    state = {
        selectedCategory: null,
        selectedQuestion: null,
        allQuestions: null,
        attemptedQuestion: 0,
        questionCountFromCategory: 0
    }
    questionIndex = 0;
    allQuestions = [];
    constructor(props) {
        super(props)
        // Initial state
        this.questionIndex = 0
        this.allQuestions = this.getAllQuestions();
        this.state = {
            selectedCategory: this.props.clickedCategory,
            questionCountFromCategory: this.props.clickedCategory.questions.length,
            attemptedQuestion: 1,
            selectedQuestion: this.getSelectedQuestion()
        }
    }

    getSelectedQuestion() {
        return this.allQuestions[this.questionIndex]
    }

    setSelectedQuestion() {
        this.setState({
            selectedQuestion: this.getSelectedQuestion()
        })
    }

    

    mapCategoryDetailsToQuestion(category) {
        let questions = category.questions.map((question) => {
            return {
                ...question,
                category_id: category.category_id,
                category_name: category.category_name,
                attempted: false
            }
        });
        return questions;
    }

    questionAttempted(ansIndex, ansOption) {
        console.log(ansIndex, " ", ansOption)
        // this.setState({
        //     selectedQuestion.attempted: true;
        // })
    }

    nextQuestion = () => {
        if (this.canGoNext()) {
            this.questionIndex++;
            this.setSelectedQuestion();
        }
    }

    previousQuestion = () => {
        if (this.canGoPrevious()) {
            this.questionIndex--;
            this.setSelectedQuestion();
        }
    }

    canGoNext() {
        return this.questionIndex < this.allQuestions.length - 1;
    }

    canGoPrevious() {
        return this.questionIndex > 0;
    }

    render() {
        return (
            <div className="questionWrapper">
                <div className="questionHeader">
                    <div className="categoryTitleWrapper">
                        <Typography variant="subtitle1" className="categoryTitle">{this.state.selectedQuestion.category_name}</Typography>
                        <Typography variant="subtitle1" className="questionCountWrapper">{this.state.attemptedQuestion}/{this.state.questionCountFromCategory}</Typography>
                    </div>
                    <div className="questionSection">
                        <div className="question">
                            <Typography variant="subtitle1" className="questionTitle">{this.state.selectedQuestion.question_title}</Typography>
                            {this.state.selectedQuestion.image_url != null && this.state.selectedQuestion.image_url.length > 0 &&
                                <img className="questionImage" src={this.state.selectedQuestion.image_url}></img>
                            }
                        </div>
                        <div className="answerOptions">
                            {this.state.selectedQuestion && this.state.selectedQuestion.answer_options.map((ansOption, ansIndex) =>
                                <div key={ansIndex} className="ansOption" onClick={() => this.questionAttempted(ansIndex, ansOption)}>
                                    <span className="ans">{this.state.selectedQuestion.answer_options[ansIndex]}</span>
                                </div>)}
                        </div>
                    </div>
                </div>
                <div className="questionFooter">
                    <Button className="previous" disabled={!this.canGoPrevious()} onClick={() => this.previousQuestion()}>Previous</Button>
                    <Button className="next" disabled={!this.canGoNext()} onClick={() => this.nextQuestion()}>Next</Button>
                </div>
            </div>
        )
    }
}

export default GameQuestion;