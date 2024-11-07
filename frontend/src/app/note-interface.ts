export interface NoteInterface {
    _id: string,
    title: string,
    body: string,
    isMarkdown: boolean,
    privacyMode: number,
    authList: string[],
    creationDate: Date,
    lastModificationDate: Date,
    creator: string
}
