import './luxora.css';

export default function LuxoraLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="luxora-app min-h-screen selection:bg-gold selection:text-black transition-colors duration-1000">
            {children}
        </div>
    );
}
