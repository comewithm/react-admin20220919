import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { decrement, increment } from "./counterSlice";

export function Counter() {
    const counter = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    return(
        <div className="w-200 h-400">
            <div className="flex flex-col justify-around items-center">
                <button
                    className="block"
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <div>{counter}</div>
                <button
                    className="block"
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
        </div>
    )
}