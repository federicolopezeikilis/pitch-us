import { SearchImage, ButtonBlue } from '..'

export function SearchForm({ className, children, onChangeInput, onCancelClick, ...props }) {
    return (
        <form className={`w-full h-10 flex items-center justify-between gap-2 ${className}`} >
            <div className="w-full border border-inputBorder rounded-lg bg-inputBg pl-4 flex items-center">
                <SearchImage className="w-6 h-6" />
                <input className="h-10 w-full py-3 px-4 bg-inputBg focus:outline-none placeholder-black placeholder-opacity-50 text-sm text-mygrey"
                type="search"
                placeholder="Artists or songs"
                    onChange={onChangeInput} />
            </div>
            <ButtonBlue type="reset" onClick={onCancelClick}>Cancel</ButtonBlue>
        </form>
    )
}