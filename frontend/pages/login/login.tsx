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

interface RippleButtonDemoProps {
    variant: RippleButtonProps['variant'];
    size: RippleButtonProps['size'];
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
/*création de la box de connexion et création de compte*/
export function AnimateTabsDemo() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <Tabs defaultValue="Login">
                <TabsList>
                    <TabsTrigger value="Login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <Card className="shadow-none py-0">
                    <TabsContents className="py-6">
                        <TabsContent value="Login" className="flex flex-col gap-6">
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>
                                    Enter you&apos;re log info here. Click Login when you&apos;re
                                    done.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-name">Email</Label>
                                    <Input id="tabs-demo-name" type="email" placeholder="Email" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-name">Password</Label>
                                    <Input id="tabs-demo-name" type="password" placeholder="Password"/>
                                </div>
                            </CardContent>
                            <CardFooter>
                                {/* l'élément ripple est le bouton login*/}
                                < RippleButtonDemo variant={"default"} size={"default"} />
                            </CardFooter>
                        </TabsContent>
                        <TabsContent value="register" className="flex flex-col gap-6">
                            <CardHeader>
                                <CardTitle>Register</CardTitle>
                                <CardDescription>
                                    Create your account here. After saving, you&apos;ll be login.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-current">Name</Label>
                                    <Input id="tabs-demo-current" type="name" placeholder="Name" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-new">Last-name</Label>
                                    <Input id="tabs-demo-new" type="last-name" placeholder="Last-name" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-new">Email</Label>
                                    <Input id="tabs-demo-new" type="email" placeholder="Email" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-new">Password</Label>
                                    <Input id="tabs-demo-new" type="password" placeholder="Password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                {/* l'élément ripple est le bouton login*/}
                                < RippleButtonDemo variant={"default"} size={"default"} />
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
export function RippleButtonDemo({
                                             variant,
                                             size,
                                         }: RippleButtonDemoProps) {
    return (
        <RippleButton variant={variant} size={size}>
            {size === 'icon' ? <PlusIcon /> : 'Login'}
            <RippleButtonRipples />
        </RippleButton>
    );
}
