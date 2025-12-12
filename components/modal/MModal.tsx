import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { ETypography_Theme } from "../typography/types";
import Typo from "../typography/Typo";
import { IMModal } from "./types";

const MModal = (props: IMModal) => {
    return(
        <Modal 
            animationType="slide"
            backdropColor="hsla(0 0% 0% / 0.3)"
            visible={props.open}
        >
            <View style={styles.modalContainer}>
                { props.children }
                <TouchableOpacity onPress={props.closeFn}>
                    <Typo 
                        theme={ETypography_Theme.Theme} 
                        style={styles.modalCloseText}>
                            Cancel
                    </Typo>
                </TouchableOpacity>
            </View>

    </Modal>
    )
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        marginInline: 32
    },
    modalCloseText: {
        marginInlineStart: "auto",
        marginBlockStart: 20
    }
})

export default MModal;