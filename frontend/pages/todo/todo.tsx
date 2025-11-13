'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import instance from "@/lib/axios";

import {
    Breadcrumb,
    BreadcrumbItem,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
} from '@/components/animate-ui/components/radix/sidebar';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/animate-ui/components/radix/dropdown-menu';

import { LogOut } from '@/components/animate-ui/icons/log-out'
import { Settings } from '@/components/animate-ui/icons/settings';
import { ChevronRight} from "@/components/animate-ui/icons/chevron-right";
import { SquarePlus } from '@/components/animate-ui/icons/square-plus'
import { Ellipsis } from "@/components/animate-ui/icons/ellipsis";

import { useIsMobile } from '@/hooks/use-mobile';

import { User_label } from "@/pages/todo/User_label";
import { Brush } from "@/components/animate-ui/icons/brush";
import { Trash2 } from "@/components/animate-ui/icons/trash-2";
import {
    Dialog,
    DialogPanel,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from "@/components/animate-ui/components/headless/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {useEffect} from "react";

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

    const [todo_data, set_todo_data] = React.useState();
    const [user_data, set_user_data] = React.useState();
    const [settings_data, set_setting_data] = React.useState();

    // VARIABLE SYSTEM
    const isMobile = useIsMobile();

    const [setting_open, setting_set] = React.useState(false);
    const [data_setting, set_data_setting] = React.useState({
        "name": "test",
        "last_name": "test",
        "email": "dsq",
        "password": ""
    })

    // AUTO FOCUS SYSTEM CREATION NEW TODO
    const focus_item = React.useRef(null);
    React.useLayoutEffect(() => {
        if (focus_item.current) {
            focus_item.current.focus();

            const range = document.createRange();
            // SELECT THE ELEMENT FOR CHANGE THE RANGE
            range.selectNodeContents(focus_item.current);
            // SET THE CURSOR TO THE END
            range.collapse(false);

            const sel = window.getSelection();
            if (sel) {
                // REMOVE THE PLACEMENT OF CURRENT CURSOR
                sel.removeAllRanges();
                // SET THE NEW RANGE OF CURSOR
                sel.addRange(range);
            }
        }

    })

    // SYSTEM FOR EXIT AND VALID RENAME TODO
    function apply_rename(e) {
        {/* ADD THE REQUEST IN FUTURE FOR API */}
        if (e.key === "Enter" || !e.key) {
            e.preventDefault();
            e.currentTarget.contentEditable = false;

            // VERIFIE SI LE TITRE N'EST PAS VIDE AU SINON METTRE CELUI PAR DEFAUT
            if (!e.currentTarget.textContent) e.currentTarget.textContent = "New todo";

            // SYSTEM POUR SEND LES MODFIS NAME DE LA TODO
            // RECUPERE L'ID e.target.id et est son nom e.target.textContent
            const id_todo = e.currentTarget.dataset.id;

            const new_data = todo_data.map((item: {}) => {
                if (item.id == id_todo) {
                    instance.put(`/todos/${id_todo}`, {
                        ...item,
                        "title": e.currentTarget.textContent
                    })
                        .then((res) => {
                            return {...item, "title": e.currentTarget.textContent, edit: false};
                        })
                        .catch((err) => {
                            alert("Failed to rename");
                        })
                }
                else return {...item};
            })
            setData(new_data);
        }
    }

    // SYSTEM FOR ENABLE RENAME
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function enable_rename(e) {
        // SYSTEM TRAVEL THROUGH EACH TODO AND ENABLE EDIT MOD ON SPECIFIC
        const id_element = e.currentTarget.dataset.id;
        console.log(id_element)
        const new_data = data.todo.map((item) => {
            if (item.id == id_element) return {...item, edit: true};
            else return {...item, edit: false};
        })

        await sleep(10);
        setData({...data, todo: [...new_data]});
    }

    // SYSTEM FOR ADD TODO
    function add_todo(e) {
        {/* ADD THE REQUEST IN FUTURE FOR API */}
        const date = new Date();

        instance.post("/todos", {
            "title": "New todo",
            "description": "Noe description",
            "due_time": `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        })
            .then(res => {
                set_todo_data([...todo_data, {...res.data, "edit": true}]);
            })
            .catch(err => {
                alert("Failed create todo");
            })
    }

    function remove_todo(e) {
        {/* ADD THE REQUEST IN FUTURE FOR API */}
        const id_element = e.currentTarget.dataset.id;
        const filter = [...data.todo.filter((item) => item.id !== id_element)];
        setData({...data, todo: filter});
    }

    function logout() {
        localStorage.removeItem("token");
        window.location.href = "/login/login";
    }

    function setting() {
        setting_set(true);

    }

    return (
        <>
            <Dialog open={setting_open} onClose={() => setting_set(false)} className="relative z-[50]">
                <DialogPanel>
                    <form>
                        <DialogHeader>
                            <DialogTitle>Account setting</DialogTitle>
                        </DialogHeader>
                        <div className="m-2 flex">
                            <div className="text-sm p-2">
                                <Label className="font-semibold p-1">Name:</Label>
                                <Input type="text" value={data_setting.name} onChange={(e) => set_data_setting({...data_setting, "name": e.currentTarget.value})} required/>
                            </div>
                            <div className="text-sm p-2">
                                <Label className="font-semibold p-1">Last-name:</Label>
                                <Input type="text" value={data_setting.last_name} onChange={(e) => set_data_setting({...data_setting, "last_name": e.currentTarget.value})} required></Input>
                            </div>
                        </div>
                        <div className="m-2 flex">
                            <div className="text-sm p-2">
                                <Label className="font-semibold p-1">Email:</Label>
                                <Input type="email" value={data_setting.email} onChange={(e) => set_data_setting({...data_setting, "email": e.currentTarget.value})} required/>
                            </div>
                            <div className="text-sm p-2">
                                <Label className="font-semibold p-1">Password:</Label>
                                <Input type="password" value={data_setting.password} onChange={(e) => set_data_setting({...data_setting, "password": e.currentTarget.value})} required/>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={() => setting_set(false)} variant="outline">Cancel</Button>
                            <Button onClick={apply_rename} type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogPanel>
            </Dialog>

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
                                                <DropdownMenuItem onClick={setting}>
                                                    <div className="flex align-middle gap-2" >
                                                        <Settings />
                                                        <span className="text-sm font-semibold">Settings</span>
                                                    </div>
                                                </DropdownMenuItem>

                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={logout}>
                                                    <div className="flex align-middle gap-2 " >
                                                        <LogOut className="h-4 w-4 text-red-600 "/>
                                                        <span className="text-sm font-semibold text-red-500">Logout</span>
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
                        {todo_data.map((todo_element) => (
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

                                        <DropdownMenuContent side={isMobile ? 'bottom' : 'left'} align="start" onCloseAutoFocus={(e) => {e.preventDefault();}}>
                                            <DropdownMenuLabel>Todo Interaction</DropdownMenuLabel>
                                            <DropdownMenuSeparator />

                                            <DropdownMenuGroup>
                                                <DropdownMenuItem onClick={enable_rename} data-id={todo_element.id}>
                                                    <Brush />
                                                    <span className="text-xs font-semibold">Rename</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={remove_todo} variant="destructive" data-id={todo_element.id}>
                                                    <Trash2 className="text-red-600"/>
                                                    <span className="text-xs font-semibold text-red-500" >Rename</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </SidebarMenuItem>
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
        </>
    );
};
