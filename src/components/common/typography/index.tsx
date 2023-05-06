interface TypographyProps {
    customClass?: string;
    children: React.ReactNode; // TODO: add other types
}

type ParagraphProps = TypographyProps &
    React.HTMLAttributes<HTMLParagraphElement>;
type HeadingProps = TypographyProps & React.HTMLAttributes<HTMLHeadingElement>;

const Paragraph: React.FC<ParagraphProps> = ({
    customClass = '',
    children,
    ...restProps
}) => {
    return (
        <p className={`comment ${customClass}`} {...restProps}>
            {children}
        </p>
    );
};

const Heading: React.FC<HeadingProps> = ({
    customClass = '',
    children,
    ...restProps
}) => {
    return (
        <h1 className={`comment ${customClass}`} {...restProps}>
            {children}
        </h1>
    );
};

export default { Paragraph, Heading };
