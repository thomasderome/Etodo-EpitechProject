'use client'


import {Button} from "@/components/animate-ui/components/buttons/button";

export default function main() {
    return (
        <Button onClick={() => location.href = "/login"}>Login</Button>
    )
}