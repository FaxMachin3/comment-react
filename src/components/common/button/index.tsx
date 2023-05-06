import './style.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    customClass?: string;
    children?: React.ReactNode; // TODO: add more types
}

const Button: React.FC<ButtonProps> = ({
    customClass = '',
    children,
    ...restProps
}) => {
    return (
        <button className={`button ${customClass}`} {...restProps}>
            {children}
        </button>
    );
};

export default Button;
