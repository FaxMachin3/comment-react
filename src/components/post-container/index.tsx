import { useState } from 'react';

import Button from '../common/button';
import TextArea from '../common/text-area';
import { CommentType } from '../../types';
import { BUTTON_TEXT, PLACEHOLDER } from '../../constants';
import { generateNewComment } from '../../utils';

import './styles.scss';

interface PostContainerProps {
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
}

const PostContainer: React.FC<PostContainerProps> = ({ setComments }) => {
    const [comment, setComment] = useState<string>('');

    const onAddComment = () => {
        if (comment.length === 0) return;

        const newComment: CommentType = generateNewComment(comment);
        setComments((prevComments) => [...prevComments, newComment]);
    };

    const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    return (
        <div className="post-container">
            <TextArea
                placeholder={PLACEHOLDER.ADD_COMMENT}
                customClass="mb-1"
                onChange={onTextAreaChange}
                value={comment}
            />
            <Button onClick={onAddComment}>{BUTTON_TEXT.POST}</Button>
        </div>
    );
};

export default PostContainer;
