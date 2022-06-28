import Image from 'next/image'

export const CrossInCircleImage = ({ className, children, pageOn, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image src="/media/cross-in-circle.svg" height={20} width={20} />
        </figure>
    )
}