/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState } from "react";
import useInterval from './useInterval'

// Make sure we're using correct characters using RegEx and set up stream size
const VALID_CHARS = `abcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"'#&_(),.;:?!\\|{}<>[]^~`;

const MIN_STREAM_SIZE = 15;
const MAX_STREAM_SIZE = 50;

// Pick integer in the range
const getRandInRange = (min, max) =>
    Math.floor(Math.random() * (max - min)) + min;

const getRandChar = () =>
    VALID_CHARS.charAt(Math.floor(Math.random() * VALID_CHARS.length));

// Random size Array filled with
const genRandStream = () =>
    new Array(getRandInRange(MIN_STREAM_SIZE, MAX_STREAM_SIZE)) // [empty, empty, empty]
    .fill() // [undefined, undefined, undefined]
    .map(_ => getRandChar())

const RainStream = props => {
    const [topPadding, setTopPadding] = useState(0)
    const stream = genRandStream();

    useInterval(() => {
        if (topPadding > window.innerHeight){
            setTopPadding(0)
        } else {
        setTopPadding(topPadding + 44)
        }
    }, 100)

    return(
   <div
    style={{
        fontFamily: "matrixFont",
        color: "#20c20e",
        writingMode: "vertical-rl",
        textOrientation: "upright",
        whiteSpace: "nowrap",
        userSelect: "none",
        textShadow: "0px 0px 8px rgba(32, 194, 14, 0.8)",
        fontSize: 50,
    }}>
    {stream.map((char, index) => (
        <a
            style={{
                // if the character is the last one, turn it white. If not, leave it be as it is.
                color: index === stream.length - 1 ? '#fff' : undefined,
                // first chars get more and more transparent
                opacity: index < 6 ? 0.1 + index * 0.15 : 1,
                textShadow:
                    index === stream.length - 1
                    ? '0px 0px 20px rgba(255, 255, 255, 1)'
                    :undefined,
                marginTop: -12,
            }}>
            {char}
        </a>
    ))}
    </div>
    );
};

export default RainStream;