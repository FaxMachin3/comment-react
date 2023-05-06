import Typography from '../common/typography';
import Button from '../common/button';

import { CommentType } from '../../types';

import './style.scss';
import { COMMENT } from '../../constants';
import TextArea from '../common/text-area';
import { useEffect, useRef } from 'react';

interface CommentProps {
    customClass?: string;
    commentData: CommentType;
    depth: number;
}

const Comment: React.FC<CommentProps> = ({
    customClass = '',
    commentData: { id, showBottom, text, replies, createdAt },
    depth,
}) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.value = showBottom === COMMENT.EDIT ? text : '';
        }
    }, [showBottom]);

    return (
        <div className={`comment ${customClass}`}>
            <div className="comment-wrapper" data-id={id}>
                <div className="comment-top">
                    <Typography.Paragraph data-comment={COMMENT.TEXT}>
                        {text}
                    </Typography.Paragraph>
                    <Button data-button-type={COMMENT.EDIT}>
                        {COMMENT.EDIT}
                    </Button>
                    <Button data-button-type={COMMENT.DELETE}>
                        {COMMENT.DELETE}
                    </Button>
                    <Button data-button-type={COMMENT.REPLY}>
                        {COMMENT.REPLY}
                    </Button>
                </div>
                {!!showBottom && (
                    <div className="comment-bottom">
                        <TextArea ref={textAreaRef} />
                        <Button data-button-type={COMMENT.CANCEL}>
                            {COMMENT.CANCEL}
                        </Button>
                        <Button
                            data-button-type={
                                showBottom === COMMENT.EDIT
                                    ? COMMENT.SAVE
                                    : showBottom
                            }
                        >
                            {showBottom === COMMENT.EDIT
                                ? COMMENT.SAVE
                                : showBottom}
                        </Button>
                    </div>
                )}
            </div>
            <div
                className="replies-container"
                style={{ marginLeft: `${depth + 1}rem` }}
            >
                {replies.map((reply) => (
                    <Comment
                        key={reply.id}
                        commentData={reply}
                        depth={depth + 1}
                    /> //! Shouldn't use index as key
                ))}
            </div>
        </div>
    );
};

export default Comment;
