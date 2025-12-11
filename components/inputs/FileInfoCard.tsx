import { bytesToMB } from "@/utils/funcs";
import { StyleSheet, View } from "react-native";
import Card from "../card/Card";
import Icon from "../typography/Icon";
import { EIcon_Size, EIcon_Theme, ETypography_Theme } from "../typography/types";
import Typo from "../typography/Typo";
import { IFileInfoCard } from "./types";

const FileInfoCard = (props: IFileInfoCard) => {
    return(
        <Card style={styles.uploadContainer}>
            <View style={styles.uploadPlaceholderContainer}>
                <Icon 
                    name={props.icon} 
                    size={EIcon_Size.Medium} 
                    theme={EIcon_Theme.Muted} 
                />
                <Typo theme={ETypography_Theme.Muted}>
                    { props.title }
                </Typo>
            </View>

            {
                props.fileInfo
                ? (
                    <View style={styles.fileInfoContainer}>
                        <View style={{ flex: 1 }}>
                            <Typo theme={ETypography_Theme.Muted}>
                                Name: { props.fileInfo.uri!.split("/").pop()?.replaceAll("-", " ") }
                            </Typo>
                        </View>
                        <Typo theme={ETypography_Theme.Muted}>
                            Size: { bytesToMB(props.fileInfo.size!) }Mb
                        </Typo>
                    </View>
                )
                : null
            }
        </Card>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 8
    },
    uploadContainer: {
        gap: 10
    },
    uploadPlaceholderContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    fileInfoContainer: {
        gap: 8
    }
})

export default FileInfoCard;