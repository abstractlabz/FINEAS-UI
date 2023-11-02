import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button} from "@nextui-org/react";
import { textAlign } from "@mui/system";

export default function App() {
  const divStyle = {
    textAlign: 'center'
  };
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="/browser.png"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">AAPL</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
          <p style={divStyle}>Current Price:   $152.75</p>
          <p style={divStyle}>Daily Change:   +10.53</p>
      </CardBody>
      <Divider/>
      <CardFooter>
      </CardFooter>
      <Button color="secondary" isLoading={false}>
      Generate Reports
      </Button>
    </Card>

  );
}
