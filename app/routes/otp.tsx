import { Form, redirect } from 'react-router';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { auth } from '~/lib/auth';
import type { Route } from './+types/otp';


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
        <div className="p-6 flex-1 flex flex-col justify-center items-center h-screen">
            <h1 className="text-xl font-semibold mb-6">Login Form</h1>
            <Form method="post" className="w-full max-w-sm">
                <input type="hidden" value={step} name="step" />
                <Input name="email" placeholder="Enter your Email" />
                {step === 'otp-step' && <Input name="otp" placeholder="Enter your OTP" />}
                <Button type="submit" className="w-full mt-4">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Index;