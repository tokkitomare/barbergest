interface BtnsDashboardProps {
    texts: string[];
}

export default function BtnsDashboard({ texts }: BtnsDashboardProps) {
    return (
        <>
            {texts.map((text, i) => (
                <button
                    key={i}
                    className="hover:scale-105 transform transition-all 
                    duration-500 hover:text-orange-400 cursor-pointer"
                >
                    {text}
                </button>
            ))}
        </>
    );
}
