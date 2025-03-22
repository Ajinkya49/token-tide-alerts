
import { useState } from 'react';
import { Calendar, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Airdrop } from '@/utils/types';
import { useToast } from '@/components/ui/use-toast';

interface CalendarButtonProps {
  airdrop: Airdrop;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
}

const CalendarButton = ({ airdrop, variant = 'outline' }: CalendarButtonProps) => {
  const [added, setAdded] = useState(false);
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const handleAddToCalendar = () => {
    try {
      // Create Google Calendar event URL
      const startDate = formatDate(airdrop.startDate);
      const endDate = formatDate(airdrop.endDate);

      const eventTitle = `${airdrop.name} Airdrop`;
      const eventDetails = `${airdrop.description}\n\nToken: ${airdrop.tokenSymbol}\nEstimated Value: ${airdrop.estimatedValue}\n\nMore info: ${airdrop.link}`;
      const eventLocation = airdrop.link;

      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(eventLocation)}`;

      // Open the URL in a new tab
      window.open(googleCalendarUrl, '_blank');
      
      // Show success message
      toast({
        title: "Added to Calendar",
        description: "Event has been created in your calendar.",
      });
      
      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
    } catch (error) {
      console.error("Error adding to calendar:", error);
      toast({
        title: "Error",
        description: "Could not add event to calendar. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          size="sm" 
          variant={variant} 
          className="ml-2"
          onClick={handleAddToCalendar}
        >
          {added ? <Check className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to calendar</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CalendarButton;
