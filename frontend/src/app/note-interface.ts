export interface NoteInterface {
    _id: string,
    title: string,
    category: string,
    body: string,
    isMarkdown: boolean,
  // FIXME privacyMode sarebbe?
    privacyMode: number,
    authList: string[],
    creationDate: Date,
    lastModificationDate: Date,
    creator: string
}
