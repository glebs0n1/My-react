const Button = ({ href, children }) => {
    return (
        <a href={href} className="button-class">
            {children}
        </a>
    );
};

export default Button;
