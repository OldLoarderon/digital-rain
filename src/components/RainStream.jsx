/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import useInterval from "@use-it/interval";

// Constants:
// Make sure we're using correct characters using RegEx and set up stream size:
const VALID_CHARS = `abcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"'#&_(),.;:?!\\|{}<>[]^~`;

// Feature: random char flip probability on stream lifetime (probability for character to change every re-render):
const STREAM_MUTATION_ODDS = 0.3;
// determining stream size (will be at random)
const MIN_STREAM_SIZE = 5;
const MAX_STREAM_SIZE = 50;

// Pick integer in the range
const getRandInRange = (min, max) =>
    Math.floor(Math.random() * (max - min)) + min;

const getRandChar = () =>
    VALID_CHARS.charAt(Math.floor(Math.random() * VALID_CHARS.length));

// Random size Array filled with random char
const genRandStream = () =>
    new Array(getRandInRange(MIN_STREAM_SIZE, MAX_STREAM_SIZE)) // [empty, empty, empty]
    .fill() // [undefined, undefined, undefined]
    .map(_ => getRandChar());

// sometimes I want the char to flip randomly, that's why I've iterated through whole stream, 
// if the mutation odds hit the char will flip, otherwise just fill it with the current one.
const getMutatedStream = stream => {
    const newStream = [];
    for (let i = 1; i < stream.length; i++) {
        if(Math.random() < STREAM_MUTATION_ODDS) {
            newStream.push(getRandChar());
        } else {
            newStream.push(stream[i])
        }
    }
    newStream.push(getRandChar())
    return newStream;
}

// main one stream function without interval delay
const RainStream = props => {
    const [stream, setStream] = useState(genRandStream())
    const [topPadding, setTopPadding] = useState(stream.length * -50)

    useInterval(() => {
        if (topPadding > window.innerHeight){
            setTopPadding(stream.length * -50)
        } else {
        setTopPadding(topPadding + 44)
        // setStream(stream => [ ...stream.slice(1, stream.length), getRandChar()]) that's the old way of slicing and mutating stream
        // setStream(stream => getMutatedStream(stream)); since that's a callback I can save some space and do this instead:
        setStream(getMutatedStream);
        }
    }, 100)

    return(
   <div
    style={{
        marginTop: topPadding,
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
                // if the character is the last one, turn it white. Else leave it be.
                color: index === stream.length - 1 ? '#fff' : undefined,
                // last chars in stream get more and more transparent
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