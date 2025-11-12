import * as React from 'react';

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem
} from "@/components/animate-ui/components/radix/sidebar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/animate-ui/primitives/radix/collapsible';
import {ChevronRight} from "lucide-react";

interface Category_todo_Props {
    todo_list: string[];
}

export function Render({todo_list}: Category_todo_Props) {
    return (
        <Collapsible
            asChild
            className="group/collapsible"
        >
            {todo_element.category ? (
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                            Test
                            <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild>
                                    <span>test</span>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            ) : (
                <SidebarMenuItem>
                    <CollapsibleTrigger>
                        <span></span>
                    </CollapsibleTrigger>
                </SidebarMenuItem>
            )}
            ))}
        </Collapsible>
    )
}