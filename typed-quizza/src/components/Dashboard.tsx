import supabase from '../utils/supabase-client.js';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    async function fetchMetrics(): Promise<void> {
        const response = await supabase.from('users').select(`*`);
        console.log(response);
        if (error) {
            setError(error);
        } else {
            setData(data);
        }
    }

    useEffect(() => {
        fetchMetrics();
    }, []);

    return <></>;
}
