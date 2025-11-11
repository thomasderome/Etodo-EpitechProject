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
    SidebarMenuAction, SidebarSeparator,
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
import {IconButton} from "@/components/animate-ui/components/buttons/icon";

import { LogOut } from '@/components/animate-ui/icons/log-out'
import { Settings } from '@/components/animate-ui/icons/settings';
import { ChevronRight} from "@/components/animate-ui/icons/chevron-right";
import { SquarePlus } from '@/components/animate-ui/icons/square-plus'
import { Ellipsis } from "@/components/animate-ui/icons/ellipsis";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

import { User_label } from "@/pages/todo/User_label";
import {AnimateIcon} from "@/components/animate-ui/icons/icon";
import {Button} from "@/components/animate-ui/components/buttons/button";
import {HighlightItem} from "@/components/animate-ui/primitives/effects/highlight";
import {Brush} from "@/components/animate-ui/icons/brush";
import {Trash2} from "@/components/animate-ui/icons/trash-2";
import {DropdownMenuSub} from "@/components/ui/dropdown-menu";
import {BrushIcon, TrashIcon} from "lucide-react";

const data_source = {
    "user": {
        "name": "cxw",
        "email": "thomas.derome@epitech.eu",
        "avatar": "https://devforum-uploads.s3.dualstack.us-east-2.amazonaws.com/uploads/original/4X/1/b/8/1b85b9cd9cb10e440991a5f640b7312f7507370e.png",
    },
    "todo": [
        {"category": false, "title": "test_single", "id": "12c412", "edit": false}
    ]
}

export default function Todo_page() {
    // ADD SYSTEM FOR GET DATA INITAL AND APPLY
    const [data, setData] = React.useState(data_source);

    const isMobile = useIsMobile();

    // AUTO FOCUS SYSTEM CREATION NEW TODO
    const focus_item = React.useRef(null);

    React.useLayoutEffect(() => {
        setTimeout(() => {
            if (focus_item.current) {
                focus_item.current.focus();
                focus_item.current.selectionEnd;
            }
        }, 10)
    })


    // SYSTEM FOR EXIT AND VALID RENAME TODO
    function apply_rename(e) {
        {/* ADD THE REQUEST IN FUTURE FOR API */}
        if (e.key === "Enter" || !e.key) {
            e.preventDefault();
            e.target.contentEditable = false;

            // VERIFIE SI LE TITRE N'EST PAS VIDE AU SINON METTRE CELUI PAR DEFAUT
            if (!e.target.textContent) e.target.textContent = "New todo";

            // SYSTEM POUR SEND LES MODFIS NAME DE LA TODO
            // RECUPERE L'ID e.target.id et est son nom e.target.textContent
            const id_element = e.target.dataset.id;
            const filter = [...data.todo.filter((item) => item.id !== id_element)];
            setData({
                ...data,
                todo: [...filter, {
                    "category": false,
                    "title": e.target.textContent,
                    "id": e.target.dataset.id,
                    "edit": false
                }]
            });
        }
    }

    // SYSTEM FOR ENABLE RENAME
    function enable_rename(e) {
        // SYSTEM TRAVEL THROUGH EACH TODO AND ENABLE EDIT MOD ON SPECIFIC
        const id_element = e.target.dataset.id;
        const new_data = data.todo.map((item) => {
            console.log(id_element)
            if (item.id == id_element) return {...item, edit: true};
            else return {...item, edit: false};
            })
        setData({...data, todo: [...new_data]});
    }

    // SYSTEM FOR ADD TODO
    function add_todo(e) {
        {/* ADD THE REQUEST IN FUTURE FOR API */}
        setData({...data, todo: [...data.todo, {"category": false, "title": "New todo", "id": "12412", "edit": true}]});
    }

    function remove_todo(e) {
        {/* ADD THE REQUEST IN FUTURE FOR API */}
        const id_element = e.target.dataset.id;
        const filter = [...data.todo.filter((item) => item.id !== id_element)];
        setData({...data, todo: filter});
    }

    return (
        <SidebarProvider style={{ "--sidebar-width-icon": "0px"}}>
            <Sidebar collapsible="icon">

                {/* HEAD SIDEBAR USER */}
                <SidebarHeader>

                </SidebarHeader>
                <SidebarContent className="ml-2">
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
                                        {/* Add onclick in futur */}
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem>
                                                <div className="flex align-middle gap-2" >
                                                    <Settings />
                                                    <span className="text-sm font-semibold">Settings</span>
                                                </div>
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <div className="flex align-middle gap-2 " >
                                                    <LogOut className="h-4 w-4 text-red-600 "/>
                                                    <span className="text-sm font-semibold text-red-500">Log out</span>
                                                </div>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarMenuItem>
                    <Separator />
                    <SidebarGroupLabel>
                        <div className="flex">
                            <span className="text-sm">Todo</span>
                            <SquarePlus animateOnHover onClick={add_todo} className="ml-auto stroke-ring h-5" />
                        </div>
                    </SidebarGroupLabel>
                        {data.todo.map((todo_element) => (
                            todo_element.category ? (
                                <Collapsible asChild className="group/collapsible" key={todo_element.id}>
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton>
                                                {todo_element.title}
                                                <ChevronRight animateOnHover className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {todo_element.child_cat.map((todo_cat_element) => (
                                                    <SidebarMenuSubItem key={todo_cat_element.id}>
                                                        <SidebarMenuSubButton>
                                                            <span>{todo_cat_element.title}</span>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ) : (
                                <SidebarMenuItem key={todo_element.id} className="flex group">
                                    <SidebarMenuButton >
                                        <span className="focus:outline-indigo-50 focus:outline-1 focus:rounded-xs selection:bg-blue-500 max-w-200"
                                              contentEditable={todo_element.edit}
                                              ref={todo_element.edit ? focus_item : null}
                                              onBlur={apply_rename}
                                              onKeyDown={apply_rename}
                                              data-id={todo_element.id}
                                              suppressContentEditableWarning={true}>{todo_element.title}</span>
                                    </SidebarMenuButton>
                                    <DropdownMenu >
                                        <DropdownMenuTrigger className="outline-none"><Ellipsis className="w-4" animateOnHover /></DropdownMenuTrigger>

                                        <DropdownMenuContent side={isMobile ? 'bottom' : 'left'} align="start">
                                            <DropdownMenuLabel>Todo Interaction</DropdownMenuLabel>
                                            <DropdownMenuSeparator />

                                            <DropdownMenuGroup>
                                                <DropdownMenuItem onClick={enable_rename} data-id={todo_element.id}>
                                                    <Brush />
                                                    <span className="text-xs font-semibold">Rename</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={remove_todo} variant="destructive" data-id={todo_element.id}>
                                                    <TrashIcon className="text-red-600"/>
                                                    <span className="text-xs font-semibold text-red-500" >Rename</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </SidebarMenuItem>
                            )
                        ))}
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <header className="">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Breadcrumb>
                            <BreadcrumbItem>Name of todo</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </header>
            </SidebarInset>
        </SidebarProvider>
    );
};
