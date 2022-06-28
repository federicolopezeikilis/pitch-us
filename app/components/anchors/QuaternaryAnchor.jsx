export const QuaternaryAnchor = ({ className, children, ...props }) => {

    return (
        <a {...props}
            className={`w-4/5 h-10 flex items-center justify-center rounded-3xl border border-quaternary bg-primary text-base text-quaternary font-bold ${className}`}>
            {children}
        </a>
    )
}