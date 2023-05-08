import { Badge } from '@/components/ui/badge';

const TitleComponent: React.FC = () => {
    return (
        <div className="flex flex-row flex-wrap items-center gap-2">
            <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
                Song GPT
            </h1>
            <Badge variant="destructive" className="h-5">BETA</Badge>
        </div>
    )
}

export default TitleComponent;