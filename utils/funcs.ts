export function capitalizeSentence(x: string): string {
    return x.slice(0, 1).toUpperCase() + x.slice(1);
}

export function bytesToMB(x: number): number {
    return parseFloat((x / 1e+6).toPrecision(4));
}

export function getFileNameFromURI(x: string): string {
    return x.split("/").at(-1) ?? "";
}

export function formatToMinutes(s: number) {
    return(
        String(Math.floor(s / 60)).padStart(2, "0") 
        + ":" + 
        String(Math.floor(s % 60)).padStart(2, "0")
    );
}

// === 
export function createAuthHeader(tok: string) {
    return { "Authorization": "Bearer " + tok };
}