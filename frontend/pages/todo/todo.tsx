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


export default function() {
    return (<SideBarElement></SideBarElement>)
}

const data = {
    "user": {
        "name": "cxw",
        "email": "thomas.derome@epitech.eu",
        "avatar": "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/1/b/8/1b85b9cd9cb10e440991a5f640b7312f7507370e.png",
    }
}

export const SideBarElement = () => {
    const isMobile = useIsMobile();

    return (
        <SidebarProvider>
            <Sidebar collapsible="icon">
                {/* HEAD SIDEBAR USER */}
                <SidebarHeader>
                    <SidebarMenuItem>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-10 w-10 rounded-lg">
                                        <AvatarImage src={data.user.avatar} alt={data.user.name}/>
                                        <AvatarFallback>{data.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-base leading-tight">
                                        <span className="truncate font-bold">{data.user.name}</span>
                                        <span className="truncate text-xs font-semibold">{data.user.email}</span>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">

                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarMenuItem>
                </SidebarHeader>
            </Sidebar>
        </SidebarProvider>
    );
};