import Comment from '../comment';
import { InputType, CommentType } from '../../types';
import { DATA_ATTR, SELECTOR } from '../../constants';
import {
    deleteComment,
    findComment,
    generateNewComment,
    getTextFromCurrentCommentContainer,
} from '../../utils';

import './styles.scss';

interface CommentContainerProps {
    comments: Array<CommentType>;
    setComments: React.Dispatch<React.SetStateAction<Array<CommentType>>>;
}

const CommentContainer: React.FC<CommentContainerProps> = ({
    comments,
    setComments,
}) => {
    const onCommentActions = (e: React.ChangeEvent<any>) => {
        const actionType = e.target.dataset;
        const commentId = (
            e.target.closest(SELECTOR.COMMENT_WRAPPER) as HTMLElement
        )?.dataset.id;

        if (!commentId || !actionType) {
            return;
        }

        setComments((prevComments) => {
            let deepCopiedComments = structuredClone(
                prevComments
            ) as Array<CommentType>;

            if (!deepCopiedComments) return prevComments;

            if (actionType.buttonType === DATA_ATTR.DELETE) {
                deepCopiedComments = deleteComment(
                    deepCopiedComments,
                    commentId
                );

                return deepCopiedComments;
            }

            const targetComment = findComment(deepCopiedComments, commentId);

            if (!targetComment) return prevComments;

            if (actionType.buttonType === DATA_ATTR.REPLY) {
                targetComment.inputType = (
                    targetComment.inputType !== DATA_ATTR.POST
                        ? DATA_ATTR.POST
                        : null
                ) as InputType;

                return deepCopiedComments;
            }

            if (actionType.buttonType === DATA_ATTR.POST) {
                const newText = getTextFromCurrentCommentContainer(e.target);
                if (!newText) return deepCopiedComments;

                const newReply: CommentType = generateNewComment(newText);
                targetComment.replies.push(newReply);
                targetComment.inputType = null;

                return deepCopiedComments;
            }

            if (actionType.buttonType === DATA_ATTR.EDIT) {
                targetComment.inputType = (
                    targetComment.inputType !== DATA_ATTR.EDIT
                        ? DATA_ATTR.EDIT
                        : null
                ) as InputType;

                return deepCopiedComments;
            }

            if (actionType.buttonType === DATA_ATTR.CANCEL) {
                targetComment.inputType = null;

                return deepCopiedComments;
            }

            if (actionType.buttonType === DATA_ATTR.SAVE) {
                const newText = getTextFromCurrentCommentContainer(e.target);
                if (!newText) return deepCopiedComments;

                targetComment.text =
                    newText.length > 0 ? newText : targetComment.text;
                targetComment.inputType = null;

                return deepCopiedComments;
            }

            return deepCopiedComments;
        });
    };
    return (
        <div className="comment-container my-1" onClick={onCommentActions}>
            {comments.map((commentData) => (
                <Comment
                    key={commentData.id}
                    commentData={commentData}
                    depth={0}
                />
            ))}
        </div>
    );
};

export default CommentContainer;
