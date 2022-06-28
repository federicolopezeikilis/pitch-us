import { SecondaryButton, Fieldset, Input, Label } from '../../components'

export function Title3({ className, children, ...props }) {
    return (
        <h3 className={`text-secondarygrey ${className}`}>
            {children}
        </h3>
    )
}