import Chord from '@tombatossals/react-chords/lib/Chord'

export const ChordFigure = ({ className, children, chord, instrument, lite, ...props }) => {
    return (
        <figure {...props}
            className={`min-w-[370px] border border-red-500 ${className}`}>
            {children}

            <Chord
                chord={chord}
                instrument={instrument}
                lite={false}
            />

        </figure>
    )
}