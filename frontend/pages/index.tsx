'use client';

import { useRouter } from 'next/router';
import {useEffect} from "react";

export default function main() {
    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            router.push("/todo");
        } else {
            router.push('/login')
        }
    }, []);

}
