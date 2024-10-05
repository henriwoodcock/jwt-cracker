'use client'
import JwtInput from "@/components/JwtInput";
import Submit from "@/components/Submit";
import WordList from "@/components/WordList";
import { defaultAlgorithm, defaultJwt, defaultUrl } from "@/lib/config";
import { getWordList } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
    const [ algorithm, setAlgorithm ] = useState(defaultAlgorithm);
    const [ jwt, setJwt ] = useState(defaultJwt);
    const [ url, setUrl ] = useState(defaultUrl);
    const [ wordlist, setWordList ] = useState<string[]>([]);
    const [ wordListLoading, setWordListLoading ] = useState(false);
    const [ cracking, setCracking ] = useState(false);

    const updateWordList = async (url: string, setWordList: (w: string[]) => void) => {
        try {
            setWordListLoading(true);
            const wl = await getWordList(url);
            setWordList(wl);
        } catch (e) {
            console.log(e);
            setWordList([]);
        } finally {
            setWordListLoading(false);
        }
    }

    useEffect(() => {
        void updateWordList(url, setWordList);
    }, [url, setWordList]);

    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">JWT Cracker</h1>
                    <p className="leading-7">
                      JWT cracker attempts to crack a HS256 JWT against a given
                      line-seperated wordlist.
                    </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    <WordList
                        cracking={cracking}
                        loading={wordListLoading}
                        url={url}
                        setUrl={setUrl}
                    />
                    <div className="col-span-2">
                      <JwtInput
                          cracking={cracking}
                          algorithm={algorithm}
                          setAlgorithm={setAlgorithm}
                          jwt={jwt}
                          setJwt={setJwt}
                      />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-1/2">
                        <Submit
                            wordlist={wordlist}
                            token={jwt}
                            busy={cracking}
                            setBusy={setCracking}
                        />
                    </div>
                </div>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center bg-muted/40">
              <div className="flex items-center gap-2">
                  <p className="leading-7">Built while drinking 🍺 by&nbsp;
                    <a href="https://twitter.com/henriwoodcock" className="underline">
                        Henri Woodcock
                    </a>
                  </p>
              </div>
            </footer>
        </div>
    );
}
