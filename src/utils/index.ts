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

const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    const suffix = date.getHours() >= 12 ? 'pm' : 'am';
    const hours = date.getHours() % 12 || 12;
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `created on ${day}${getOrdinalSuffix(
        day
    )} of ${month}, ${year} at ${hours}:${minutes}${suffix}`;
};

const getOrdinalSuffix = (day: number): string => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const lastDigit = day % 10;
    const suffixIndex =
        lastDigit === 1 ? 1 : lastDigit === 2 ? 2 : lastDigit === 3 ? 3 : 0;
    return suffixes[suffixIndex];
};
