"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { frameworks } from "../data/tickerslist"
import { Icon } from "@radix-ui/react-select";

export function Combobox() {
  const [open, setOpen] = React.useState(true)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open}>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className="w-[200px] justify-between bg-accent-color z-20"
    >
      {value
        ? frameworks.find((framework) => framework.value === value)?.label
        : <p className="text-black">Select Ticker...</p>}
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-[200px] p-0 bg-accent-color overflow-auto max-h-[385px]">
    <Command className="bg-accent-color">
      <CommandInput className="w-full bg-accent-color text-black" placeholder="Enter a ticker symbol..." />
      <CommandEmpty>No companies found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        {frameworks.map((framework) => (
          <div key={framework.value} className="w-full flex items-center justify-between">
            <CommandItem
              value={framework.value}
              className="text-black flex-1"
              onSelect={(currentValue) => {
                setValue(currentValue === value ? "" : currentValue);
                setOpen(open);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === framework.value ? "opacity-100" : "opacity-0"
                )}
              />
              {framework.label}
            </CommandItem>
            <Image className="pr-2" src={"icons/plus-icon.svg"} width={40} height={40} alt="Add" onClick={() => {}} />
          </div>
        ))}
      </CommandGroup>
      <CommandGroup heading="Watchlist">
        {frameworks.map((framework) => (
          <div key={framework.value} className="w-full flex items-center justify-between">
            <CommandItem
              value={framework.value}
              className="text-black flex-1"
              onSelect={(currentValue) => {
                setValue(currentValue === value ? "" : currentValue);
                setOpen(open);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === framework.value ? "opacity-100" : "opacity-0"
                )}
              />
              {framework.label}
            </CommandItem>
          </div>
        ))}
      </CommandGroup>
    </Command>
  </PopoverContent>
</Popover>

  )
}
