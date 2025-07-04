import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [isWhite, setIsWhite] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setIsWhite(savedTheme === 'white');
    }, []);

    useEffect(() => {
        const body = document.body;
        if (isWhite) {
            body.classList.add('white');
            localStorage.setItem('theme', 'white');
        } else {
            body.classList.remove('white');
            localStorage.setItem('theme', 'dark');
        }
    }, [isWhite]);

    return (
        <>
            <button className="bg-black/25 rounded-full 
                    border border-white/40 shadow-[0px_0px_25px_rgba(255,235,255,0.2)] cursor-pointer hover:opacity-75"
            onClick={() => setIsWhite(!isWhite)}>
                {!isWhite ? '🌙' : '☀️'}
            </button>
        </>
    );
}