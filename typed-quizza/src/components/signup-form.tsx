import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import { useActionState } from 'react';

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
    const { signUpNewUser } = useAuth();
    const navigate = useNavigate();

    const [error, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
            const email = formData.get('email')?.toString() ?? '';
            const password = formData.get('password')?.toString() ?? '';
            const firstName = formData.get('first-name')?.toString() ?? '';
            try {
                const {
                    success,
                    data,
                    error: signUpError,
                } = await signUpNewUser(email, password, firstName);

                if (signUpError) {
                    return new Error(signUpError);
                }
                if (success && data?.session) {
                    navigate('/dashboard');
                }
                return null;
            } catch (error) {
                console.error('Sign in error: ', error.message);
                return new Error(
                    'An unexpected error occurred. Please try again.'
                );
            }
        },
        null
    );

    return (
        <Card className="m-64" {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={submitAction}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="first-name">
                                First Name
                            </FieldLabel>
                            <Input
                                id="first-name"
                                name="first-name"
                                type="text"
                                placeholder="John"
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="email@example.com"
                                required
                            />
                            <FieldDescription>
                                We&apos;ll use this to contact you. We will not
                                share your email with anyone else.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                            <FieldDescription>
                                Must be at least 8 characters long.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="confirm-password">
                                Confirm Password
                            </FieldLabel>
                            <Input
                                id="confirm-password"
                                type="password"
                                required
                            />
                            <FieldDescription>
                                Please confirm your password.
                            </FieldDescription>
                        </Field>
                        <FieldGroup>
                            <Field>
                                <Button type="submit">Create Account</Button>
                                <Button variant="outline" type="button">
                                    Sign up with Google
                                </Button>
                                <FieldDescription className="px-6 text-center">
                                    Already have an account?{' '}
                                    <Link to="/login">Sign in</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}
