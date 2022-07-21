import React, { memo } from "react";
import type { NextPage } from "next";
import { GroceryList } from "@prisma/client";

// create the front end
// start with a cards container

// interface card prop
interface CardProps {
    children: React.ReactNode;
}


// single card
export const Card: NextPage<CardProps> = ({ children }) => {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-slate-100">
            {children}
        </div>
    );
};

// card content
export const CardContent: NextPage<CardProps> = ({ children }) => {
    return (
        <div className="bg-white w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 rounded-lg drop-shadow-md">
            {children}
        </div>
    );
};

// interface card header prop
interface CardHeaderProps {
    title: string;
    listLength: number;
    clearAllFn?: () => void;
}

export const CardHeader: NextPage<CardHeaderProps> = ({
    title,
    listLength,
    clearAllFn,
}) => {
    return (
        <div className="flex flex-row items-center justify-between p-3 border-b border-slate-200">
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-base font-medium tracking-wide text-gray-900 mr-2">
                    {title}
                </h1>
                <span className="h-5 w-5 bg-blue-200 text-blue-600 flex items-center justify-center rounded-full text-xs">
                    {listLength}
                </span>
            </div>
            <button
            className="text-sm font-medium text-gray-600 underline"
            type="button"
            onClick={clearAllFn}
            >
                Clear All
            </button>
        </div>
    );
};


// components for list

export const List: NextPage<CardProps> = ({ children }) => {
    return <div className="overflow-y-auto h-72">
        {children}
    </div>
};

// interface list item props
interface ListItemProps {
    item: GroceryList;
    onUpdate?: (item: GroceryList) => void;
}

// list item component
const ListItemComponent: NextPage<ListItemProps> = ({ item, onUpdate}) => {
    return (
        <div className="h-12 border-b flex items-center justify-start px-3">
            <input
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded mr-4"
                defaultChecked={item.checked as boolean}
                onChange={() => onUpdate?.(item)}
            />
            <h2 className="text-gray-600 tracking-wide text-sm">{item.title}</h2>
        </div>
    );
};

export const ListItem = memo(ListItemComponent);