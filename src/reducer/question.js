import * as ActionType from '../variables/ActionType';

const questionReducer = (question, action) => {
    console.log('Question Reducer: ', action);
    switch (action.type) {
        case ActionType.SET_QUESTION:
            return {
                question: { ...action.nowShowingQuestion }
            }
        case ActionType.NEXT_QUESTION:
            return
        case ActionType.PREVIOUS_QUESTION:
            return
        case ActionType.QUESTION_ATTEMPTED:
            return {
                question: { ...action.nowShowingQuestion },
                updateQuestionsSet: true
            }
        case ActionType.ATTEMPTED_INCORRECTLY:
            return
        default:
            return question || {};
    }
}

export { questionReducer as default }