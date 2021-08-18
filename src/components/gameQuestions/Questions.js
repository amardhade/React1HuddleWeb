import React, { userState, useEffect, useContext, useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import './GameQuestions.scss';
import GameContext from '../../context/GameContext';
import classNames from 'classnames';

const Questions = () => {

    const { game } = useContext(GameContext);
    const [questions, setQuestions] = useState([]); // Default empty
    const [question, setQuestion] = useState({}); // Default undefined
    let [questionIndex, setQuestionIndex] = useState(0); // Default 0
    let [points, setPoints] = useState(0); // Default 0
    const [selectedIndex, setSelectedIndex] = useState(-1);
    // const [wrongOption, setWrongOption] = useState('');
    console.log('Game: ', game);    

    const getAllQuestions = () => {
        var allQuestions = [];
        game.categories.map((category) => {
            const catQuestions = mapCategoryDetailsToQuestion(category);
            if (catQuestions && catQuestions.length) {
                catQuestions.map((catQuestion) => {
                    allQuestions.push(catQuestion)
                })
            }
        });
        setQuestions(allQuestions);
        console.log('allQuestions: ', allQuestions);
        // Set 1st Question
        if (allQuestions && questionIndex <= allQuestions.length - 1) {
            setQuestion(allQuestions[questionIndex]);
        }
    }

    const mapCategoryDetailsToQuestion = (category) => {
        let questions = category.questions.map((question) => {
            return {
                ...question,
                category_id: category.category_id,
                category_name: category.category_name,
                attempted: false,
                selectedAnsIndex: -1,
                answer_options: mapAnsOptions(question.answer_options)

            }
        });
        return questions;
    }

    const mapAnsOptions = (ansOptions) => {
        const ansOptionsAsAObject = ansOptions.map((ansOption) => {
            return {
                title: ansOption
            }
        });
        return ansOptionsAsAObject;
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

    const questionAttempted = (selectedIndex, ansOption) => {
        if (question.attempted) { return; }
        selectedIndex = selectedIndex + 1; // As selected index starts from 0 where ans_index starts from 1
        console.log(selectedIndex, ansOption);
        question.attempted = true;
        question.selectedAnsIndex = selectedIndex
        setSelectedIndex(selectedIndex);
        if (question.answer_index == selectedIndex) { // attempted correctly
            showAnswers(true, selectedIndex - 1);
            updatePoints();

        } else { // attempted wrongly
            showAnswers(false, selectedIndex - 1);

        }
    }

    const showAnswers = (attemptedCorrectly, selectedI) => {
        if (attemptedCorrectly) {
            question.answer_options[selectedI] = { ...question.answer_options[selectedI], correct: true }
        } else {
            question.answer_options[question.answer_index - 1] = { ...question.answer_options[question.answer_index - 1], correct: true }
            question.answer_options[selectedI] = { ...question.answer_options[selectedI], incorrect: true }
        }
    }

    const updatePoints = () => {
        points = points + question.points;
        setPoints(points);
    }

    const ansOptionClasses = classNames(
        {
            'ansOption': true,
            'correctAns': question.answer_index
        }
    );

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
                            <img className="questionImage" alt="image" src={question.image_url}></img>
                        }
                    </div>
                    <div className="answerOptions">
                        {question.answer_options && question.answer_options.map((ansOption, index) =>
                            <div key={index} className={"ansOption " + ((question.attempted && question.answer_index == index + 1) ? 'correctAns' : '')}
                                style={{ background: (question.attempted && ansOption.incorrect) ? 'red' : '' }}
                                onClick={() => questionAttempted(index, ansOption)}>
                                <span className="ans">{question.answer_options[index].title}</span>
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