import { useState } from "react";

import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "./ui/card";
import { Input } from "./ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";

interface WordListProps {
    url: string;
    setUrl: (url: string) => void;
    loading: boolean;
    cracking: boolean
}

const WordList = ({ url, setUrl, loading, cracking }: WordListProps) => {
    const [ currentValue, setCurrentValue ] = useState(url);
    return (
        <Card>
            <CardHeader>
                <CardTitle>WordList</CardTitle>
                <CardDescription>
                    Input URL to wordlist to use to crack the JWT.
                </CardDescription>
            </CardHeader>
            <CardContent>
            <div className="flex flex-col gap-4">
                <Input
                    placeholder="Wordlist URL"
                    value={currentValue}
                    onChange={(event) => setCurrentValue(event.target.value)}
                />
            </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button onClick={() => setUrl(url)} disabled={loading || cracking}>
                    { loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> }
                    Save
                </Button>
            </CardFooter>
        </Card>
    )
}

export default WordList;
