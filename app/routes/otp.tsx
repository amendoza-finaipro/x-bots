import { Form, redirect } from 'react-router';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { auth } from '~/lib/auth';
import type { Route } from './+types/otp';
import { Card } from '~/components/ui/card';
import { Logo } from '@/components/assets/icons';
import { Label } from '~/components/ui/label';


export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const step = formData.get('step');
    const otp = formData.get('otp');

    if (step === 'email') {
        await auth.api.sendVerificationOTP({
            body: {
                email: email as string,
                type: 'sign-in'
            }
        });
        return { step: 'otp-step' };
    }

    const result = await auth.api.signInEmailOTP({
        returnHeaders: true,
        body: {
            email: email as string,
            otp: otp as string
        }
    });

    return redirect('/', { headers: result.headers });
};

const Index = ({ actionData }: Route.ComponentProps) => {
    const step = actionData?.step || 'email';
    return (
        <div className=" flex-1 flex flex-col justify-center items-center h-screen border-2">
            <Card className="p-6 flex flex-col items-center">
                <Logo className="size-12" />
                <h1 className="text-xl font-semibold">Inicio de sesión</h1>
                <Form method="post" className="w-full max-w-sm flex flex-col gap-4">
                    <input type="hidden" value={step} name="step" />
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" placeholder="Ingrese su  Email" />
                    {step === 'otp-step' &&
                        <div className='flex flex-col gap-4'>
                            <Label htmlFor="email">Codigo OTP</Label>
                            <Input name="otp" placeholder="Ingrese su OTP" />
                        </div>
                    }
                    <Button type="submit" className="w-full mt-4">
                        {step === 'otp-step' ? <p>Iniciar sesión</p> : <p>Enviar código</p>}
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default Index;