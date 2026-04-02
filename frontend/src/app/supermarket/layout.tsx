import './supermarket.css';

export default function SupermarketLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="supermarket-app min-h-screen bg-[#FDFDFD]">
            {children}
        </div>
    );
}
