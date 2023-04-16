import React from "react";

export const usePreloader = (timerCondition: boolean, millis: number) => {
  const [isPreloaderShow, setIsPreloaderShow] = React.useState(false);
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(
      () => setIsPreloaderShow(timerCondition),
      millis
    );
  }, [timerCondition, millis]);

  return {
    isPreloaderShow,
  };
};
