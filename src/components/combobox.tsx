// Assuming you're using Next.js and have installed `js-cookie`
"use client"

import * as React from "react"
import Cookies from 'js-cookie'
import { Check, ChevronsUpDown } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import {fullListData} from "../data/fullListData"

interface ComboboxProps {
  setSelectedTicker: (ticker: string) => void;
}


// Add a new prop to accept the function for setting selected ticker
export function Combobox({ setSelectedTicker }: ComboboxProps) {
  const [open, setOpen] = React.useState(true)
  const [value, setValue] = React.useState("")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [watchlist, setWatchlist] = React.useState<string[]>([]);

  React.useEffect(() => {
    const watchlistCookie = Cookies.get('watchlist');
    if (watchlistCookie) {
      setWatchlist(JSON.parse(watchlistCookie) as string[]);
    }
  }, []);

  const saveWatchlistToCookies = (watchlist: string[]) => {
    Cookies.set('watchlist', JSON.stringify(watchlist), { sameSite: 'None', secure: true });
  };

  const addToWatchlist = (newValue: string) => {
    setWatchlist((currentWatchlist) => {
      // Create a new Set with the current watchlist and the new value
      const watchlistSet = new Set(currentWatchlist);
      watchlistSet.add(newValue);
      
      // Convert the Set back into an array directly
      const updatedWatchlist = Array.from(watchlistSet);
      saveWatchlistToCookies(updatedWatchlist);
      return updatedWatchlist;
    });
  };
  

  const removeFromWatchlist = (valueToRemove: string) => {
    setWatchlist((currentWatchlist) => {
      const updatedWatchlist = currentWatchlist.filter(item => item !== valueToRemove);
      saveWatchlistToCookies(updatedWatchlist);
      return updatedWatchlist;
    });
  };

  // Update the setValue function to also call setSelectedTicker
  const handleSelect = (currentValue: any) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    setOpen(open);
    // Call the function passed through props to set the selected ticker in the parent component
    setSelectedTicker(newValue);
  };

  const displayedTickers = searchQuery.length > 0
  ? fullListData.filter(framework => framework.label.toLowerCase().includes(searchQuery.toLowerCase()))
  : frameworks; // Use `frameworks` for default suggestions without a search query

  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-accent-color z-60"
        >
          {value
            ? displayedTickers.find((framework) => framework.value === value)?.label // Use displayedTickers here to display the selected label
            : <p className="text-black">Select Asset...</p>}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-accent-color overflow-auto max-h-[385px]">
        <Command className="bg-accent-color">
          <CommandInput className="w-full bg-accent-color text-black" placeholder="Enter an asset name..."  value={searchQuery}
        onInput={(e) => setSearchQuery(e.currentTarget.value)} />
          <CommandEmpty>No assets found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {displayedTickers.map((framework) => (
              <div key={framework.value} className="w-full flex items-center justify-between">
                <CommandItem
                  value={framework.label}
                  className="text-black flex-1"
                  onSelect={() => handleSelect(framework.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
                <Image className="pr-2" src="/plus.png" width={25} height={25} alt="add" onClick={() => addToWatchlist(framework.value)} />
              </div>
            ))}
          </CommandGroup>

          <CommandGroup heading="Watchlist">
            {watchlist.map((tickerValue) => {
              // Use fullListData to find the ticker details by value for watchlist items
              const framework = fullListData.find(framework => framework.value === tickerValue);
              return framework ? (
                <div key={framework.value} className="w-full flex items-center justify-between">
                  <CommandItem
                    value={framework.value}
                    className="text-black flex-1"
                    onSelect={() => handleSelect(framework.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                  <Image className="pr-2" src="/minus.png" width={30} height={30} alt="remove" onClick={() => removeFromWatchlist(framework.value)} />
                </div>
              ) : null;
            })}
          </CommandGroup>

        </Command>
      </PopoverContent>
    </Popover>
  )
}
