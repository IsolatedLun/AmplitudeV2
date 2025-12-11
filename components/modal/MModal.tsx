import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import { ETypography_Theme } from "../typography/types";
import Typo from "../typography/Typo";
import { IMModal } from "./types";

const MModal = (props: IMModal) => {
    return(
        <Modal 
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            animationType="slide"
            backdropColor="hsla(0 0% 0% / 0.3)"
            visible={props.open}
        >
            { props.children }

            <TouchableOpacity onPress={props.closeFn}>
                <Typo 
                    theme={ETypography_Theme.Theme} 
                    style={styles.modalCloseText}>
                        Cancel
                </Typo>
            </TouchableOpacity>
    </Modal>
    )
};

const styles = StyleSheet.create({
    modalContainer: {
        margin: "auto",
        width: "70%"
    },
    modalCloseText: {
        marginInlineStart: "auto",
        marginBlockStart: 20
    }
})

export default MModal;