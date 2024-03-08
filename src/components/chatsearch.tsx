"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

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

export function ChatSearch() {
  const [open, setOpen] = React.useState(true)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open}>
      <PopoverTrigger>

      </PopoverTrigger>
      <PopoverContent className="flex justify-center items-center w-full pt-8 p-5 bg-alternate-color">
        <Command className="flex justify-center w-full bg-alternate-color">
        <CommandInput style={{ color: 'black' }} placeholder="Search your chats here..." />
          <CommandEmpty>No chats found.</CommandEmpty>
          <CommandGroup className="w-full"heading="Chats">
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(open)
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
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
