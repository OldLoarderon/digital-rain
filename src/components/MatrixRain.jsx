import RainStream from "./RainStream";

const MatrixRain = () => {
    // Wanted to determine how many of stream I could fit on screen.
    // In CSS the fontsize (height) is 50px, I've assumed here by trial and error a font width of 26px.
    const streamCount = Math.floor(window.innerWidth / 26);
    return(
        <div
        style = {{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            background: "black",
            display: "flex",
        }}>
            {/* set a number of streams displayed, based on const streamCount */}
            {new Array(streamCount).fill().map(_ => (
                <RainStream />
            ))}
        </div>
    )
}
export default MatrixRain;