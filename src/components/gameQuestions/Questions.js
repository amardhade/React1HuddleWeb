import React, { userState, useEffect, useContext, useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import './GameQuestions.scss';
import GameContext from '../../context/GameContext';

const Questions = () => {

    const { game } = useContext(GameContext);
    const [questions, setQuestions] = useState([]); // Default empty
    const [question, setQuestion] = useState({}); // Default undefined
    let [questionIndex, setQuestionIndex] = useState(0); // Default 0

    const getAllQuestions = () => {
        var allQuestions = [];
        game.catrgories.map((category) => {
            const catQuestions = mapCategoryDetailsToQuestion(category);
            if(catQuestions && catQuestions.length) {
                catQuestions.map((catQuestion) => {
                    allQuestions.push(catQuestion)
                })
            }
        });
        setQuestions(allQuestions);
        console.log('allQuestions: ', allQuestions);
        // Set 1st Question
        if (allQuestions && questionIndex < allQuestions.length - 1) {
            setQuestion(allQuestions[questionIndex]);
        }
        console.log('Question: ', question);
    }

    const mapCategoryDetailsToQuestion = (category) => {
        let questions = category.questions.map((question) => {
            return {
                ...question,
                category_id: category.category_id,
                category_name: category.category_name,
                attempted: false
            }
        });
        console.log('mapCategoryDetailsToQuestion: ', questions);
        return questions;
    }

    const nextQuestion = () => {
        if (canGoNext()) {
            questionIndex = questionIndex + 1;
            setQuestionIndex(questionIndex);
            setQuestion(questions[questionIndex]);
        }
    }

    const previousQuestion = () => {
        if (canGoPrevious()) {
            questionIndex = questionIndex - 1;
            setQuestionIndex(questionIndex);
            setQuestion(questions[questionIndex]);
        }
    }

    const canGoNext = () => {
        return questionIndex < questions.length - 1;
    }

    const canGoPrevious = () => {
        return questionIndex > 0;
    }

    const questionAttempted = (ansIndex, ansOption) => {
        console.log(ansIndex, " ", ansOption)

    }

    // Run only once when component renderslike componentDidMount
    useEffect(() => {
        getAllQuestions();
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
                                <img className="questionImage" src={question.image_url}></img>
                            }
                        </div>
                        <div className="answerOptions">
                            {question.answer_options && question.answer_options.map((ansOption, ansIndex) =>
                                <div key={ansIndex} className="ansOption" onClick={() => questionAttempted(ansIndex, ansOption)}>
                                    <span className="ans">{question.answer_options[ansIndex]}</span>
                                </div>)}
                        </div>
                    </div>
                </div>
                <div className="questionFooter">
                    <Button className="previous" disabled={!canGoPrevious()} onClick={() => previousQuestion()}>Previous</Button>
                    <Button className="next" disabled={!canGoNext()} onClick={() => nextQuestion()}>Next</Button>
                </div>
            </div>
    )

}
export { Questions as default };