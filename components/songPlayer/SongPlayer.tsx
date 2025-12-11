import { IFrontendSongFull } from '@/api/types';
import { formatToMinutes } from '@/utils/funcs';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { Image, StyleSheet, View } from "react-native";
import CenterContainer from "../containers/CenterContainer";
import { ColorSchemeContext } from '../contexts/ColorSchemeContext';
import IconButton from '../iconButton/IconButton';
import { EIconButton_Size, EIconButton_Theme } from '../iconButton/types';
import SongSlider from '../sliders/SongSlider';
import { ETypography_FontSize, ETypography_Theme } from '../typography/types';
import Typo from '../typography/Typo';

const SongPlayer = (props: IFrontendSongFull) => {
    const router = useRouter();
    const player = useAudioPlayer(props.audio);
    const status = useAudioPlayerStatus(player);
    const { state: { theme } } = useContext(ColorSchemeContext);

    function handlePlayPress() {
        if(status.playing)
            player.pause();
        else
            player.play();
    }

    function handleLoopPress() {
        player.loop = !player.loop;
    }

    function handleGoBack() {
        router.replace("/(tabs)/songs");
    }

    function handleVolumePress() {
        player.muted = !player.muted;
    }

    return(
        <>
            <Image 
                source={{ uri: props.image }}
                style={styles.backgroundImage}
                blurRadius={32}
            />
            <CenterContainer style={styles.container}>
                <View style={styles.upperControlsContainer}>
                    <IconButton 
                        name="arrow-left"
                        theme={EIconButton_Theme.Transparent}
                        size={EIconButton_Size.Huge}
                        onPress={handleGoBack}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Image source={{ uri: props.image }} style={styles.thumbnailImage} />
                    <View style={styles.contentTextContainer}>
                        <Typo 
                            fontSize={ETypography_FontSize.Title}
                            textProps={{ numberOfLines: 2 }}
                        >
                                { props.title }
                        </Typo>
                        <Typo theme={ETypography_Theme.Muted}>{ props.author }</Typo>
                    </View>
                </View>
                <View style={styles.timeContainer}>
                    <SongSlider
                        value={(status.currentTime / status.duration)}
                        onChange={v => player.seekTo(v * status.duration)}
                    />

                    <View style={styles.timeContentContainer}>
                        <Typo>{ formatToMinutes(status.currentTime) }</Typo>
                        <Typo>{ formatToMinutes(status.duration) }</Typo>
                    </View>
                </View>
                <View style={styles.controlsContent}>
                    <IconButton
                        name={!player.currentStatus.mute ? "volume-high" : "volume-mute"} 
                        theme={EIconButton_Theme.Transparent}
                        size={EIconButton_Size.Huge}
                        onPress={handleVolumePress} 
                    />

                    <IconButton 
                        name={!status.playing ? "play" : "pause"} 
                        size={EIconButton_Size.Gigantic}
                        onPress={handlePlayPress} 
                    />

                    <IconButton 
                        name={!player.currentStatus.loop ? "repeat-off" : "repeat"} 
                        theme={EIconButton_Theme.Transparent}
                        size={EIconButton_Size.Huge}
                        onPress={handleLoopPress} 
                    />
                </View>
            </CenterContainer>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 32
    },
    contentContainer: {
        gap: 16
    },
    contentTextContainer: {
        gap: 2
    },
    upperControlsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8
    },
    controlsContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 36
    },
    timeContainer: {
        gap: 8
    },
    timeContentContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    backgroundImage: {
        position: "absolute",
        inset: 0,
        opacity: 0.67
    },
    thumbnailImage: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 16,
    }
})

export default SongPlayer;