import { SongApi_GetSongs } from "@/api/song/songApi";
import { RGetSongs_Ok } from "@/api/song/types";
import ErrorContainer from "@/components/containers/ErrorContainer";
import LoadingContainer from "@/components/containers/LoadingContainer";
import WordInput from "@/components/inputs/WordInput";
import SongCard from "@/components/songCard/SongCard";
import { useGetRequest } from "@/hooks/request";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const SongsTab = () => {
    const { data, loading, error, retryFn } = useGetRequest<RGetSongs_Ok>(SongApi_GetSongs, [], true);
    const [searchValue, setSearchValue] = useState("");

    useFocusEffect(useCallback(() => {
        if(data.length == 0 && !loading)
            retryFn();
    }, []));

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
                    placeholder="Search songs..." 
                    title=""
                />

                <FlatList 
                    style={styles.songContainer}
                    contentContainerStyle={styles.songContentContainer}
                    data={data}
                    renderItem={x => <SongCard {...x.item} />}
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

export default SongsTab;