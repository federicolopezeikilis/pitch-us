export const ButtonBlue = ({ className, children, ...props }) => {
    return (
        <button {...props}
            className={`font-bold text-myblue ${className}`}>
            {children}
        </button>
    )
}