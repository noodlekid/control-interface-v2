import { useContext, useEffect, useState } from "react";
import ROSLIB from "roslib";

interface TopicSubscriberProp {
    topic: ROSLIB.Topic;
    callback: (message: ROSLIB.Message) => void; // Update the type of the callback parameter to 'Message'.
}

function TopicSubscriber({topic, callback} : TopicSubscriberProp) {
    const [isSubscribed, setSubcribed] = useState<boolean>(false)

    useEffect(() => {

        if(!isSubscribed){
            topic.subscribe((message) => {
                setSubcribed(true);
                console.log('Successfully subscribed to: ', topic.name);
                callback(message);
            });
        } 

        if(isSubscribed) {
            console.log('Already subscirbed!');
        }
        
        return () => {
            topic.unsubscribe()
            setSubcribed(false);
        }
    }, [topic, callback, isSubscribed])

    return <></>
}

export default TopicSubscriber;