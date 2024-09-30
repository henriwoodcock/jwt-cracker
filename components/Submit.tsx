import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress"
import { verifyToken } from "@/lib/utils";

const Cracked = ({ crack }: { crack?: string }) => {
    return (
        <div>
            <h2 className="text-2xl font-semibold">
                {crack ? 'Cracked!' : 'Not Cracked!' }
            </h2>
            { crack && <div>Secret key: { crack }</div> }
        </div>
    )
}

interface SubmitProps {
    token: string;
    wordlist: string[];
    busy: boolean;
    setBusy: (v: boolean) => void;
}

const Submit = ({ token, wordlist, busy, setBusy }: SubmitProps) => {
    const [ cracked, setCracked ] = useState<string | undefined>(undefined);
    const [ crackState, setCrackState ] = useState(0);

    const run = async (token: string, wordlist: string[]) => {
        setBusy(true);
        setCracked(undefined);
        setCrackState(0);
        const results = await Promise.all(wordlist.map(d => verifyToken(token, d)));
        const hacked = wordlist.filter((d, i) => results[i]);
        if (hacked.length > 0) {
            setCracked(hacked[0]);
            setCrackState(1);
        } else {
            setCrackState(2);
        }
        setBusy(false);
        return results;
    }

    useEffect(() => {
    }, [wordlist]);

    return (
        <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Button variant='outline' disabled={true}>
                        Cancel
                    </Button>
                </div>
                <div className="grid gap-2">
                    <Button disabled={busy} onClick={() => run(token, wordlist)}>
                        Submit
                    </Button>
                </div>
            </div>
            <div>
                <Progress value={busy ? 50 : 100} />
            </div>
            { crackState > 0 && <Cracked crack={cracked} />}
        </div>
    )
}

export default Submit;
