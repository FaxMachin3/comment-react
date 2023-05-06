import { nanoid } from 'nanoid';
import { CommentType } from '../types';
import { SELECTOR } from '../constants';

export const generateNewComment = (text: string): CommentType => {
    return {
        id: nanoid(),
        inputType: null,
        text,
        replies: [],
        createdAt: Date.now(),
    };
};

export const deleteComment = (
    comments: Array<CommentType>,
    commentId: string
): Array<CommentType> => {
    const filteredComments = comments.filter((comment) => {
        if (comment.id === commentId) {
            return false;
        } else if (comment.replies.length > 0) {
            comment.replies = deleteComment(comment.replies, commentId);
        }

        return true;
    });

    return filteredComments;
};

export const findComment = (
    deepCopiedComments: Array<CommentType>,
    commentId: string
): CommentType | undefined => {
    for (const comment of deepCopiedComments) {
        if (comment.id === commentId) {
            return comment;
        }

        const foundComment = findComment(comment.replies, commentId);

        if (foundComment) {
            return foundComment;
        }
    }

    return undefined;
};

export const getTextFromCurrentCommentContainer = (target: HTMLElement) => {
    const commentBottom = target.closest(
        SELECTOR.COMMENT_BOTTOM
    ) as HTMLElement;
    if (!commentBottom) return null;

    const newText = (commentBottom.firstChild as HTMLTextAreaElement)?.value;

    return newText;
};
