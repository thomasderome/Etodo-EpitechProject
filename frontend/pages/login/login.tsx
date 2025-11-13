"use client";

import {
    Tabs,
    TabsContent,
    TabsContents,
    TabsList,
    TabsTrigger,
} from '@/components/animate-ui/components/animate/tabs';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusIcon } from 'lucide-react';
import {
    RippleButton,
    RippleButtonRipples,
    type RippleButtonProps,
} from '@/components/animate-ui/components/buttons/ripple';
import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import instance from "@/lib/axios";
import {FormEvent, useState} from "react";

interface RippleButtonDemoProps {
    variant: RippleButtonProps['variant'];
    size: RippleButtonProps['size'];
    type: RippleButtonProps['type'];
    form: RippleButtonProps['form'];
}

/* body de la page, tout ce qu'elle contient*/
export default function LoginPage (){
    return (
        <main className="-z-10">
            {/* importation élément background */}
            <StarsBackgroundDemo />
            <div className="relative z-10 flex flex-col items-center justify-center h-screen">
                {/* importation box connexion & création */}
                <AnimateTabsDemo />
            </div>
        </main>
    );
}
/*--- BOX Login / Register ---*/
export function AnimateTabsDemo() {
    /* Etats pour login*/
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    /* Etats pour login*/
    const [registerData, setRegisterData] = useState({
        name: '',
        firstname: '',
        email: '',
        password: '',
    })

    //  Gestion des changements d’input
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setLoginData(prev => ({ ...prev, [id.replace('-login', '')]: value }));
    };

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setRegisterData(prev => ({ ...prev, [id.replace('-register', '')]: value }));
    };

    const submitLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Login data:", loginData);

        instance.post("/login", loginData)
        .then((res) => {
            console.log(res);
            window.location.href = "/todo/todo";
        })
        .catch((err) => {
            console.log(err);
        })
    };

    const submitRegister = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Register data:", registerData)

        instance.post("/register", registerData)
            .then((res) => {
                console.log(res);
                window.location.href = "/todo/todo";
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <Tabs defaultValue="Login">
                <TabsList>
                    <TabsTrigger value="Login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <Card className="shadow-none py-0">
                    {/* --- Register tab --- */}
                    <TabsContents className="py-6">
                        <TabsContent value="Login" className="flex flex-col gap-6">
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>
                                    Enter you&apos;re log info here. Click Login when you&apos;re
                                    done.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="grid gap-6" id="formLogin" onSubmit={submitLogin}>
                                    <div className="grid gap-3">
                                        <Label htmlFor="tabs-demo-name">Email</Label>
                                        <Input id="email-login" type="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required={true} />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="tabs-demo-name">Password</Label>
                                        <Input id="password-login" type="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required={true} />
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter>
                                {/* l'élément ripple est le bouton login*/}
                                < SubmitButton variant={"default"} size={"default"} type="submit" form="formLogin" />
                            </CardFooter>
                        </TabsContent>
                        {/* --- Register tab --- */}
                        <TabsContent value="register" className="flex flex-col gap-6">
                            <CardHeader>
                                <CardTitle>Register</CardTitle>
                                <CardDescription>
                                    Create your account here. After saving, you&apos;ll be login.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="grid gap-6" id="formRegister" onSubmit={submitRegister}>
                                    <div className="grid gap-3">
                                        <Label htmlFor="tabs-demo-current">Name</Label>
                                        <Input id="name-register" type="text" placeholder="Name" value={registerData.name} onChange={handleRegisterChange} required={true} />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="tabs-demo-new">Last-name</Label>
                                        <Input id="firstname-register" type="text" placeholder="First-name" value={registerData.firstname} onChange={handleRegisterChange} required={true} />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="tabs-demo-new">Email</Label>
                                        <Input id="email-register" type="email" placeholder="Email" value={registerData.email} onChange={handleRegisterChange} required={true} />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="tabs-demo-new">Password</Label>
                                        <Input id="password-register" type="password" placeholder="Password" value={registerData.password} onChange={handleRegisterChange} required={true} />
                                    </div>
                                </form>
                            </CardContent>
                            <CardFooter>
                                {/* l'élément ripple est le bouton login*/}
                                <SubmitButton variant={"default"} size={"default"}  type="submit" form="formRegister" />
                            </CardFooter>
                        </TabsContent>
                    </TabsContents>
                </Card>
            </Tabs>
        </div>
    );
}

/*création star background*/
export const StarsBackgroundDemo = () => {
    const { resolvedTheme } = useTheme();
    const starColor =resolvedTheme === "dark" ? "#FFF" : "#000";

    return (
        <StarsBackground
            key={starColor}
            starColor={starColor}
            className={cn(
                'absolute inset-0 flex items-center justify-center rounded-xl',
                'dark:bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_100%)] bg-[radial-gradient(ellipse_at_bottom,_#f5f5f5_0%,_#fff_100%)]',
            )}
        />
    );
};

/* création du bouton ripple*/
export function SubmitButton({
                                             variant,
                                             size,
                                            type,
                                            form,
                                         }: RippleButtonDemoProps) {
    return (
        <RippleButton variant={variant} size={size} type={type} form={form} >
            {size === 'icon' ? <PlusIcon /> : 'Login'}
            <RippleButtonRipples />
        </RippleButton>
    );
}
