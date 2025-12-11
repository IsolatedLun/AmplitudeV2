import { capitalizeSentence, formatToMinutes } from "@/utils/funcs";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { getDocumentAsync } from "expo-document-picker";
import { FileInfo } from "expo-file-system";
import { getInfoAsync } from "expo-file-system/legacy";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import IconButton from "../iconButton/IconButton";
import SongSlider from "../sliders/SongSlider";
import { ETypography_FontSize, ETypography_Theme } from "../typography/types";
import Typo from "../typography/Typo";
import FileInfoCard from "./FileInfoCard";
import { IAudioInput } from "./types";


const AudioInput = (props: IAudioInput) => {
    const player = useAudioPlayer(null);
    const playerState = useAudioPlayerStatus(player);
    const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);

    useEffect(() => {
        if(!props.value) {
            if(player.playing) {
                player.pause();
            }
            setFileInfo(null);
        }
    }, [props.value]);

    async function pickAudio() {
        const res = await getDocumentAsync({ type: "audio/*", copyToCacheDirectory: true });
        if(res.canceled) return;

        const uri: string = res.assets[0].uri;
        props.onInput({
            uri,
            name: res.assets[0].name!,
            type: res.assets[0].mimeType ?? "audio/mpeg"
        });
        await getInfoAsync(uri).then(setFileInfo);
        player.replace(uri);
    }


    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={pickAudio}>
                    <FileInfoCard fileInfo={fileInfo} icon="music-note" title="Press to Upload Song" />
            </TouchableOpacity>
            {
                fileInfo
                ? (
                    <View style={styles.playerPreviewContainer}>
                        <View style={styles.playerPreviewTimeContainer}>
                            <Typo theme={ETypography_Theme.Muted}>
                                { formatToMinutes(player.currentStatus.currentTime) }
                            </Typo>
                            <SongSlider 
                                onChange={(v) => player.seekTo(v * player.duration)}
                                value={playerState.currentTime / playerState.duration}
                            />
                            <Typo theme={ETypography_Theme.Muted}>
                                { formatToMinutes(player.currentStatus.duration) }
                            </Typo>
                        </View>
                        <IconButton
                            name={player.currentStatus.playing ? "pause" : "play"}
                            onPress={() => player.currentStatus.playing ? player.pause() : player.play()} 
                        />
                    </View>
                ) : null
            }

            { props.error ? 
                <Typo
                    style={{ marginInlineStart: 8 }}
                    fontSize={ETypography_FontSize.Small}
                    theme={ETypography_Theme.Error}
                >
                    { capitalizeSentence(props.error) }
                </Typo> 
                : null
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 8
    },
    playerPreviewContainer: {
        marginBlock: 12,
        gap: 10
    },
    playerPreviewTimeContainer: {
        flexDirection: "row",
    }
})

export default AudioInput;