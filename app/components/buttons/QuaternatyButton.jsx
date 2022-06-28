export const QuaternaryButton = ({ className, children, ...props }) => {

    return (
        <button {...props}
            className={`w-4/5 h-10 rounded-3xl border border-quaternary bg-primary text-center text-base text-quaternary font-bold ${className}`}>
            {children}
        </button>
    )
}