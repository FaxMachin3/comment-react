import { RefObject, useEffect, useRef, useState } from 'react';
import { CommentType } from '../types';
import { PERSISTENT_STORE } from '../constants';

export const useCommentState = () => {
    const [comments, setComments] = useState<Array<CommentType>>(() => {
        const commentFromLocalStorage = localStorage.getItem(
            PERSISTENT_STORE.COMMENTS
        );
        return !!commentFromLocalStorage
            ? JSON.parse(commentFromLocalStorage)
            : [];
    });

    useEffect(() => {
        localStorage.setItem(
            PERSISTENT_STORE.COMMENTS,
            JSON.stringify(comments)
        );
    }, [comments]);

    return { comments, setComments };
};

export const useCustomRefWithCallback = <T,>(
    callback: (ref: RefObject<T>) => void,
    deps: any[] = []
) => {
    const ref = useRef<T>(null);

    useEffect(() => {
        if (ref.current) {
            callback?.(ref);
        }
    }, deps);

    return ref;
};
