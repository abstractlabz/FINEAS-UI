import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Button } from "@nextui-org/react";

interface SummaryCardProps {
  ticker: string;
  currentPrice: number;
  dailyChange: number;
  onGenerateReports: (ticker: string) => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ ticker, currentPrice = 0, dailyChange = 0, onGenerateReports }) => {

  // Determine text color based on daily change
  const dailyChangeColor = dailyChange < 0 ? '#f46e6e' : '#6ef48f';

  return (
    <Card 
      className="m-auto" 
      style={{ 
        maxWidth: '250px',
        backgroundColor: '#333',
        padding: '20px',
        borderRadius: '10px',
        border: '2px solid',
        borderColor: '#ccc'
      }}
    >
      <CardHeader className="flex justify-between items-center">
        <Image
          alt={`${ticker} logo`}
          height={40}
          width={40}
          radius="sm" 
          src="/browser.png"
          style={{ objectFit: 'cover' }}
        />
        <div className="text-md">{ticker}</div>
      </CardHeader>
      <Divider height={2} />
      <CardBody className="text-center">
        <p>Current Price: ${currentPrice}</p>
        <p style={{ color: dailyChangeColor }}>Daily Change: {dailyChange}%</p>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-center p-0">
        <Button 
          color="secondary"
          onClick={() => onGenerateReports(ticker)}
          style={{
            width: '100%',
            fontSize: '1.20rem',
            padding: '15px',
            borderRadius: '8px',
            border: '2px solid',
            borderColor: '#ccc'
          }}
          fullWidth
        >
          Generate Reports
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SummaryCard;
