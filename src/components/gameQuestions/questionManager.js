import * as ActionType from '../../variables/ActionType';

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

export const questionAttempted = (question, selectedIndex, ansOption, dispatch) => {
    if (question.attempted) { return; }
    selectedIndex = selectedIndex + 1; // As selected index starts from 0 where ans_index starts from 1
    question.attempted = true;
    question.selectedAnsIndex = selectedIndex;
    if (question.answer_index == selectedIndex) { // attempted correctly
        showAnswers(question, true, selectedIndex - 1, dispatch);
        // updatePoints(question);
    } else { // attempted wrongly
        showAnswers(question, false, selectedIndex - 1, dispatch);
    }
}

const showAnswers = (question, attemptedCorrectly, selectedI, dispatch) => {
    if (attemptedCorrectly) {
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