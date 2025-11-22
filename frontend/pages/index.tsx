'use client'


import {Button} from "@/components/animate-ui/components/buttons/button";
import {useRouter} from "next/router";

export default function main() {
    const router = useRouter();

    return (
        <Button onClick={() => router.push("/login")}>Login</Button>
    )
}