import Image from 'next/image'

export const EyePasswordImage = ({ className, children, pageOn, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image src="/media/eye-password.svg" height={12} width={16} />
        </figure>
    )
}