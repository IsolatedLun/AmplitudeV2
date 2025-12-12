import { SongApi_EditSong, SongApi_GetSongById } from "@/api/song/songApi";
import { IFrontendSongFull, TSongForm } from "@/api/types";
import ErrorContainer from "@/components/containers/ErrorContainer";
import LoadingContainer from "@/components/containers/LoadingContainer";
import SongForm from "@/components/forms/SongForm";
import { ESongFormikMode } from "@/components/forms/types";
import { useGetRequest } from "@/hooks/request";
import { File, Paths } from "expo-file-system";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";


const EditTab = () => {
    const { id } = useLocalSearchParams() as { id: string };
    const { loading, data, error } = useGetRequest(fetchSong(id as string), {}, true);
    const [loadedInitialValues, setLoadedInitialValues] = useState<TSongForm | null>(null);
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);

    useFocusEffect(() => {
        if(data && !loading) {
            loadInitialValues(data);
        }
    });

    async function loadInitialValues(v: IFrontendSongFull) {
        const imageDownloadFile = await File.downloadFileAsync(v.image, Paths.cache, { idempotent: true });
        const audioDownloadFile = await File.downloadFileAsync(v.audio, Paths.cache, { idempotent: true });

        setLoadedInitialValues({
            title: data.title,
            author: data.author,
            image: { uri: imageDownloadFile.uri, name: "temp.jpg", type: imageDownloadFile.type },
            audio: { uri: audioDownloadFile.uri, name: "temp.mp3", type: audioDownloadFile.type }
        });
    }

    function fetchSong(_id: string) {
        return () => SongApi_GetSongById(_id);
    }
    

    async function editSong(v: TSongForm, resetFormFunc: any) {
        const data = new FormData();
        data.append("title", v.title);
        data.append("author", v.author);
        data.append("image", v.image as any);
        data.append("audio", v.audio as any);

        
        setIsUploading(true);
        const tok = SecureStore.getItem("tok");
        SongApi_EditSong(id, data, tok!)
            .then(() => router.replace(`/player/${id}`))
            .catch((err: any) => console.error(err))
            .finally(() => setIsUploading(false));
    }

    return loading || !loadedInitialValues
    ? <LoadingContainer />
    : error
        ? <ErrorContainer goBackFn={() => router.replace("/(tabs)/songs")} />
        : <SongForm
            mode={ESongFormikMode.Edit}
            isSubmitting={isUploading}
            initialValues={loadedInitialValues}
            onSubmit={editSong} 
        />
};



export default EditTab;