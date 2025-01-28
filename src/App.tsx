import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Brain, Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  prompt: string;
  result: string;
}

const initialQuestions: Question[] = [
  {
    id: 1,
    prompt: "Tell me the name of a country whose name ends with 'lia'. Give me the capital city of that country as well.",
    result: "NONE"
  },
  {
    id: 2,
    prompt: "What is the number that rhymes with the word we use to describe a tall plant?",
    result: "NONE"
  },
  {
    id: 3,
    prompt: "Write a haiku where the second letter of each word when put together spells \"Simple\".",
    result: "NONE"
  },
  {
    id: 4,
    prompt: "Name an English adjective of latin origin that begins and ends with same letter, has 11 letters in total, and for which all vowels in the word are ordered alphabetically.",
    result: "NONE"
  },
  {
    id: 5,
    prompt: "Courtney said that there were 48 people, but Kelly said that Courtney had overstated the number by 20%. If Kelly was right, how many people were there?",
    result: "NONE"
  },
  {
    id: 6,
    prompt: "I have 2 apples, then I buy 2 more. I bake a pie with 2 of the apples. After eating half of the pie how many apples do I have left?",
    result: "NONE"
  },
  {
    id: 7,
    prompt: "Sally is a girl. She has three brothers. Each of her brothers has the same two sisters. How many sisters does Sally have?",
    result: "NONE"
  },
  {
    id: 8,
    prompt: "If a regular hexagon has a short diagonal of 64, what is its long diagonal?",
    result: "NONE"
  },
  {
    id: 9,
    prompt: "Create an HTML page with a button that explodes confetti when you click it. You can use CSS & JS as well.",
    result: "NONE"
  },
  {
    id: 10,
    prompt: "Create a Playable Synth Keyboard using html,css,js",
    result: "NONE"
  },
  {
    id: 11,
    prompt: "Generate the SVG code for a butterfly.",
    result: "NONE"
  },
  {
    id: 12,
    prompt: "Create me a 3d circle that moves and loops endlessly in 3d space using html,css,js.",
    result: "NONE"
  },
  {
    id: 13,
    prompt: "Write a game of life in python that works on the terminal.",
    result: "NONE"
  }
];

function App() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const { toast } = useToast();

  const handleResultChange = (id: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, result: value } : q
    ));
  };

  const getPassRate = () => {
    const passedCount = questions.filter(q => q.result === "PASS").length;
    const totalCount = questions.length;
    return ((passedCount / totalCount) * 100).toFixed(1);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        description: "Prompt copied to clipboard",
        duration: 2000,
      });
    } catch (err) {
      toast({
        description: "Failed to copy prompt",
        duration: 2000,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="w-full mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Prompt Evaluation
            </h1>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm">
            <span className="text-sm text-gray-500 dark:text-gray-400">Pass Rate:</span>
            <span className="ml-2 text-lg font-semibold text-blue-600 dark:text-blue-400">
              {getPassRate()}%
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden w-full">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[5%] text-center">#</TableHead>
                <TableHead className="w-[70%]">Prompt</TableHead>
                <TableHead className="w-[10%]">Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell className="w-[5%] font-medium text-center">{question.id}</TableCell>
                  <TableCell className="w-[70%]">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="link"
                        size="icon"
                        className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 bg-gray-200 flex-shrink-0"
                        onClick={() => copyToClipboard(question.prompt)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <span className="break-words">{question.prompt}</span>
                    </div>
                  </TableCell>
                  <TableCell className="w-[25%] text-right">
                    <div className="pr-8">
                      <Select
                        value={question.result}
                        onValueChange={(value) => handleResultChange(question.id, value)}
                      >
                        <SelectTrigger className={`w-32 ${
                          question.result === 'PASS' 
                            ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' 
                            : question.result === 'FAIL'
                            ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                            : ''
                        }`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent 
                          align="end"
                          className="min-w-[8rem]"
                        >
                          <SelectItem value="NONE">NONE</SelectItem>
                          <SelectItem value="PASS">PASS</SelectItem>
                          <SelectItem value="FAIL">FAIL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Supported by <a href="https://maia.id" className="text-blue-600 dark:text-blue-400 hover:underline">MAIA</a>
        </div>
      </div>
    </div>
  );
}

export default App;