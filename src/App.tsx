import { useCommentState } from './hooks';
import CommentContainer from './components/comment-container';
import PostContainer from './components/post-container';

import './App.scss';

function App() {
    const { comments, setComments } = useCommentState();

    return (
        <>
            <PostContainer setComments={setComments} />
            <CommentContainer comments={comments} setComments={setComments} />
        </>
    );
}

export default App;
