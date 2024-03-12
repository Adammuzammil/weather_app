"use client";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/Context/globalContext";
import { CommandIcon } from "@/app/utils/Icons";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";

const Search = () => {
  const { location, inputValue, handleInput } = useGlobalContext();
  const { setActiveCoordinates } = useGlobalContextUpdate();
  const [hoverIdx, setHoverIdx] = useState(0);
  const [close, setClose] = useState(false);

  const closeDialog = () => {
    setClose(false);
  };

  const getCoordinates = (lat: number, lon: number) => {
    setActiveCoordinates([lat, lon]);
    closeDialog();
  };
  return (
    <Dialog open={close} onOpenChange={setClose}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100  ease-in-out duration-200"
        >
          <p className="text-sm text-muted-foreground">Search Here...</p>
          <div className="command dark:bg-[#262626] hover:dark:bg-[#131313] hover:bg-slate-100 bg-slate-200  py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
            {CommandIcon}
            <span className="text-[9px]">J</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder="Search here..."
            value={inputValue}
            onChangeCapture={handleInput}
          />
          <ul className="px-3 pb-2">
            <p className="p-2 text-sm text-muted-foreground">Suggestions</p>
            {location.length === 0 && <p>No results.</p>}

            {location &&
              location.map(
                (
                  item: {
                    name: string;
                    country: string;
                    lat: number;
                    lon: number;
                  },
                  index: number
                ) => {
                  const { name, country } = item;
                  return (
                    <li
                      key={index}
                      className={`px-2 py-3 cursor-default text-sm rounded-sm ${
                        hoverIdx === index ? "bg-accent" : ""
                      }`}
                      onMouseEnter={() => setHoverIdx(index)}
                      onClick={() => {
                        getCoordinates(item?.lat, item?.lon);
                      }}
                    >
                      <p>
                        {name}, {country}
                      </p>
                    </li>
                  );
                }
              )}
          </ul>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default Search;
