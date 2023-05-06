export type CommentBottom = null | 'EDIT' | 'ADD REPLY';

export interface CommentType {
    id: string | number;
    showBottom: CommentBottom;
    text: string;
    replies: Array<CommentType>;
    createdAt: number;
}
