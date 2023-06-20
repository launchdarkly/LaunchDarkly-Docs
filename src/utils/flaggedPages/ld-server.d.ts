type isPathDisabled = (path: string) => boolean
export const getFlaggedPagesConfig: () => Promise<{ isPathDisabled }>
