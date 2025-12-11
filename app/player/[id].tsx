import { SongApi_GetSongById } from "@/api/song/songApi";
import { IFrontendSongFull } from "@/api/types";
import ErrorContainer from "@/components/containers/ErrorContainer";
import LoadingContainer from "@/components/containers/LoadingContainer";
import SongPlayer from "@/components/songPlayer/SongPlayer";
import { useGetRequest } from "@/hooks/request";
import { useLocalSearchParams, useRouter } from "expo-router";

const PlayerPage = () => {
    const { id } = useLocalSearchParams();
    const { data, loading, error } = useGetRequest<IFrontendSongFull>(fetchSong(id as string), null, true)
    const router = useRouter();

    function fetchSong(_id: string) {
        return () => SongApi_GetSongById(_id);
    }

    return loading
    ? <LoadingContainer />
    : error
        ? <ErrorContainer goBackFn={() => router.replace("/(tabs)/songs")} />
        : <SongPlayer { ...data } />
};

export default PlayerPage;