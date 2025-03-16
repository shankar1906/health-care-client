import { Loader } from 'lucide-react';

const LoaderComponent = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Loader className="animate-spin h-16 w-16 text-blue-500" />
        </div>
    );
};

export default LoaderComponent;
