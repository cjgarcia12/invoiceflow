import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import {SignedIn, UserButton} from "@clerk/nextjs";
import React from "react";
import Header from "@/components/header";

const Home: React.FC = async () => {
  const clerkUser = await currentUser()
  if (!clerkUser) redirect('/sign-in');
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <Header>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Header>
      <h1 className="font-mono text-white text-3xl font-bold mb-8 mt-8">Invoices</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-4/5">
        <Card>
          <CardHeader>
            <div className="h-[125px] overflow-hidden">
              <Image
                src="/invoice.png"
                width={400}
                height={300}
                alt="Picture of invoice"
              />
            </div>
            <CardTitle className='text-center'>
              Invoice no.1
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

        <Card className="">
          <CardHeader>
            <div className="h-[125px] overflow-hidden">
              <Image
                  src="/invoice.png"
                  width={400}
                  height={300}
                  alt="Picture of invoice"
              />
            </div>
            <CardTitle className='text-center'>
              Invoice no.1
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>

        <Card className="">
          <CardHeader>
            <div className="h-[125px] overflow-hidden">
              <Image
                  src="/invoice.png"
                  width={400}
                  height={300}
                  alt="Picture of invoice"
              />
            </div>
            <CardTitle className='text-center'>
              Invoice no.1
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default Home;
