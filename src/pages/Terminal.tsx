
import { DashboardShell } from "@/components/dashboard-shell";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{type: "input" | "output", content: string}[]>([
    { type: "output", content: "Welcome to HomeServer Web Terminal" },
    { type: "output", content: "Type 'help' to see available commands." },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user input to history
    setHistory(prev => [...prev, { type: "input", content: input }]);
    
    // Process command
    let output = "";
    const cmd = input.trim().toLowerCase();
    
    if (cmd === "help") {
      output = "Available commands: help, ls, uptime, hostname, date, clear";
    } else if (cmd === "ls") {
      output = "Documents  Downloads  Images  Videos  config.yaml  setup.sh";
    } else if (cmd === "uptime") {
      output = "Server uptime: 5 days, 3 hours, 27 minutes";
    } else if (cmd === "hostname") {
      output = "homeserver.local";
    } else if (cmd === "date") {
      output = new Date().toString();
    } else if (cmd === "clear") {
      setHistory([
        { type: "output", content: "Welcome to HomeServer Web Terminal" },
        { type: "output", content: "Type 'help' to see available commands." },
      ]);
      setInput("");
      return;
    } else {
      output = `Command not found: ${input}. Type 'help' to see available commands.`;
    }
    
    // Add command output to history
    setHistory(prev => [...prev, { type: "output", content: output }]);
    
    // Clear input
    setInput("");
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Web Terminal</h1>
          <p className="text-muted-foreground">
            Access your server's command line interface directly from the browser.
          </p>
        </div>
        
        <Separator />
        
        <Tabs defaultValue="terminal">
          <TabsList>
            <TabsTrigger value="terminal">Terminal</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="history">Command History</TabsTrigger>
          </TabsList>
          <TabsContent value="terminal" className="mt-4 space-y-4">
            <Card className="p-4 bg-slate-950 border-slate-800 font-mono text-sm">
              <div className="h-96 overflow-y-auto mb-4 whitespace-pre-wrap">
                {history.map((item, index) => (
                  <div key={index} className={item.type === "input" ? "text-green-400" : "text-slate-200"}>
                    {item.type === "input" ? `$ ${item.content}` : item.content}
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex items-center">
                <span className="text-green-400 mr-2">$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-slate-200"
                  autoFocus
                />
              </form>
            </Card>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setInput("")}>
                Clear Input
              </Button>
              <Button onClick={() => setHistory(prev => [...prev, { type: "output", content: "Terminal session cleared." }])}>
                Clear Terminal
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="mt-4">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Terminal Settings</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Font Size</label>
                    <select className="w-full bg-background border border-input rounded-md p-2">
                      <option>Small</option>
                      <option selected>Medium</option>
                      <option>Large</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Theme</label>
                    <select className="w-full bg-background border border-input rounded-md p-2">
                      <option selected>Dark</option>
                      <option>Light</option>
                      <option>System</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button>Save Settings</Button>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="history" className="mt-4">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Command History</h3>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Recent commands will appear here.</div>
                <ul className="space-y-1 font-mono text-sm">
                  {history
                    .filter(item => item.type === "input")
                    .map((item, index) => (
                      <li key={index} className="p-2 bg-secondary rounded hover:bg-accent">
                        {item.content}
                      </li>
                    ))}
                </ul>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
};

export default Terminal;
