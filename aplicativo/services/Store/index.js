const INITIAL_STATE = {
    auth: {
        isLogged: false,
        nome: null,
        nome_empresa: null,
        token: null,
        funcao_nome: null
    }

}

function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ADD_LOGIN':
            return {
                ...state, auth: {
                    isLogged: true,
                    token: action.payload.token,
                    nome: action.payload.nome,
                    nome_empresa: action.payload.nome_empresa,
                    funcao_nome: action.payload.funcao_nome
                }
            }
        case 'REMOVE_ALL':
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default auth;