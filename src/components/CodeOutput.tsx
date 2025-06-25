import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from 'lucide-react';

interface CodeOutputProps {
  htmlCode: string;
  cssCode: string;
}

const CodeOutput: React.FC<CodeOutputProps> = ({ htmlCode, cssCode }) => {
  const { toast } = useToast();
  console.log('CodeOutput loaded');

  const handleCopy = (code: string, language: 'HTML' | 'CSS') => {
    navigator.clipboard.writeText(code).then(() => {
      toast({
        title: "Copied to clipboard!",
        description: `${language} code has been copied.`,
      });
    }).catch(err => {
      console.error("Failed to copy text: ", err);
      toast({
        title: "Error",
        description: "Could not copy code to clipboard.",
        variant: "destructive",
      });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Code</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="css" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
          </TabsList>
          <TabsContent value="html">
            <div className="relative mt-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7"
                onClick={() => handleCopy(htmlCode, 'HTML')}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy HTML Code</span>
              </Button>
              <pre className="bg-muted rounded-md p-4 overflow-x-auto">
                <code className="text-sm text-muted-foreground">
                  {htmlCode}
                </code>
              </pre>
            </div>
          </TabsContent>
          <TabsContent value="css">
            <div className="relative mt-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7"
                onClick={() => handleCopy(cssCode, 'CSS')}
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy CSS Code</span>
              </Button>
              <pre className="bg-muted rounded-md p-4 overflow-x-auto">
                <code className="text-sm text-muted-foreground">
                  {cssCode}
                </code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CodeOutput;