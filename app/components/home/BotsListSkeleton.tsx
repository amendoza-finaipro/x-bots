import { chatbotImage } from '@/components/assets/images';
import { ClockIcon, BotIcon, BrainIcon, RulerIcon } from 'lucide-react';
import type { format } from 'path';
import  { Link } from 'react-router';
import  { Button } from '../ui/button';
import  { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Spinner } from '../ui/spinner';

export const BotsListSkeleton = () => {
  return (
    <ul className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 pt-15">
        {[1, 2, 3].map((bot) => (
          <li key={bot}>
            <BotCard />
          </li>
        ))}
      </ul>
  )
}

const BotCard = () => {

  return (
    <>
      <Card className="h-full">
        <CardHeader className="h-full">
          <img src={chatbotImage} className="w-7" />
          <CardTitle><Skeleton className='h-4 w-20' /></CardTitle>
          <CardDescription className='flex flex-col gap-2'>
            {[1,2,3,4,5].map(number => (
              <Skeleton className='h-3 w-full' key={number} />
            ))}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 text-xs text-muted-foreground pb-5 items-center">
            <ClockIcon className="size-4"/>
            Actualizado
            <Skeleton className='h-3 w-full' />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <BotIcon className="text-blue-400 size-5" />
              <span className="font-semibold text-sm">Complejidad</span>
              <span className="text-sm pl-2"><Skeleton className='h-3 w-10' /></span>
            </div>
            <div className="flex gap-2">
              <BrainIcon className="text-blue-400 size-5" />
              <span className="font-semibold text-sm">Tono</span>
              <span className="text-sm pl-2"><Skeleton className='h-3 w-10' /></span>
            </div>
            <div className="flex gap-2">
              <RulerIcon className="text-blue-400 size-5" />
              <span className="font-semibold text-sm">
                Longitud de respuesta
              </span>
              <span className="text-sm pl-2"><Skeleton className='h-3 w-10' /></span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="ghost" disabled>
            <Spinner />
          </Button>
          <Button disabled>
            <Spinner />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
