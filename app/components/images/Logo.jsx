import Image from 'next/image'

export const Logo = ({ className, ...props }) => {

    return (
        <figure className={`flex items-center justify-center ${className}`} {...props} >
            <Image src="/media/logo.png" width={200} height={200}>
            </Image>
        </figure>
    )
}

{/* <figure className={`w-72 h-72 rounded-full bg-white flex items-center justify-center ${className}`} {...props} >
<img className="w-48" src="/media/logo.png">
</img>
</figure> */}