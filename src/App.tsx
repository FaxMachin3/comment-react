import { useState } from 'react';

import CommentContainer from './components/comment-container';
import PostContainer from './components/post-container';
import { CommentType } from './types';

import './App.scss';

function App() {
    const [comments, setComments] = useState<Array<CommentType>>([]);
    console.log(comments);

    return (
        <>
            <PostContainer setComments={setComments} />
            <CommentContainer comments={comments} setComments={setComments} />
        </>
    );
}

export default App;
