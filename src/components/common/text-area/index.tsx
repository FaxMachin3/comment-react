import { ForwardedRef, Ref, forwardRef } from 'react';

interface TextAreaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    customClass?: string;
    ref?: ForwardedRef<HTMLTextAreaElement>;
}

const TextArea: React.FC<TextAreaProps> = forwardRef(
    ({ customClass = '', ...restProps }, ref: Ref<HTMLTextAreaElement>) => {
        return (
            <textarea
                ref={ref}
                className={`text-area ${customClass}`}
                {...restProps}
            />
        );
    }
);

export default TextArea;
