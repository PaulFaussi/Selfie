import { CreatorInterface } from "./creator.interface";

export interface NoteInterface {
    _id: string,
    title: string,
    category: string,
    body: string,
    isMarkdown: boolean,
    privacyMode: number,
    authList: string[],
    creationDate: Date,
    lastModificationDate: Date,
    creator: CreatorInterface
}
