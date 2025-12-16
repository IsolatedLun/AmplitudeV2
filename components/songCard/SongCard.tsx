import { IFrontendSongPreview } from "@/api/types";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Btn from "../buttons/Btn";
import { EButtonBorderRadius } from "../buttons/types";
import { ColorSchemeContext } from "../contexts/ColorSchemeContext";
import MModal from "../modal/MModal";
import Icon from "../typography/Icon";
import { EIcon_Size, ETypography_FontSize, ETypography_FontType, ETypography_Theme } from "../typography/types";
import Typo from "../typography/Typo";
import { IFrontEndSongLocal } from "./types";

const SongCard = (props: IFrontendSongPreview & IFrontEndSongLocal) => {
    const router = useRouter();
    const { state: { styling } } = useContext(ColorSchemeContext);
    const [openModal, setOpenModal] = useState(false);
    const [isFavorite, setIsFavorite] = useState(props.isFavorite);


    function routeToSong() {
        router.replace(`/player/${props._id}` as any)
    }

    function closeModal() {
        setOpenModal(false);
    }

    function handleDeletePress() {
        setOpenModal(false);
        props.onDelete(props._id);
    }

    function handleToggleFavoritePress() {
        setIsFavorite(!isFavorite);
        setOpenModal(false);
        props.onToggleFavorite(props._id);
    }

    function handleEditPress() {
        setOpenModal(false);
        router.replace(`/edit/${props._id}` as any);
    }

    return(
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.detailContainer} onPress={routeToSong}>
                    <Image source={{ uri: props.image }} style={{ ...styles.image, borderRadius: styling.borderRadius.cubeRadius }} />
                    <View style={styles.textContainer}>
                        <Typo 
                            textProps={{ numberOfLines: 2, ellipsizeMode: "tail" }} 
                            fontSize={ETypography_FontSize.Large}
                            fontType={ETypography_FontType.Bold}
                        >
                                { props.title }
                        </Typo>
                        <Typo 
                            theme={ETypography_Theme.Muted}
                            fontSize={ETypography_FontSize.Small}
                        >
                                { props.author }
                        </Typo>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setOpenModal(true)}>
                    <Icon name="cog" size={EIcon_Size.Large} />
                </TouchableOpacity>
            </View>

            <MModal open={openModal} closeFn={closeModal}>
                <View style={styles.modalOptionsContainer}>
                    <Typo 
                        textProps={{ numberOfLines: 2 }} 
                        fontSize={ETypography_FontSize.Title}
                    >
                        { props.title }
                    </Typo>

                    <Btn 
                        text={isFavorite ? "Remove from favorites" : "Add to favorites"} 
                        icon="heart" 
                        borderRadiusMode={EButtonBorderRadius.Cube}
                        onPress={handleToggleFavoritePress}
                    />
                    <Btn 
                        text="Edit song" 
                        icon="pencil"
                        borderRadiusMode={EButtonBorderRadius.Cube}
                        onPress={handleEditPress}
                    />
                    <Btn 
                        text="Delete song" 
                        icon="trash-can"
                        borderRadiusMode={EButtonBorderRadius.Cube} 
                        onPress={handleDeletePress}
                    />
                </View>
            </MModal>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12
    },
    textContainer: {
        justifyContent: "center",
        gap: 4
    },
    detailContainer: {
        flexDirection: "row",
        flex: 1,
        gap: 16,
    },
    modalOptionsContainer: {
        gap: 16
    },
    image: {
        width: 80,
        height: 80,
    }
})

export default SongCard;