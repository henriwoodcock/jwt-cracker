import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"

interface JwtInputProps {
    algorithm: string;
    setAlgorithm: (algo: string) => void;
    jwt: string;
    setJwt: (jwt: string) => void;
    cracking: boolean;
}

const JwtInput = (props: JwtInputProps) => {
    const { algorithm, setAlgorithm, jwt, setJwt, cracking } = props;
    return (
        <Card>
            <CardHeader>
                <CardTitle>JWT Input</CardTitle>
                <CardDescription>
                    Input JWT and select the algorithm.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="name">Algorithm</Label>
                        <Select
                            value={algorithm}
                            onValueChange={setAlgorithm}
                            disabled={cracking}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Algorithm"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="HS256">HS256</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="description">JWT</Label>
                        <Textarea
                            disabled={cracking}
                            id="jwt"
                            value={jwt}
                            onChange={(e) => setJwt(e.target.value)}
                            className="min-h-32"
                        />
                    </div>
                </div>
            </CardContent>
      </Card>
    )
}

export default JwtInput;
