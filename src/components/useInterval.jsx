import { useEffect, useRef } from "react";

function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  /* remember the latest callback if it changes. */
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  /* set up the interval.*/
  useEffect(() => {
    /* Don't schedule if no delay is specified */
    if (delay === null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;