export interface IMModal {
    children: React.ReactNode,
    open: boolean
    closeFn: () => void
}