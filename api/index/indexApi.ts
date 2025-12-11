import { SERVER_URL } from "@/globals";
import { createAuthHeader } from "@/utils/funcs";
import axios from "axios";
import { RResetApp_Ok } from "./types";

const IndexApiInstance = axios.create({
    baseURL: SERVER_URL + "/"
});

export const IndexApi_ResetApp = (tok: string) => IndexApiInstance.post<RResetApp_Ok>("/reset", {}, { headers: createAuthHeader(tok) });