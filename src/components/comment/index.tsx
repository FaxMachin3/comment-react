import Typography from '../common/typography';
import Button from '../common/button';
import { CommentType } from '../../types';
import { BUTTON_TEXT, DATA_ATTR, PLACEHOLDER } from '../../constants';
import TextArea from '../common/text-area';
import { useCustomRefWithCallback } from '../../hooks';

import './style.scss';

interface CommentProps {
    customClass?: string;
    commentData: CommentType;
    depth: number;
}

const Comment: React.FC<CommentProps> = ({
    customClass = '',
    commentData: { id, inputType, text, replies, createdAt },
    depth,
}) => {
    const textAreaRef = useCustomRefWithCallback<HTMLTextAreaElement>(
        (textAreaRef) => {
            textAreaRef.current!.value =
                inputType === DATA_ATTR.EDIT ? text : '';
        },
        [inputType]
    );

    return (
        <div className={`comment p-1 ${customClass}`}>
            <div className="comment-wrapper" data-id={id}>
                <div className="comment-top mb-1">
                    <div className="comment-text p-1 mb-1">
                        <Typography.Paragraph
                            customClass="comment-para"
                            data-comment={DATA_ATTR.TEXT}
                        >
                            {text}
                        </Typography.Paragraph>
                    </div>
                    <div className="comment-actions">
                        <Button
                            customClass="mr-1"
                            data-button-type={DATA_ATTR.EDIT}
                        >
                            {BUTTON_TEXT.EDIT}
                        </Button>
                        <Button
                            customClass="mr-1"
                            data-button-type={DATA_ATTR.DELETE}
                        >
                            {BUTTON_TEXT.DELETE}
                        </Button>
                        <Button data-button-type={DATA_ATTR.REPLY}>
                            {BUTTON_TEXT.REPLY}
                        </Button>
                    </div>
                </div>
                {!!inputType && (
                    <div className="comment-bottom">
                        <TextArea
                            placeholder={PLACEHOLDER.ADD_REPLY}
                            ref={textAreaRef}
                            customClass="reply-text-area mb-1"
                        />
                        <div className="comment-actions">
                            <Button
                                customClass="mr-1"
                                data-button-type={DATA_ATTR.CANCEL}
                            >
                                {BUTTON_TEXT.CANCEL}
                            </Button>
                            <Button
                                data-button-type={
                                    inputType === DATA_ATTR.EDIT
                                        ? DATA_ATTR.SAVE
                                        : inputType
                                }
                            >
                                {inputType === DATA_ATTR.EDIT
                                    ? BUTTON_TEXT.SAVE
                                    : BUTTON_TEXT.POST}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
            <div
                className="replies-container"
                style={{ marginLeft: `${depth + 5}rem` }}
            >
                {replies.map((reply) => (
                    <Comment
                        key={reply.id}
                        commentData={reply}
                        depth={depth + 1}
                    />
                ))}
            </div>
        </div>
    );
};

export default Comment;
