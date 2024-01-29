import React from "react";
import Slider from "react-slick";
import SummaryCard from '../components/ui/card';

// Define an interface for the item
interface Item {
  ticker: string;
  currentprice: number;
  dailychange: number;
}

interface MultipleItemsProps {
  items?: Item[];
}

const MultipleItems: React.FC<MultipleItemsProps> = ({ items: propItems }) => {
  const items = propItems || [
    { ticker: "AAPL", currentprice: 150, dailychange: 2.5 },
    { ticker: "GOOGL", currentprice: 2800, dailychange: -1.5 },
    // Add more sample items as needed
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 250,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  const divStyle = {
    display: 'flex',
  };

  const ItemsList = () => {
    return (
      <>
        {items.map((item, index) => (
          <div key={index}>
            <SummaryCard
              ticker={item.ticker}
              currentPrice={item.currentprice}
              dailyChange={item.dailychange}
              onGenerateReports={() => {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        ))}
      </>
    );
  };

  return (
    <div style={divStyle}>
      <Slider {...settings}>
        <ItemsList />
      </Slider>
    </div>
  );
};

export default MultipleItems;
