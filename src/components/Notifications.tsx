
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, BellDot, Check, Calendar, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useNotifications } from './NotificationProvider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

export const Notifications = () => {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotifications();
  const [open, setOpen] = useState(false);
  
  const handleNotificationClick = (id: string, airdropId?: string) => {
    markAsRead(id);
    setOpen(false);
    
    if (airdropId) {
      // Navigate to the airdrop details (we could implement this in the future)
      // For now, just scroll to the airdrops section
      navigate('/dashboard');
      setTimeout(() => {
        const airdropsSection = document.getElementById('airdrops');
        if (airdropsSection) {
          airdropsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {unreadCount > 0 ? (
            <>
              <BellDot className="h-5 w-5" />
              <Badge 
                className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
                variant="destructive"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            </>
          ) : (
            <Bell className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {notifications.length > 0 && (
            <div className="flex space-x-1">
              <Button 
                onClick={(e) => { e.stopPropagation(); markAllAsRead(); }} 
                size="icon" 
                variant="ghost" 
                className="h-7 w-7"
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button 
                onClick={(e) => { e.stopPropagation(); clearNotifications(); }} 
                size="icon" 
                variant="ghost" 
                className="h-7 w-7 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="py-4 text-center text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-20" />
            <p>No notifications yet</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px]">
            <DropdownMenuGroup>
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`p-3 cursor-pointer ${!notification.read ? 'bg-accent/30' : ''}`}
                  onClick={() => handleNotificationClick(notification.id, notification.airdropId)}
                >
                  <div className="flex flex-col gap-1">
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm text-muted-foreground">{notification.message}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {format(notification.timestamp, 'MMM d, yyyy - h:mm a')}
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </ScrollArea>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
