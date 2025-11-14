'use client';

import * as React from 'react';
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
import { SquarePlus } from '@/components/animate-ui/icons/square-plus'
import { Ellipsis } from "@/components/animate-ui/icons/ellipsis";

import { useIsMobile } from '@/hooks/use-mobile';

import { User_label } from "@/components/User_label";
import { Brush } from "@/components/animate-ui/icons/brush";
import { Trash2 } from "@/components/animate-ui/icons/trash-2";
import {
    Dialog,
    DialogPanel,
    DialogHeader,
    DialogTitle,
    DialogFooter, DialogClose,
} from "@/components/animate-ui/components/headless/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {useEffect} from "react";
import {Loader} from "@/components/animate-ui/icons/loader"
import {CircleCheck} from "@/components/animate-ui/icons/circle-check"
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

interface TodoItem {
    "id": number;
    title: string;
    description: string;
    createdAt: string;
    due_time: string;
    status: string;
    user_id: string;
    edit: boolean;
}

interface User_type {
    id: string;
    email: string;
    name: string;
    password: string;
    created_at: string;
    firstname: string;
    avatar: string;
}

export default function Todo_page() {
    const isMobile = useIsMobile();

    const [data, setData] = React.useState(data_source);

    const [todo_data, set_todo_data] = React.useState<TodoItem[]>([]);
    const [user_data, set_user_data] = React.useState<User_type>();

    const [sidebar_state, set_sidebar_state] = React.useState<boolean>(!isMobile);
    const [setting_state, setting_set] = React.useState(false);

    // LOAD PAGE INFORMATION
    useEffect(() => {
        instance.get("/todos").then(response => {
            set_todo_data(response.data);
        }).catch((e) => {
            if (e.status === 403) {
                localStorage.removeItem("token");
                window.location.href = "/login";
            } else {
                alert("Failed to load todo");
            }
        });

        instance.get("/user").then(response => {
            set_user_data(response.data);
        }).catch((e) => {
                alert("Failed to load user data")
        });

    }, []);

    // AUTO FOCUS SYSTEM CREATION NEW TODO
    const focus_item: RefObject<HTMLSpanElement> = React.useRef(null);
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
            focus_item.current.focus();
        }

    })

    // SYSTEM FOR EXIT AND VALID RENAME TODO
    async function apply_rename(e: React.MouseEventHandler<HTMLButtonElement> | MouseEventHandler<HTMLButtonElement>) {
        if (e.key === "Enter" || !e.key) {
            e.preventDefault();
            e.currentTarget.contentEditable = false;

            // VERIFIE SI LE TITRE N'EST PAS VIDE AU SINON METTRE CELUI PAR DEFAUT
            if (!e.currentTarget.textContent) e.currentTarget.textContent = "New todo";

            // SYSTEM POUR SEND LES MODFIS NAME DE LA TODO
            // RECUPERE L'ID e.target.id et est son nom e.target.textContent
            const id_todo = e.currentTarget.dataset.id;

            const promise = todo_data.map(async (item) => {
                if (item.id == id_todo) {
                    const res = await instance.put(`/todos/${id_todo}`, {
                        ...item,
                        "due_time": item.due_time.slice(0, 19).replace('T', ' '),
                        "title": e.currentTarget.textContent
                    })
                    return {...res.data}
                }
                else return {...item};
            })
            const new_data = await Promise.all(promise);
            set_todo_data(new_data);
        }
    }

    // SYSTEM FOR ENABLE RENAME
    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function enable_rename(e: MouseEvent<HTMLDivElement, MouseEvent>) {
        // SYSTEM TRAVEL THROUGH EACH TODO AND ENABLE EDIT MOD ON SPECIFIC
        const id_element = e.currentTarget.dataset.id;

        const new_data = todo_data.map((item) => {
            if (String(item.id) == id_element) return {...item, edit: true};
            else return {...item, edit: false};
        })

        await sleep(100);
        set_todo_data(new_data);
    }

    // SYSTEM FOR ADD TODO
    function add_todo() {
        {/* ADD THE REQUEST IN FUTURE FOR API */}
        const date = new Date();

        instance.post("/todos", {
            "title": "New todo",
            "description": "No description",
            "due_time": `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            "status": "todo"
        })
            .then(res => {
                set_todo_data([...todo_data, {...res.data, "edit": true}]);
            })
            .catch(err => {
                alert("Failed create todo");
            })
    }

    async function remove_todo(e: MouseEvent<HTMLDivElement, MouseEvent>) {
        {/* ADD THE REQUEST IN FUTURE FOR API */}
        const id_element = e.currentTarget.dataset.id;

        await instance.delete(`/todos/${id_element}`)
            .then(res => {
                console.log(todo_data)
                const filter = [...todo_data.filter((item) => String(item.id) !== id_element)];
                set_todo_data([...filter]);
            })
            .catch(err => {
                alert("Failed for remove todo");
            })
    }

    function logout() {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    function setting() {
        set_sidebar_state(false);

        setTimeout(() => {
            setting_set(true);
        }, 150);
    }

    return (
        <>
            <Dialog open={setting_state} onClose={() => setting_set(false)} className="relative z-[50]">
                <DialogPanel>
                    <form>
                        <DialogHeader>
                            <DialogTitle>Account setting</DialogTitle>
                        </DialogHeader>
                        <div className="m-2 flex">
                            <div className="text-sm p-2">
                                <Label className="font-semibold p-1">Name:</Label>
                                <Input type="text" value={user_data?.name ? user_data.name : ""} onChange={(e) => set_user_data({...user_data, "name": e.currentTarget.value})} required/>
                            </div>
                            <div className="text-sm p-2">
                                <Label className="font-semibold p-1">Firstname:</Label>
                                <Input type="text" value={user_data?.firstname ? user_data.firstname : ""} onChange={(e) => set_user_data({...user_data, "firstname": e.currentTarget.value})} required></Input>
                            </div>
                        </div>
                        <div className="m-2 flex">
                            <div className="text-sm p-2">
                                <Label className="font-semibold p-1">Email:</Label>
                                <Input type="email" value={user_data?.email ? user_data.email : ""} onChange={(e) => set_user_data({...user_data, "email": e.currentTarget.value})} required/>
                            </div>
                            <div className="text-sm p-2">
                                <Label className="font-semibold p-1">Password:</Label>
                                <Input type="password" value={user_data?.password ? user_data.password : ""} onChange={(e) => set_user_data({...user_data, "password": e.currentTarget.value})} required/>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={() => setting_set(false)} type="button" variant="outline">Cancel</Button>
                            <Button onClick={apply_rename} type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogPanel>
            </Dialog>

            <SidebarProvider  style={{ "--sidebar-width-icon": "0px"}} onOpenChange={(state) => set_sidebar_state(state)} open={sidebar_state}>
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
                                                <User_label name={user_data?.firstname ? user_data.firstname : ""} image={user_data?.avatar ? user_data.avatar : ""} email={user_data?.email ? user_data.email : ""} />
                                            </SidebarMenuButton>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg mt-2"
                                                             side={isMobile ? 'bottom' : 'left'}
                                                             sideOffset={4}
                                                             onCloseAutoFocus={(e) => {e.preventDefault();}}>
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
                                    <SidebarMenuButton>
                                        <span className="focus:outline-indigo-50 focus:outline-1 focus:rounded-xs selection:bg-blue-500 max-w-54"
                                              contentEditable={todo_element?.edit ? todo_element.edit : false}
                                              ref={todo_element?.edit ? focus_item : null}
                                              onKeyDown={apply_rename}
                                              onBlur={apply_rename}
                                              data-id={todo_element.id}
                                              suppressContentEditableWarning={true}>{todo_element.title}</span>
                                    </SidebarMenuButton>

                                    { todo_element.status === 'in progress' ? (
                                        <Loader animateOnHover={true} className="w-4 mr-2" />
                                    ) : todo_element.status === 'done' ? (
                                        <CircleCheck animateOnHover={true} className="w-4 mr-2" />
                                    ): null }

                                    <DropdownMenu modal={false}>
                                        <DropdownMenuTrigger className="outline-none" onFocus={(e) => {e.preventDefault()}}><Ellipsis className="w-4" animateOnHover /></DropdownMenuTrigger>

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
                                                    <span className="text-xs font-semibold text-red-500" >Remove</span>
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
