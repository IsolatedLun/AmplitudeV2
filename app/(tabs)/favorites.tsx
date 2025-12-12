import { SongApi_DeleteSong, SongApi_GetFavoriteSongs } from "@/api/song/songApi";
import { RGetSongs_Ok } from "@/api/song/types";
import { UserApi_ToggleFavorite } from "@/api/user/userApi";
import ErrorContainer from "@/components/containers/ErrorContainer";
import LoadingContainer from "@/components/containers/LoadingContainer";
import WordInput from "@/components/inputs/WordInput";
import SongCard from "@/components/songCard/SongCard";
import { useGetRequest } from "@/hooks/request";
import { useFocusEffect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const FavoritesTab = () => {
    const { data, loading, error, retryFn } = useGetRequest<RGetSongs_Ok>(fetchFavoriteSong(), [], true);
    const [searchValue, setSearchValue] = useState("");
    const [isBusy, setIsBusy] = useState(false);

    useFocusEffect(useCallback(() => {
        retryFn();
    }, []));

    function fetchFavoriteSong() {
        const tok = SecureStore.getItem("tok");
        return () => SongApi_GetFavoriteSongs(tok!);
    }

    async function handleDelete(id: string) {
            setIsBusy(true);
    
            const tok = SecureStore.getItem("tok"); 
            await SongApi_DeleteSong(id, tok!);
            
            setIsBusy(false);
            retryFn();
        }
    
        async function handleToggleFavorite(id: string) {
            setIsBusy(true);
    
            const tok = SecureStore.getItem("tok"); 
            await UserApi_ToggleFavorite(id, tok!);
            
            setIsBusy(false);
            retryFn();
        }

    return loading 
    ? <LoadingContainer />
    : error
        ? <ErrorContainer retryFn={retryFn} />
        : (
            (
            <View style={styles.container}>
                <WordInput 
                    onInput={setSearchValue}
                    value={searchValue} 
                    placeholder="Search favorite songs..."
                    title=""
                />

                <FlatList 
                    style={styles.songContainer}
                    contentContainerStyle={styles.songContentContainer}
                    data={data}
                    renderItem={x => <SongCard {...x.item} isFavorite={true} onDelete={handleDelete} onToggleFavorite={handleToggleFavorite} />}
                />
            </View>
        )
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    songContainer: {
        marginBlockStart: 20,
        gap: 20
    },
    songContentContainer: {
        gap: 32
    }
})

export default FavoritesTab;