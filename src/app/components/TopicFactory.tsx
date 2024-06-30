'use client'

import { ReactNode, createContext, useState, useContext } from "react";


interface TopicsContextType {
    topics: { name: string; messageType: string; }[];
    createTopic: (name: string, messageType: string) => void;
}

const TopicsContext = createContext<TopicsContextType>({ topics: [], createTopic: () => {} });

export const useTopics = () => useContext(TopicsContext);

const TopicFactory = ({children}: {children: ReactNode}) => {
    const [topics, setTopics] = useState<{ name: string; messageType: string; }[]>([]);
    const createTopic = (name: string, messageType: string) => {
        const newTopic = {name, messageType}
        setTopics((prevTopics) => [...prevTopics, newTopic]);
    };

    return (
        <TopicsContext.Provider value={{topics, createTopic}}>
            { children }
        </TopicsContext.Provider>
    )
}

export default TopicFactory;