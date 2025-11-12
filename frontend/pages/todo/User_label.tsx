import * as React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface UserLabelProps {
    name: string,
    image: string,
    email: string
}

export function User_label({name, image, email}: UserLabelProps) {
    return (
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-10 w-10 rounded-lg">
                <AvatarImage src={image} alt={name}/>
                <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-base leading-tight">
                <span className="truncate font-bold">{name}</span>
                <span className="truncate text-xs font-semibold">{email}</span>
            </div>
        </div>
    );
}