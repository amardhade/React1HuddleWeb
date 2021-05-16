export function getToken(){
    return localStorage.getItem("token") ? localStorage.getItem("token") : undefined;
}

export function setToken(token) {
    token = token.trim();
    localStorage.setItem("token", token);
}

export function storePlayer(player) {
    player = player ? JSON.stringify(player) : null;
    localStorage.setItem("player", player);
}

export function getPlayer() {
    const player = localStorage.getItem("player");
    const storedPlayer = player ? JSON.parse(player) : null;
    return storedPlayer;
}

export function storeCompany(company) {
    company = company ? JSON.stringify(company) : null;
    localStorage.setItem("company", company);
}

export function getCompany() {
    const company = localStorage.getItem("company");
    const storedCompany = company ? JSON.parse(company) : null;
    return storedCompany;
}


