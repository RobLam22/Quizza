import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import supabase from '@/utils/supabase-client';
import { useState, useEffect } from 'react';
import { categories } from '@/utils/categories';

type Stat = {
    score: string;
    first_name: string;
    difficulty: string;
    numOfQuestions: string;
    category: string;
};

export default function PrevScores() {
    // use effect for leaderboard filter for player name / email
    // grab 5

    const [stats, setStats] = useState<Stat[] | null>([]);

    useEffect(() => {
        async function fetchLeaderboard(): Promise<void> {
            const res = await supabase
                .from('leaderboard')
                .select(
                    `first_name, category, numOfQuestions, difficulty, score`
                )
                .like('first_name', 'Robert')
                .order('id', { ascending: false });
            setStats(res.data);
        }
        fetchLeaderboard();
    }, []);

    const prevScoresData = stats
        ? stats.map((stat: Stat) => (
              <TableRow>
                  <TableCell>{`${stat.score}/${stat.numOfQuestions}`}</TableCell>
                  <TableCell>{`${stat.difficulty[0].toUpperCase()}${stat.difficulty.slice(1)}`}</TableCell>
                  <TableCell>
                      {categories.find(
                          (category) => category.id === Number(stat.category)
                      )?.name || 'Unknown'}
                  </TableCell>
              </TableRow>
          ))
        : null;

    const prevScoresShort = prevScoresData?.slice(0, 5);

    return (
        <>
            <Card className="max-w-md">
                <CardHeader>
                    <CardTitle>Previous Games</CardTitle>
                    <CardDescription>
                        See your score for all previous games played.
                    </CardDescription>
                    <CardAction>
                        <Dialog>
                            <DialogTrigger>
                                <Button variant="ghost">See More</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        All Recorded Games
                                    </DialogTitle>
                                    <DialogDescription>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-[100px]">
                                                        Score
                                                    </TableHead>
                                                    <TableHead>
                                                        Difficulty
                                                    </TableHead>
                                                    <TableHead>
                                                        Category
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {prevScoresData}
                                            </TableBody>
                                        </Table>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    Score
                                </TableHead>
                                <TableHead className="w-[100px]">
                                    Difficulty
                                </TableHead>
                                <TableHead className="w-[100px]">
                                    Category
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>{prevScoresShort}</TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}
