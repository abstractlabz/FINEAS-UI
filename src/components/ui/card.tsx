import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Button } from "@nextui-org/react";

interface SummaryCardProps {
  ticker: string;
  currentPrice: number;
  dailyChange: number;
  onGenerateReports: () => void;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ ticker, currentPrice = 0, dailyChange = 0, onGenerateReports  }) => {

  const divStyle = {
    textAlign: 'center',
  };

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt={`${ticker} logo`}
          height={40}
          radius="sm"
          src="/browser.png"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{ticker}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p style={divStyle}>Current Price: ${currentPrice}</p>
        <p style={divStyle}>Daily Change: {dailyChange}%</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button color="secondary" isLoading={false} onClick={onGenerateReports}>
          Generate Reports
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SummaryCard;
