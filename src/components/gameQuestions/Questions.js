import React, { useEffect, useContext, useState, useReducer } from 'react';
import { Typography, Button } from '@material-ui/core';
import './GameQuestions.scss';
import GameContext from '../../context/GameContext';
import { getAllQuestions, canGoNext, canGoPrevious, questionAttempted } from './questionManager';
import questionReducer from '../../reducer/question';
import * as ActionType from '../../variables/ActionType';
import update from 'immutability-helper';

const Questions = () => {

    const { game } = useContext(GameContext);
    const [questions, setQuestions] = useState([]); // Default empty
    let [questionIndex, setQuestionIndex] = useState(0); // Default 0
    let [points, setPoints] = useState(0); // Default 0
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [questionState, questionDispatch] = useReducer(questionReducer, {});
    let { question = {}, updateQuestionsSet } = questionState;

    const nextQuestion = () => {
        if (canGoNext(questionIndex, questions)) {
            questionIndex = questionIndex + 1;
            setQuestionIndex(questionIndex);
            questionDispatch({ type: ActionType.SET_QUESTION, nowShowingQuestion: questions[questionIndex] })
        }
    }

    const previousQuestion = () => {
        if (canGoPrevious(questionIndex)) {
            questionIndex = questionIndex - 1;
            setQuestionIndex(questionIndex);
            questionDispatch({ type: ActionType.SET_QUESTION, nowShowingQuestion: questions[questionIndex] })
        }
    }

    // Run only after question attempted
    useEffect(() => {
        const indexToReplace = questions.findIndex((que) => que.question_id === question.question_id);
        if (indexToReplace >= 0) {
            const allQuestions = update(questions, { $splice: [[indexToReplace, 1, question]] });
            setQuestions(allQuestions);
        }
    }, [updateQuestionsSet]);

    // Run only once when component render like componentDidMount
    useEffect(() => {
        const allQuestions = getAllQuestions(game, questionIndex, questionDispatch);
        setQuestions(allQuestions);
    }, [])

    return (
        <div className="questionWrapper">
            <div className="questionHeader">
                <div className="categoryTitleWrapper">
                    <Typography variant="subtitle1" className="categoryTitle">{question.category_name}</Typography>
                    <Typography variant="subtitle1" className="questionCountWrapper">{0}/{0}</Typography>
                </div>
                <div className="questionSection">
                    <div className="question">
                        <Typography variant="subtitle1" className="questionTitle">{question.question_title}</Typography>
                        {question.image_url != null && question.image_url.length > 0 &&
                            <img className="questionImage" alt="image" src={question.image_url}></img>
                        }
                    </div>
                    <div className="answerOptions">
                        {question.answer_options && question.answer_options.map((ansOption, index) =>
                            <div key={index} className={"ansOption " + ((question.attempted && question.answer_index == index + 1) ? 'correctAns' : '')}
                                style={{ background: (question.attempted && ansOption.incorrect) ? 'red' : '' }}
                                onClick={() => questionAttempted(question, index, ansOption, questionDispatch)}>
                                <span className="ans">{question.answer_options[index].title}</span>
                            </div>)}
                    </div>
                </div>
            </div>
            <div className="questionFooter">
                <Button className="previous" disabled={!canGoPrevious(questionIndex)} onClick={() => previousQuestion()}>Previous</Button>
                <Button className="next" disabled={!canGoNext(questionIndex, questions)} onClick={() => nextQuestion()}>Next</Button>
            </div>
        </div>
    )

}
export { Questions as default };