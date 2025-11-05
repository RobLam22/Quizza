import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import supabase from '@/utils/supabase-client';

type Stat = {
    score: string;
    first_name: string;
    difficulty: string;
    numOfQuestions: string;
    category: string;
};

export default function Leaderboard() {
    const [stats, setStats] = useState<Stat[] | null>([]);

    useEffect(() => {
        async function fetchLeaderboard(): Promise<void> {
            const res = await supabase
                .from('leaderboard')
                .select(
                    `first_name, category, numOfQuestions, difficulty, score`
                )
                .order('score', { ascending: false })
                .limit(20);
            setStats(res.data);
        }
        fetchLeaderboard();
    }, []);

    const leaderboardData = stats
        ? stats.map((stat: Stat) => (
              <TableRow>
                  <TableCell>{stat.score}</TableCell>
                  <TableCell>{stat.first_name}</TableCell>
                  <TableCell>{stat.difficulty}</TableCell>
                  <TableCell>{stat.numOfQuestions}</TableCell>
                  <TableCell>{stat.category}</TableCell>
              </TableRow>
          ))
        : null;

    return (
        <Table className="w-140 mx-auto lg:w-306 lg:mt-12">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Score</TableHead>
                    <TableHead className="w-[100px]">Player Name</TableHead>
                    <TableHead className="w-[100px]">Difficulty</TableHead>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead className="w-[100px]">Category</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>{leaderboardData}</TableBody>
        </Table>
    );
}
