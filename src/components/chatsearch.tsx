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

export function ChatSearch(props: { popoveropen: boolean }) {
  const [open, setOpen] = React.useState(true)
  const [value, setValue] = React.useState("")

  return (

    <div className="pt-4">
    <Popover open={props.popoveropen}>
    <PopoverTrigger >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-accent-color z-20"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : <p className="text-black">Search Chats Here...</p>}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex justify-center items-center w-[200px] pt-4 p-5 bg-accent-color max-h-64 overflow-auto">
        <Command className="flex justify-center w-full bg-accent-color">
        <CommandInput style={{ color: 'white' }} placeholder="Search your chats here..." />
          <CommandEmpty>No chats found.</CommandEmpty>
          <CommandGroup className="w-full overflow-auto"heading="Chats">
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                className="text-black"
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
    </div>
  )
}
