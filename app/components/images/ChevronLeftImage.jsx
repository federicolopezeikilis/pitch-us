import Image from 'next/image'

export const ChevronLeftImage = ({ className, children, pageOn, color, ...props }) => {
    return (
        <figure className={`flex items-center justify-center ${className}`} {...props}>
            <Image 
            src={color === 'green' ?
            '/media/chevron-left-green.svg' :
            '/media/chevron-left.svg'} 
            height={11.22} width={6.94} />
        </figure>
    )
}