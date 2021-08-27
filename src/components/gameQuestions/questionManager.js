import * as ActionType from '../../variables/ActionType';
import { getPlayer } from "../../utils/StorageUtils";
import * as OHAxios from '../axios/OHAxios';
import * as APIConstants from '../../variables/APIConstants';

export const getAllQuestions = (game, questionIndex, dispatch) => {
    var allQuestions = [];
    game.categories.map((category) => {
        const catQuestions = mapCategoryDetailsToQuestion(category);
        if (catQuestions && catQuestions.length) {
            catQuestions.map((catQuestion) => {
                allQuestions.push(catQuestion)
            })
        }
    });
    // Set 1st Question
    if (allQuestions && questionIndex <= allQuestions.length - 1) {
        dispatch({ type: ActionType.SET_QUESTION, nowShowingQuestion: allQuestions[questionIndex] })
    }
    console.log('allQuestions: ', allQuestions);
    return allQuestions
}

const mapCategoryDetailsToQuestion = (category) => {
    let questions = category.questions.map((question) => {
        return {
            ...question,
            category_id: category.category_id,
            category_name: category.category_name,
            attempted: false,
            attemptedCorrectely: false,
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

export const canGoNext = (questionIndex, questions) => {
    return questionIndex < questions.length - 1;
}

export const canGoPrevious = (questionIndex) => {
    return questionIndex > 0;
}

export const questionAttempted = (game, question, selectedIndex, ansOption, dispatch) => {
    if (question.attempted) { return; }
    selectedIndex = selectedIndex + 1; // As selected index starts from 0 where ans_index starts from 1
    question.attempted = true;
    question.selectedAnsIndex = selectedIndex;
    if (question.answer_index == selectedIndex) { // attempted correctly
        showAnswers(question, true, selectedIndex - 1, dispatch);
        submitQuestion(game, question);
    } else { // attempted wrongly
        showAnswers(question, false, selectedIndex - 1, dispatch);
    }
}

const showAnswers = (question, attemptedCorrectly, selectedI, dispatch) => {
    if (attemptedCorrectly) {
        question.attemptedCorrectely = true
        // Update correct index option
        question.answer_options[selectedI] = { ...question.answer_options[selectedI], correct: true }
    } else {
        // Update correct + incorrect(attempted) index option
        question.answer_options[question.answer_index - 1] = { ...question.answer_options[question.answer_index - 1], correct: true }
        question.answer_options[selectedI] = { ...question.answer_options[selectedI], incorrect: true }
    }
    dispatch({ type: ActionType.QUESTION_ATTEMPTED, nowShowingQuestion: question })
}

// const updatePoints = (question) => {
//     points = points + question.points;
//     setPoints(points);
// }

export const submitQuestion = (game, question) => {
    try {
        // dispatch({ type: ActionType.FETCHINNG_GAME_CATEGORIES });
        const path = APIConstants.SUBMIT_QUESTION
        const payload = preparePayloadForSubmitQuestion(game, question);
        OHAxios.post(path, payload).then((response) => {
            console.log('Response: ', response);
            if (response.success) {
                const data = response.data;
            } else {
                // create pool for the not submitted questions    
            }
        }).error((error) => {
            // create pool for the not submitted questions
        })
    } catch {

    }
}

const preparePayloadForSubmitQuestion = (game, question) => {
    const player = getPlayer();
    return {
        "game_session_id": game.gameSessionId,
        "user_information": {
            "company_id": player.company_id,
            "player_id": player.player_id,
            "game_id": game.game_id
        },
        "answered_questions": [
            {
                "question_id": question.question_id,
                "point": question.points,
                "time_taken": 1,
                "is_correct_answer": true,
                "question_submission_event": "ATTEMPTEDBYUSER",
                "answer_given_on": "2021-08-25 16:00:00"
            }
        ]
    }
}