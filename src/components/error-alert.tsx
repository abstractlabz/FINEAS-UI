import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

type ErrorAlertProps = {
    error: string;
    onClose: () => void;
};

const ErrorAlertComponent = ({ error, onClose }: ErrorAlertProps) => {
    return (
        <Alert
            variant="destructive"
            onClick={onClose}
            className="fixed bottom-0 right-0 w-64 px-4 py-2 mb-4 mr-4 text-white transition duration-500 ease-in-out transform translate-y-0 bg-red-500 rounded-md opacity-100 cursor-pointer hover:scale-100"
        >
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
    );
};

export default ErrorAlertComponent;