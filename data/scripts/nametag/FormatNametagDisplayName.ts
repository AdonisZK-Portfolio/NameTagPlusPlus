export function formatNametagDisplayName(name: string): string {
    const lowerName = name.toLowerCase();
    return lowerName.replace(/(^|[ _-])([a-z])/g, (_match, separator: string, letter: string) => {
        return `${separator}${letter.toUpperCase()}`;
    });
}
