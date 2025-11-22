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
    DialogFooter
} from "@/components/animate-ui/components/headless/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {useEffect} from "react";
import {Loader} from "@/components/animate-ui/icons/loader"
import {CircleCheck} from "@/components/animate-ui/icons/circle-check"
import { useRouter } from "next/navigation";
import {ExternalLink} from "@/components/animate-ui/icons/external-link";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

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

interface Share_Type {
    id: number;
    todo_list_id: number;
    title: string;
    status: string;
    user_id: string;
    mode: boolean;
}

interface Share_Setting_Type {
    all_shares: {
        email: string;
        id: number;
        mode: boolean;
    }[]

    todo_list: {
        id: number;
    }
}

export default function Todo_page() {
    const router = useRouter();

    const isMobile = useIsMobile();

    const [todo_data, set_todo_data] = React.useState<TodoItem[]>([]);
    const [user_data, set_user_data] = React.useState<User_type>();
    const [share_data, set_share_data] = React.useState<Share_Type[] | null>(null)
    const [sidebar_state, set_sidebar_state] = React.useState<boolean>(!isMobile);

    const [setting_data, set_setting_data] = React.useState<Setting_type | null>(null);
    const [setting_state, set_setting_state] = React.useState(false);

    const [share_state, set_share_state] = React.useState<boolean>(false);
    const [share_setting, set_share_setting] = React.useState<Share_Setting_Type>();
    const [share_mode, set_share_mode] = React.useState<boolean>(false);
    const [add_share_errer, set_add_share_errer] = React.useState<boolean>(false);

    // LOAD PAGE INFORMATION
    useEffect(() => {
        instance.get("/todos").then(response => {
            set_todo_data(response.data);
        }).catch((e) => {
            if (e.status === 403) {
                localStorage.removeItem("token");
                router.push("/login");
            } else {
                alert("Failed to load todo");
            }
        });

        instance.get("/user").then(response => {
            set_user_data(response.data);
        }).catch(() => {
            alert("Failed to load user data")
        });

        instance.get("/share").then(res => {
            set_share_data(res.data);
        }).catch(() => {
            alert("Failed to load share todo")
        })

    }, []);

    // AUTO FOCUS SYSTEM CREATION NEW TODO
    const focus_item = React.useRef<HTMLSpanElement>(null);
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
    async function apply_rename(e: React.FocusEvent<HTMLSpanElement> | React.KeyboardEvent<HTMLSpanElement>) {
        if ("key" in e) {
            if (e.key !== "Enter")  {
                return;
            }
        }

        e.currentTarget.contentEditable = "false";

        // VERIFIE SI LE TITRE N'EST PAS VIDE AU SINON METTRE CELUI PAR DEFAUT
        if (!e.currentTarget.textContent) e.currentTarget.textContent = "New todo";

        // SYSTEM POUR SEND LES MODFIS NAME DE LA TODO
        // RECUPERE L'ID e.target.id et est son nom e.target.textContent
        const id_todo = e.currentTarget.dataset.id;

        const promise = todo_data.map(async (item) => {
            if (item.id == Number(id_todo)) {
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

    // SYSTEM FOR ENABLE RENAME
    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function enable_rename(e: React.MouseEvent<HTMLDivElement>) {
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
            .catch(() => {
                alert("Failed create todo");
            })
    }

    async function remove_todo(e: React.MouseEvent<HTMLDivElement>) {
        {/* ADD THE REQUEST IN FUTURE FOR API */}
        const id_element = e.currentTarget.dataset.id;

        await instance.delete(`/todos/${id_element}`)
            .then(() => {
                const filter = [...todo_data.filter((item) => String(item.id) !== id_element)];
                set_todo_data([...filter]);
            })
            .catch(() => {
                alert("Failed for remove todo");
            })
    }

    function logout() {
        localStorage.removeItem("token");
        router.push("/login");
    }

    function setting() {
        set_setting_data({name: user_data?.name ?? "name-default",
                            email: user_data?.email ?? "email-default.com",
                            firstname: user_data?.firstname ?? "fistname-default",
                            password: ""});

        set_setting_state(true);
    }

    function setting_apply(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        instance.put("/user", setting_data)
            .then(res => {
                set_user_data(res.data);
            })
            .catch(() => {
                alert("Failed for update user information");
            })
    }

    function open_share_setting(e: React.MouseEvent<HTMLDivElement>) {
        const id = e.currentTarget.dataset.id;
        instance.get(`/share/setting/${id}`)
        .then(res => {
            set_share_setting({
                todo_list: {id: Number(id)},
                all_shares: res.data
            });
            set_share_state(true);
        }).catch(() => {
            alert("Failed to load share setting");
        })
    }

    function create_share(e: React.FormEvent<HTMLFormElement>) {
        if (share_setting) {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);

            instance.post("/share/setting/", {
                todo_list_id: share_setting?.todo_list.id,
                mode: share_mode,
                email: formData.get("email")
            }).then(res => {
                set_share_setting({
                    ...share_setting,
                    all_shares: [...share_setting?.all_shares, res.data]
                })
            }).catch(() => {
                set_add_share_errer(true);
            })
        }
    }

    function remove_share(e: React.MouseEvent<SVGSVGElement>) {
        if (share_setting) {
            const share_id = e.currentTarget.dataset.id;
            instance.delete(`/share/setting/${share_id}`)
                .then(() => {
                    set_share_setting({
                        ...share_setting,
                        all_shares: share_setting.all_shares.filter((item) => share_id !== String(item.id))
                    });
                }).catch(() => {
                alert("Failed to remove share");
            })
        }
    }

    function change_mode_share(e: React.MouseEvent<HTMLButtonElement>) {
        if (share_setting) {
            const share_id = e.currentTarget.dataset.id;
            instance.patch(`/share/setting/${share_id}`)
                .then(() => {
                    const modif = share_setting?.all_shares.map((item) => {
                        if (String(item.id) === share_id) return {...item, mode: !item.mode};
                        return item;
                    })
                    set_share_setting({
                        ...share_setting,
                        all_shares: modif
                    });
                }).catch(() => {
                alert("Failed to change mode");
            })
        }

    }

    return (
        <>
            <Dialog open={setting_state} onClose={() => set_setting_state(false)} className="fixed inset-0 z-[100] flex items-center justify-center">
                <DialogPanel>
                    <form>
                        <DialogHeader>
                            <DialogTitle>Account setting</DialogTitle>
                        </DialogHeader>
                        <div className="m-2 flex">
                            <div className="text-sm p-2">
                                <Label className="font-semibold p-1">Name:</Label>
                                <Input type="text" value={setting_data?.name ? setting_data.name : ""} onChange={(e) => set_setting_data(setting_data ? {...setting_data, "name": e.currentTarget.value} : null)} required/>
                            </div>
                            <div className="text-sm p-2">
                                <Label className="font-semibold p-1">Firstname:</Label>
                                <Input type="text" value={setting_data?.firstname ? setting_data.firstname : ""} onChange={(e) => set_setting_data(setting_data ? {...setting_data, "firstname": e.currentTarget.value} : null)} required></Input>
                            </div>
                        </div>
                        <div className="m-2 flex">
                            <div className="text-sm p-2">
                                <Label className="font-semibold p-1">Email:</Label>
                                <Input type="email" value={setting_data?.email ? setting_data.email : ""} onChange={(e) => set_setting_data(setting_data ? {...setting_data, "email": e.currentTarget.value} : null)} required/>
                            </div>
                            <div className="text-sm p-2">
                                <Label className="font-semibold p-1">Password:</Label>
                                <Input type="password" onChange={(e) => set_setting_data(setting_data ? {...setting_data, "password": e.currentTarget.value} : null)} required/>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={() => set_setting_state(false)} type="button" variant="outline">Cancel</Button>
                            <Button onClick={setting_apply} type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogPanel>
            </Dialog>

            <Dialog open={share_state} onClose={() => set_share_state(false)} className="fixed inset-0 z-[100] flex items-center justify-center">
                <DialogPanel>
                    <DialogHeader className="mb-3">
                        <DialogTitle>Share setting</DialogTitle>
                    </DialogHeader>

                    <div className="m-2 flex ">
                        <form id="createShare" onSubmit={create_share} className={"flex"}>
                            <TooltipProvider >
                                <Tooltip open={add_share_errer} >
                                    <TooltipTrigger asChild >
                                        <Input type={"email"} name={"email"} required/>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="z-[150] bg-red-500 text-white border-red-600 ">
                                        <p>This account not exist</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </form>

                        <Button className="ml-1" type={"button"} onClick={() => set_share_mode(!share_mode)} >
                            {share_mode ? "Write" : "Read-only"}
                        </Button>

                        <Button className="ml-0.5" type={"submit"} form="createShare" >
                            <SquarePlus className="stroke-ring" />
                        </Button>
                    </div>

                    {share_setting?.all_shares.map((share) => (
                        <div className="m-2 overflow-y-scroll max-h-52" key={share.id}>
                            <div className="border-2 rounded-md p-2 flex mb-2">
                                <span className="ml-1 bg-muted p-1 rounded-md">{share.email}</span>
                                <Button type="button" className="h-7 ml-auto" variant="secondary" onClick={change_mode_share} data-id={share.id}>{share.mode ? "Write" : "Read-only"}</Button>
                                <Trash2 className="text-red-600 w-4 ml-3" animateOnHover onClick={remove_share} data-id={share.id}/>
                            </div>
                        </div>
                    ))}

                    <DialogFooter className="mt-8">
                        <Button onClick={() => set_share_state(false)} type="button">Done</Button>
                    </DialogFooter>
                </DialogPanel>
            </Dialog>

            <SidebarProvider  style={{ "--sidebar-width-icon": "0px"} as React.CSSProperties} onOpenChange={(state) => set_sidebar_state(state)} open={sidebar_state}>
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
                                                <DropdownMenuItem onClick={open_share_setting} data-id={todo_element.id}>
                                                    <ExternalLink />
                                                    <span className="text-xs font-semibold">Share</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator/>
                                                <DropdownMenuItem onClick={remove_todo} variant="destructive" data-id={todo_element.id}>
                                                    <Trash2 className="text-red-600"/>
                                                    <span className="text-xs font-semibold text-red-500" >Remove</span>
                                                </DropdownMenuItem>

                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </SidebarMenuItem>
                        ))}

                    {share_data && share_data.length > 0 ? (
                        <>
                            <SidebarGroupLabel className="mt-5">
                                <div className="flex">
                                    <span className="text-sm">Share</span>
                                </div>
                            </SidebarGroupLabel>

                            {share_data.map((share_element) => (
                                <SidebarMenuItem key={share_element.id} className="flex group">
                                    <SidebarMenuButton>
                                            <span className="focus:outline-indigo-50 focus:outline-1 focus:rounded-xs selection:bg-blue-500 max-w-54"
                                                  data-id={share_element.todo_list_id}>{share_element.title}</span>
                                    </SidebarMenuButton>
                                    { share_element.status === 'in progress' ? (
                                        <Loader animateOnHover={true} className="w-4 mr-2" />
                                    ) : share_element.status === 'done' ? (
                                        <CircleCheck animateOnHover={true} className="w-4 mr-2" />
                                    ): null }

                                </SidebarMenuItem>
                            ))}
                        </>
                    ) : null}
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
