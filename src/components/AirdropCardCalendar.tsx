
import { Airdrop } from '../utils/types';
import CalendarButton from './CalendarButton';

interface AirdropCardCalendarProps {
  airdrop: Airdrop;
}

const AirdropCardCalendar: React.FC<AirdropCardCalendarProps> = ({ airdrop }) => {
  return (
    <div className="flex items-center">
      <div className="text-sm">
        <span className="font-medium">Start:</span> {new Date(airdrop.startDate).toLocaleDateString()}
      </div>
      <CalendarButton airdrop={airdrop} variant="ghost" />
    </div>
  );
};

export default AirdropCardCalendar;
