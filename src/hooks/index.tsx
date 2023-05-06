import { RefObject, useEffect, useRef } from 'react';

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
