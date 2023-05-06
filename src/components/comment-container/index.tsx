import Comment from '../comment';
import { CommentBottom, CommentType } from '../../types';
import { COMMENT } from '../../constants';
import { nanoid } from 'nanoid';

interface CommentContainerProps {
    comments: Array<CommentType>;
    setComments: React.Dispatch<React.SetStateAction<Array<CommentType>>>;
}

const deleteComment = (
    comments: Array<CommentType>,
    commentId: string
): Array<CommentType> => {
    const filteredComments = comments.filter((comment) => {
        if (comment.id === commentId) {
            // If the comment matches the specified ID, filter it out.
            return false;
        } else if (comment.replies.length > 0) {
            // If the comment has replies, recursively filter them.
            comment.replies = deleteComment(comment.replies, commentId);
        }

        return true;
    });

    return filteredComments;
};

const findComment = (
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

const CommentContainer: React.FC<CommentContainerProps> = ({
    comments,
    setComments,
}) => {
    const onCommentActions = (e: React.ChangeEvent<any>) => {
        const actionType = e.target.dataset;
        const commentId = (e.target.closest('.comment-wrapper') as HTMLElement)
            ?.dataset.id;

        if (!commentId || !actionType) {
            return;
        }

        setComments((prevComments) => {
            let deepCopiedComments = structuredClone(
                prevComments
            ) as Array<CommentType>;

            if (!deepCopiedComments) return prevComments;

            if (actionType.buttonType === COMMENT.DELETE) {
                deepCopiedComments = deleteComment(
                    deepCopiedComments,
                    commentId
                );
                return deepCopiedComments;
            }

            const targetComment = findComment(deepCopiedComments, commentId);

            if (!targetComment) return prevComments;

            if (actionType.buttonType === COMMENT.REPLY) {
                targetComment.showBottom = (
                    targetComment.showBottom !== COMMENT.ADD_REPLY
                        ? COMMENT.ADD_REPLY
                        : null
                ) as CommentBottom;
                return deepCopiedComments;
            }

            if (actionType.buttonType === COMMENT.ADD_REPLY) {
                const commentBottom = e.target.closest(
                    '.comment-bottom'
                ) as HTMLElement;
                if (!commentBottom) return deepCopiedComments;

                const newText = (
                    commentBottom.firstChild as HTMLTextAreaElement
                )?.value;

                const newReply: CommentType = {
                    id: nanoid(),
                    showBottom: null,
                    text: newText,
                    replies: [],
                    createdAt: Date.now(),
                };
                targetComment.replies.push(newReply);
                targetComment.showBottom = null;
                return deepCopiedComments;
            }

            if (
                actionType.comment === COMMENT.TEXT ||
                actionType.buttonType === COMMENT.EDIT
            ) {
                targetComment.showBottom = (
                    targetComment.showBottom !== COMMENT.EDIT
                        ? COMMENT.EDIT
                        : null
                ) as CommentBottom;
                return deepCopiedComments;
            }

            if (actionType.buttonType === COMMENT.CANCEL) {
                targetComment.showBottom = null;
                return deepCopiedComments;
            }

            if (actionType.buttonType === COMMENT.SAVE) {
                const commentBottom = e.target.closest(
                    '.comment-bottom'
                ) as HTMLElement;
                if (!commentBottom) return deepCopiedComments;

                const newText = (
                    commentBottom.firstChild as HTMLTextAreaElement
                )?.value;

                if (!newText) return deepCopiedComments;

                targetComment.text =
                    newText.length > 0 ? newText : targetComment.text;
                targetComment.showBottom = null;
                return deepCopiedComments;
            }

            return deepCopiedComments;
        });
    };
    return (
        <div className="comment-container" onClick={onCommentActions}>
            {comments.map((commentData) => (
                <Comment
                    key={commentData.id}
                    commentData={commentData}
                    depth={0}
                /> //! Shouldn't use index as key
            ))}
        </div>
    );
};

export default CommentContainer;
