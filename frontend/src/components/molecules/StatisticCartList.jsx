import { BadgeCheck, CircleArrowDown, CircleArrowUp } from 'lucide-react';
import { Card } from '../ui/card';
import { useState } from 'react';
import { cn } from '../../lib/utils';

function StatisticCard({ cardInfo, isSelected, selectColor, ...props }) {
  return (
    <Card className='relative cursor-pointer overflow-hidden p-4' {...props}>
      <h2 className='text-lg font-semibold'>{cardInfo.title}</h2>
      <p className='text-2xl font-normal'>
        {cardInfo.value} {cardInfo.unit}
      </p>
      <div className='flex items-center justify-between text-slate-400'>
        <span>so với tháng trước</span>
        <div className='flex items-center gap-1'>
          {cardInfo.isIncreased ? (
            <CircleArrowUp className='h-3 w-3 text-green-400' />
          ) : (
            <CircleArrowDown className='h-3 w-3 text-red-400' />
          )}
          <span
            className={`${cardInfo.isIncreased ? 'text-green-400' : 'text-red-400'}`}
          >
            {cardInfo.compareValue}
          </span>
        </div>
      </div>
      {isSelected && (
        <div
          className={`absolute left-0 right-0 top-0 transform ${selectColor} h-1`}
        ></div>
      )}
    </Card>
  );
}

const CONFIG = {
  1: 'bg-chart-1',
  2: 'bg-chart-2',
  3: 'bg-chart-3',
  4: 'bg-chart-4',
};

function StatisticCardList({ cards, onCardSelected }) {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className='grid grid-cols-4 gap-4'>
      {cards.map((card, index) => (
        <StatisticCard
          selectColor={CONFIG[index + 1]}
          key={index}
          cardInfo={card}
          isSelected={selectedCard === index}
          onClick={() => {
            setSelectedCard(index);
            onCardSelected(card);
          }}
        />
      ))}
    </div>
  );
}

export default StatisticCardList;
