import { NotificationImage } from '../../components'

export function Header({ className, title, page, ...props }) {
    return (
        <header className={`w-full shadow-custom-items p-4 flex justify-between items-center ${className}`} {...props}>
            <p className="text-3xl font-bold text-myblack">{title}</p>
            {title === 'Explore' && <NotificationImage className="w-8 h-8 flex justify-center items-center" />}
        </header>
    )
}