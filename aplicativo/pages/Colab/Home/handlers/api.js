import { connection } from "../../../../services/api";

const URL_API_LEITOS = '/api/leitos';

export async function getLeitos(token) {
    try {
        let connectionWithServer = await connection(token).get(URL_API_LEITOS);
        if (connectionWithServer.status === 200)
            return connectionWithServer.data;
        else if (connectionWithServer.status === 401)
            throw new Error("Unathourized");
        else
            throw new Error(connectionWithServer.data?.message ? connectionWithServer.data?.message : "Não foi possível lidar com a operação neste momento, tente novamente mais tarde.");
    } catch (ex) {
        throw new Error("Não foi possível lidar com a operação neste momento, tente novamente mais tarde.");
    }
}