import { useState } from 'react';
import { nanoid } from 'nanoid';

import Button from '../common/button';
import TextArea from '../common/text-area';
import { CommentType } from '../../types';

interface PostContainerProps {
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
}

const PostContainer: React.FC<PostContainerProps> = ({ setComments }) => {
    const [comment, setComment] = useState<string>('');

    const onAddComment = () => {
        if (comment.length === 0) return;

        const newComment: CommentType = {
            id: nanoid(),
            showBottom: null,
            text: comment,
            replies: [],
            createdAt: Date.now(),
        };
        setComments((prevComments) => [...prevComments, newComment]);
    };

    const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    return (
        <div className="post-container">
            <TextArea onChange={onTextAreaChange} value={comment} />
            <Button onClick={onAddComment}>ADD COMMENT</Button>
        </div>
    );
};

export default PostContainer;
