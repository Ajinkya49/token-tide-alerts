
import { useState } from 'react';
import { Check, CheckCircle2, AlertCircle, Link } from 'lucide-react';
import { Airdrop } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/components/NotificationProvider';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';

interface AirdropTasksProps {
  airdrop: Airdrop;
}

const AirdropTasks: React.FC<AirdropTasksProps> = ({ airdrop }) => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const { toast } = useToast();
  const { addNotification } = useNotifications();

  if (!airdrop.steps || airdrop.steps.length === 0) {
    return null;
  }

  const markTaskComplete = (taskIndex: number) => {
    const taskId = `${airdrop.id}-task-${taskIndex}`;
    
    if (!completedTasks.includes(taskId)) {
      const newCompletedTasks = [...completedTasks, taskId];
      setCompletedTasks(newCompletedTasks);
      
      // Save to localStorage
      localStorage.setItem(`airdrop-tasks-${airdrop.id}`, JSON.stringify(newCompletedTasks));
      
      // Show toast
      toast({
        title: "Task Completed",
        description: `You've completed: ${airdrop.steps[taskIndex]}`,
      });
      
      // If all tasks are completed, send a notification
      if (newCompletedTasks.length === airdrop.steps.length) {
        addNotification({
          title: `${airdrop.name} Tasks Completed!`,
          message: `You've completed all tasks for ${airdrop.name}. You're now eligible for the airdrop!`,
          airdropId: airdrop.id
        });
      }
    }
  };

  const isTaskCompleted = (taskIndex: number) => {
    const taskId = `${airdrop.id}-task-${taskIndex}`;
    return completedTasks.includes(taskId);
  };

  return (
    <Card className="mt-4 border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
          Task Automation
        </CardTitle>
        <CardDescription className="text-xs">
          Track your progress for {airdrop.name} airdrop
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <ul className="space-y-2">
          {airdrop.steps.map((step, index) => (
            <li key={index} className="flex items-start">
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 w-6 p-0 mr-2 mt-0.5 rounded-full ${
                  isTaskCompleted(index) 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground"
                }`}
                onClick={() => markTaskComplete(index)}
              >
                {isTaskCompleted(index) ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </Button>
              <span className={`text-sm ${isTaskCompleted(index) ? "line-through opacity-70" : ""}`}>
                {step}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <div className="text-xs text-muted-foreground flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" />
          Auto-tracked with connected wallet
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 p-0 text-xs flex items-center"
          asChild
        >
          <a href={airdrop.link} target="_blank" rel="noopener noreferrer">
            <Link className="h-3 w-3 mr-1" />
            View Project
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AirdropTasks;
