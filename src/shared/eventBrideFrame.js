import { useCallback, useState } from "react";
import useEventbrite from "react-eventbrite-popup-checkout";

export default function EventBriteFrame(props){

    console.log("Eventbrite id: " + props.id);

    const handleOrderCompleted = useCallback(() => {
        console.log('Order was completed successfully');
      }, []);

    const iframeCheckout = useEventbrite({
        eventId: props.id,
        modal: false,
        onOrderComplete: handleOrderCompleted,
        iFrameHeight: 500, // optional
        iFrameAutoAdapt: 100, // optional - The widget's viewport percentage (between 75-100)
      });      

      return (
        <div>
            {/* guard for null - resolves when Eventbrite loads */}
            {iframeCheckout && (
                <div id={iframeCheckout.id} />
            )}
        </div>
      )
}