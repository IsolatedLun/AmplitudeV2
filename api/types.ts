export interface IResponse_Ok {
    ok: true
}

export interface IResponse_Err {
    response: {
        data: {
            error: string
        }
    }
}

// ===

export interface IFrontendSongPreview {
    _id: string,
    title: string,
    author: string,
    image: string
}

export interface IFrontendSongFull extends IFrontendSongPreview {
    audio: string
};

export type TSongForm = Omit<IFrontendSongFull, "_id">;
export type TSongEditForm = TSongForm;