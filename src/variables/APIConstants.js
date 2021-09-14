const VERSION_V15= '/v1.5';
const VERSION_V25= '/v2.5';
export const BASE_URL = 'https://qa-api.1huddle.co/api/rest';
export const VERIFY_EMAIL = `${VERSION_V15}/login/check_login_email`;
export const LOGIN = `${VERSION_V15}/auth/login`;
export const GET_GAMES = `${VERSION_V15}/game/get_game/regular`;
export const CREATING_GAME_SESSION = `${VERSION_V25}/game/create_game_session`;
export const FETCH_QUESTIONS = `${VERSION_V25}/game/questions`;
export const SUBMIT_QUESTION = `${VERSION_V25}/game/submit_answer`;
export const END_GAME = `${VERSION_V25}/game/end_game`;
