import { ChangeEvent, MutableRefObject, useEffect } from "react";

type handler = (event: ChangeEvent) => void;

const useOnClickOutside = (
  ref: MutableRefObject<any>,
  handler: handler
) => {
  useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current?.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
