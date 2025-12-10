import { StyleProp, ViewStyle } from "react-native";

export interface ICenterContainer {
    children: React.ReactNode,
    
    alignCenter?: boolean,
    style?: StyleProp<ViewStyle>
}

export interface IErrorContainer {
    retryFn?: () => void,
    goBackFn?: () => void
}