import { capitalizeSentence } from '@/utils/funcs';
import { File, FileInfo, Paths } from 'expo-file-system';
import { getInfoAsync } from "expo-file-system/legacy";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import Btn from '../buttons/Btn';
import Typo from '../typography/Typo';
import { ETypography_FontSize, ETypography_Theme } from '../typography/types';
import FileInfoCard from './FileInfoCard';
import { IImageInput } from './types';

const ImageInput = (props: IImageInput) => {
    const [preview, setPreview] = useState<string>("");
    const [showPreview, setShowPreview] = useState(true);
    const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);

    useEffect(() => {
        if(!props.value) {
            setFileInfo(null);
            setShowPreview(false);
            setPreview("");
        }
    }, [props.value]);

    async function pickImage() {
        const req = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(!req.granted) return;

        const res = await ImagePicker.launchImageLibraryAsync({ quality: 1, allowsEditing: true });
        if(res.canceled)
            return props.onInput({ uri: "", name: "", type: "" });
        
        const uri: string = res.assets[0].uri;
        const f: File = new File(Paths.cache, uri);
        
        setPreview(uri);
        props.onInput({
            uri,
            name: f.name,
            type: f.type ?? "image/jpeg"
        });
        await getInfoAsync(uri).then(setFileInfo);
    }

    return(
        <View style={styles.container}>
            {
                preview && showPreview
                ? (
                    <Image 
                        source={{ uri: preview }} 
                        style={{ aspectRatio: "1", borderRadius: 12 }} 
                    />
                )
                : null
            }

            <TouchableOpacity onPress={pickImage}>
                <FileInfoCard fileInfo={fileInfo} icon="image" title="Press to Upload Image" />
            </TouchableOpacity>

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

            {
                preview 
                ? (
                    <Btn 
                        text={showPreview ? "Close preview" : "Open Preview"}
                        onPress={() => setShowPreview(prev => !prev)} 
                        style={styles.previewButton} 
                    />
                )
                : null
            }
        </View>
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
    previewButton: {
        marginInlineStart: "auto",
        marginBlockStart: 4
    },
    fileInfoContainer: {
        gap: 8
    }
})

export default ImageInput;