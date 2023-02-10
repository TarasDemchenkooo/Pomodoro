import React from "react"
import { BodyStats } from "./BodyStats.tsx/BodyStats"
import { HeaderStats } from "./HeaderStats/HeaderStats"

export const Stats = () => {
    return (
        <>
            <HeaderStats />
            <BodyStats />
        </>
    )
}