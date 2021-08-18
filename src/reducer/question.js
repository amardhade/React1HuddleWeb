import * as ActionType from '../variables/ActionType';

const questionReducer = (question, action) => {
    switch(action.type) {
        case ActionType.PREPARE_QUESTIONS:
            return
        case ActionType.NEXT_QUESTION:
            return
        case ActionType.PREVIOUS_QUESTION:
            return         
        case ActionType.ATTEMPTED_CORRECTLY:
            return
        case ActionType.ATTEMPTED_INCORRECTLY:
            return    
        default:
            return question || {};
    }
}

export {questionReducer as default}