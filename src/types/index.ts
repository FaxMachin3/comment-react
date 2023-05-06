export type InputType = null | 'EDIT' | 'ADD REPLY';

export interface CommentType {
    id: string | number;
    inputType: InputType;
    text: string;
    replies: Array<CommentType>;
    createdAt: number;
}
