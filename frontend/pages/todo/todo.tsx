'use client';

import * as React from 'react';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarRail,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
    SidebarMenuAction,
} from '@/components/animate-ui/components/radix/sidebar';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/animate-ui/primitives/radix/collapsible';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/animate-ui/components/radix/dropdown-menu';
import {
    AudioWaveform,
    BadgeCheck,
    Bell,
    BookOpen,
    Bot,
    ChevronRight,
    ChevronsUpDown,
    Command,
    CreditCard,
    Folder,
    Forward,
    Frame,
    GalleryVerticalEnd,
    LogOut,
    Map,
    MoreHorizontal,
    PieChart,
    Plus,
    Settings2,
    Sparkles,
    SquareTerminal,
    Trash2,
} from 'lucide-react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import {Span} from "next/dist/server/lib/trace/tracer";

import { User_label } from "@/pages/todo/User_label";

const data = {
    "user": {
        "name": "cxw",
        "email": "thomas.derome@epitech.eu",
        "avatar": "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/1/b/8/1b85b9cd9cb10e440991a5f640b7312f7507370e.png",
    },
    "todo": [
        {"cotegory": true, "title": "test", child: [
                {"name": "test1"},
                {"name": "test2"},
                {"name": "test3"}
            ]
        },
        {"cotegory": false, "title": "test_single"}
    ]
}

export default function Todo_page() {
    const isMobile = useIsMobile();

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                {/* HEAD SIDEBAR USER */}
                <SidebarHeader>
                    <SidebarMenuItem>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                            <User_label name={data.user.name} image={data.user.avatar} email={data.user.email} />
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg mt-2"
                                                            side={isMobile ? 'bottom' : 'left'}
                                                            sideOffset={4}>
                                        {/* Ajout onclick in futur */}
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <div className="flex align-middle gap-2">
                                                    <Settings2 />
                                                    <span className="text-sm font-semibold">Settings</span>
                                                </div>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>

                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <div className="flex align-middle gap-2">
                                                <LogOut className="h-4 w-4 text-red-600"/>
                                                <span className="text-sm font-semibold text-red-500">Log out</span>
                                            </div>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarMenuItem>
                </SidebarHeader>
                <SidebarContent className="ml-2">
                    <SidebarGroupLabel>Todo</SidebarGroupLabel>
                    <Collapsible
                        asChild
                        className="group/collapsible"
                    >
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
                    </Collapsible>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    );
};
