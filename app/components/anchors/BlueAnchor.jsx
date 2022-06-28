export const BlueAnchor = ({ className, children, ...props }) => {

    return (
        <a {...props}
            className={`text-xs text-myblue font-bold ${className}`}>
            {children}
        </a>
    )
}