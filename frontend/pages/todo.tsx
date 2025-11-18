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
    DialogFooter,
} from "@/components/animate-ui/components/headless/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {useEffect} from "react";
import {Loader} from "@/components/animate-ui/icons/loader"
import {CircleCheck} from "@/components/animate-ui/icons/circle-check"
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/animate-ui/components/headless/checkbox';


interface TodoItem {
    id: number;
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

interface Setting_type {
    name: string;
    email: string;
    password: string;
    firstname: string;
}

interface task_interface {
    header: {
        id_todo: number;
        title: string;
    },
    task_list: {
        id: number;
        title: string;
        description: string;
        status: "todo" | "done";
    }[]
}

const data = {
    header: {
        id_todo: 10,
        title: "Test",
    },
    task_list: [
        {id: 45, title:"test", description:"Test 1", status:"todo"},
        {id: 44, title:"tesszgt", description:"Test 2", status:"done"}
    ]
}

export default function Todo_page() {
    const isMobile = useIsMobile();

    const [todo_data, set_todo_data] = React.useState<TodoItem[]>([]);
    const [user_data, set_user_data] = React.useState<User_type>();
    const [sidebar_state, set_sidebar_state] = React.useState<boolean>(!isMobile);
    const [task_data, set_task_data] = React.useState<task_interface | null>(null);

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

    async function remove_todo(e: React.MouseEvent<HTMLDivElement>) {
        {/* ADD THE REQUEST IN FUTURE FOR API */}
        const id_element = e.currentTarget.dataset.id;

        await instance.delete(`/todos/${id_element}`)
            .then(res => {
                const filter = [...todo_data.filter((item) => String(item.id) !== id_element)];
                set_todo_data([...filter]);
                set_task_data(null);
            })
            .catch(err => {
                alert("Failed for remove todo");
            })
    }

    // SYSTEM FOR DISPLAY TASK IN TODO

    async function display_task(e: React.MouseEvent<HTMLDivElement>){
        const title = e.currentTarget.dataset.title
        const id = Number(e.currentTarget.dataset.id)

        if (title && id) {
            instance.get(`/tasks/${id}`)
                .then(res => {
                    set_task_data({
                        header: {
                            id_todo: id,
                            title: title
                        },
                        task_list: res.data
                    })
                })
        }
    }

    // FUNCTION THAT ADD NEW INPUT
    async function appendTask(e: React.MouseEvent<HTMLDivElement> | React.KeyboardEventHandler<HTMLDivElement>){
        if ("key" in e){
            if (e.key !== "Enter") return;
        }
        if (task_data) {
            await instance.post("/tasks", {
                title: "New task",
                description: "New description",
                todo_id: task_data.header.id_todo
            })
                .then(res => {
                    set_task_data({
                        header: {...task_data.header},
                        task_list: [...task_data.task_list, res.data]
                    })
                })
        }

    }

    // FUNCTION THAT CHANGE VALUE
    function changeTaskTitle(e: React.KeyboardEvent<HTMLInputElement>) {
        e.currentTarget.dataset.update = "true";
        const newData = task_data?.task_list.map((task) => {
            if (e.currentTarget.dataset.id === String(task.id)) {
                return {...task, title: e.currentTarget.value};
            } else {
                return task;
            }
        })
        if (task_data && newData) {
            set_task_data({
                header: {...task_data.header},
                task_list: newData
            })
        }

    }

    async function sendChangeValue(e: React.MouseEvent<HTMLInputElement>){
        const currentTarget = e.currentTarget;
        if (task_data && e.currentTarget.dataset?.update === "true") {
            await instance.put(`/tasks/${e.currentTarget.dataset.id}`, {
                title: e.currentTarget.value ? e.currentTarget.value : "New task"
            }).then(res => {
                const newData = task_data?.task_list.map((task) => {
                    if (currentTarget.dataset.id === String(task.id)) {
                        return res.data;
                    } else {
                        return task;
                    }
                })
                set_task_data({
                    header: {...task_data.header},
                    task_list: newData
                })
            })
            currentTarget.dataset.update = "false";        }
    }

    async function changeTaskState(e: React.ChangeEvent<HTMLInputElement>) {
        const currentTarget = e.currentTarget;
        if (task_data) {
            await instance.patch(`/tasks/check/${e.currentTarget.dataset.id}`)
                .then(res => {
                    const newData = task_data?.task_list.map((task) => {
                        if (currentTarget.dataset.id === String(task.id)) {
                            return res.data;
                        } else {
                            return task;
                        }
                })
                set_task_data({
                    header: {...task_data.header},
                    task_list: newData
                })
            })
        }
    }


    const [setting_data, set_setting_data] = React.useState<Setting_type>();
    const [setting_state, set_setting_state] = React.useState(false);
    function logout() {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    function setting() {
        set_setting_data({"name": user_data?.name,
                            "email": user_data?.email,
                            "firstname": user_data?.firstname,
                            "password": ""});
        set_sidebar_state(false);

        setTimeout(() => {
            set_setting_state(true);
        }, 150);
    }

    function setting_apply(e) {
        e.preventDefault();
        set_setting_state(false);

        instance.put("/user", setting_data)
            .then(res => {
                set_user_data(res.data);
            })
            .catch(err => {
                alert("Failed for update user information");
            })
    }

    return (
        <>
            <Dialog open={setting_state} onClose={() => set_setting_state(false)} className="relative z-[50]">
                <DialogPanel>
                    <form>
                        <DialogHeader>
                            <DialogTitle>Account setting</DialogTitle>
                        </DialogHeader>
                        <div className="m-2 flex">
                            <div className="text-sm p-2">
                                <Label className="font-semibold p-1">Name:</Label>
                                <Input type="text" value={setting_data?.name ? setting_data.name : ""} onChange={(e) => set_setting_data({...setting_data, "name": e.currentTarget.value})} required/>
                            </div>
                            <div className="text-sm p-2">
                                <Label className="font-semibold p-1">Firstname:</Label>
                                <Input type="text" value={setting_data?.firstname ? setting_data.firstname : ""} onChange={(e) => set_setting_data({...setting_data, "firstname": e.currentTarget.value})} required></Input>
                            </div>
                        </div>
                        <div className="m-2 flex">
                            <div className="text-sm p-2">
                                <Label className="font-semibold p-1">Email:</Label>
                                <Input type="email" value={setting_data?.email ? setting_data.email : ""} onChange={(e) => set_setting_data({...setting_data, "email": e.currentTarget.value})} required/>
                            </div>
                            <div className="text-sm p-2">
                                <Label className="font-semibold p-1">Password:</Label>
                                <Input type="password" onChange={(e) => set_setting_data({...setting_data, "password": e.currentTarget.value})} required/>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={() => set_setting_state(false)} type="button" variant="outline">Cancel</Button>
                            <Button onClick={setting_apply} type="submit">Save changes</Button>
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
                                    <SidebarMenuButton data-title={todo_element.title} data-id={todo_element.id} onClick={display_task}>
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
                                <BreadcrumbItem>{task_data ? task_data.header.title : "Choose Todo"}</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                    </header>

                    {/* DIV todo list */}
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        {task_data ? task_data.task_list.map((task_element) => (
                            <div key={task_element.id} className="flex " onKeyDown={appendTask} >
                                <div className="flex items-center gap-x-3">
                                    <Checkbox size="default" data-id={task_element.id} checked={task_element.status === "done"} onClick={changeTaskState} />
                                    <Input type="text" maxLength={255} data-id={task_element.id} value={task_element.title} onChange={changeTaskTitle}  onBlur={sendChangeValue}/>
                                    <Trash2 className="text-red-600" animateOnHover/>
                                </div>
                            </div>
                        )) : (<div>Choose todo</div>)}
                        <div className="h-full " onClick={appendTask}>
                        </div>
                    </div>

                </SidebarInset>
            </SidebarProvider>
        </>
    );
};
