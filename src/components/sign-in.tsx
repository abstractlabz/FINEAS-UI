import Link from 'next/link';
import { Button } from '@/components/ui/button';

const SignInComponent = () => {
    return (
        <Link href='api/login' className='flex flex-col items-center justify-center gap-2'>
            <Button type="button" variant={'secondary'}>Allow Spotify Access</Button>
        </Link>
    )
}

export default SignInComponent;