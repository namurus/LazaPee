import { CircleArrowDown, CircleArrowUp } from 'lucide-react';
import { Card } from '../ui/card';
import { useState } from 'react';
import PropTypes from 'prop-types';

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
  const [selectedCards, setSelectedCard] = useState(null);
  const handleSelectCard = (card) => {
    if (!selectedCards) {
      setSelectedCard([card]);
      return;
    }
    const existingCard = selectedCards.find(
      (selectedCard) => selectedCard.key === card.key
    );
    if (existingCard) {
      const newSelectedCards = selectedCards.filter(
        (selectedCard) => selectedCard.key !== card.key
      );
      setSelectedCard(newSelectedCards);
    } else {
      setSelectedCard([...selectedCards, card]);
    }
  };
  return (
    <div className='grid grid-cols-4 gap-4'>
      {cards.map((card, index) => (
        <StatisticCard
          selectColor={CONFIG[index + 1]}
          key={index}
          cardInfo={card}
          isSelected={
            selectedCards?.find(
              (selectedCard) => selectedCard.key === card.key
            ) !== undefined
          }
          onClick={() => {
            handleSelectCard(card);
            onCardSelected(card);
          }}
        />
      ))}
    </div>
  );
}
StatisticCard.propTypes = {
  cardInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    unit: PropTypes.string,
    isIncreased: PropTypes.bool.isRequired,
    compareValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
  }).isRequired,
  isSelected: PropTypes.bool,
  selectColor: PropTypes.string,
};

StatisticCardList.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCardSelected: PropTypes.func.isRequired,
};

export default StatisticCardList;
