import './ironforge.css';

export default function IronForgeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="ironforge-app min-h-screen selection:bg-rose-600 selection:text-white">
            {children}
        </div>
    );
}
