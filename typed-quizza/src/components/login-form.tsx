import { cn } from '@/lib/utils';
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
import { useActionState } from 'react';
import { useAuth } from '@/context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const { signInUser } = useAuth();
    const navigate = useNavigate();
    const [error, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
            const email = formData.get('email')?.toString() ?? '';
            const password = formData.get('password')?.toString() ?? '';
            try {
                const {
                    success,
                    data,
                    error: signInError,
                } = await signInUser(email, password);

                if (signInError) {
                    return new Error(signInError);
                }
                if (success && data?.session) {
                    navigate('/setup');
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
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={submitAction}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    required
                                    aria-required="true"
                                    aria-invalid={error ? 'true' : 'false'}
                                    aria-describedby={
                                        error ? 'signin-error' : undefined
                                    }
                                    disabled={isPending}
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    aria-required="true"
                                    aria-invalid={error ? 'true' : 'false'}
                                    aria-describedby={
                                        error ? 'signin-error' : undefined
                                    }
                                    disabled={isPending}
                                />
                            </Field>
                            <Field>
                                <Button type="submit" aria-busy={isPending}>
                                    {isPending ? 'Logging in' : 'Log In'}
                                </Button>
                                <Button variant="outline" type="button">
                                    Login with Google
                                </Button>
                                {error && (
                                    <p
                                        id="signin-error"
                                        className="text-red-500 text-sm text-center"
                                    >
                                        {error.message}
                                    </p>
                                )}
                                <FieldDescription className="text-center">
                                    Don't have an account?{` `}
                                    <Link to="/signup">Sign up</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
